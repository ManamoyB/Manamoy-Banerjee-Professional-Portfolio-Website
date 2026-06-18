/**
 * Core Google Sheets integration layer for the portfolio Headless CMS.
 * Supports Google Sheets API v4 with fallback to public CSV extraction under high alignment.
 * Includes robust cache validation, offline recovery, and stable fallback states.
 */

/**
 * Robust CSV parser supporting standard RFC 4180 requirements:
 * double quoted fields, embedded commas, newlines, and escaping.
 */
export function parseCSV(csvText: string): string[][] {
  const result: string[][] = [];
  let row: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"';
        i++; // skip escaped quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push(current.trim());
      current = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      row.push(current.trim());
      if (row.length > 0 && row.some(cell => cell !== '')) {
        result.push(row);
      }
      row = [];
      current = '';
    } else {
      current += char;
    }
  }
  if (current || row.length > 0) {
    row.push(current.trim());
    if (row.some(cell => cell !== '')) {
      result.push(row);
    }
  }
  return result;
}

interface CacheItem {
  data: string[][];
  timestamp: number;
}

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minute standard memory/storage TTL cache validation

/**
 * Centralized safe helper to retrieve sheet data using Google Sheets v4 API or viz CSV query.
 * Incorporates rigorous cache validation, error logs, and offline persistence.
 */
export async function getSheetRawData(sheetName: string): Promise<string[][] | null> {
  const sheetId = import.meta.env.VITE_GOOGLE_SHEET_ID;
  const apiKey = import.meta.env.VITE_GOOGLE_SHEET_API_KEY;
  
  const isPlaceholderId = !sheetId || sheetId.trim() === '' || sheetId === 'YOUR_GOOGLE_SHEET_ID' || sheetId.includes('YOUR_GOOGLE_SHEET');
  if (isPlaceholderId) {
    // Graceful fallback to offline local repositories without raising exception or fetch errors
    return null;
  }

  const cacheKey = `portfolio_headless_cms_cache_${sheetName}`;
  
  // 1. Recover cache if existing and fresh
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const parsed: CacheItem = JSON.parse(cached);
      const isFresh = Date.now() - parsed.timestamp < CACHE_TTL_MS;
      if (isFresh) {
        return parsed.data;
      }
    }
  } catch (err) {
    console.warn(`[CMS] Reading cache metadata failed for sheet: ${sheetName}`, err);
  }

  // 2. Fetch fresh table arrays over HTTP (V4 API or gviz csv fallback)
  try {
    let rows: string[][] | null = null;
    
    if (apiKey && apiKey !== 'YOUR_GOOGLE_API_KEY') {
      const v4Url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(sheetName)}?key=${apiKey}`;
      const response = await fetch(v4Url);
      if (response.ok) {
        const json = await response.json();
        if (json && Array.isArray(json.values)) {
          rows = json.values.map((row: any[]) => row.map(cell => String(cell ?? '')));
        }
      } else {
        console.warn(`[CMS] Google Sheets v4 API returned status ${response.status} for "${sheetName}". Attempting CSV fallback...`);
      }
    }
    
    // Fallback to GViz CSV query if V4 API was not used or failed
    if (!rows) {
      const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
      const response = await fetch(sheetUrl);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
      }
      const txt = await response.text();
      rows = parseCSV(txt);
    }
    
    if (rows && rows.length > 0) {
      // Warm up cache memory with fresh payload
      try {
        const item: CacheItem = { data: rows, timestamp: Date.now() };
        localStorage.setItem(cacheKey, JSON.stringify(item));
      } catch (cacheErr) {
        console.warn(`[CMS] Failed storing sheet: ${sheetName} to localStorage`, cacheErr);
      }
      return rows;
    }
    
    throw new Error('Retrieved payload appeared to have empty records.');
  } catch (error: any) {
    console.warn(`[CMS Info] Dynamic Google Sheets sync for "${sheetName}" is pending configuration or offline. Falling back to local offline database layers.`, error?.message || error);
    
    // 3. Last stand fallback: Re-evaluate potentially expired/stale cache item
    try {
      const staleCached = localStorage.getItem(cacheKey);
      if (staleCached) {
        const parsed: CacheItem = JSON.parse(staleCached);
        console.info(`[CMS INFO] Restored stale cached fallback version of "${sheetName}" to shield offline access.`);
        return parsed.data;
      }
    } catch (staleErr) {
      console.error(`[CMS ERROR] Recovering old cache of "${sheetName}" was disrupted:`, staleErr);
    }
    
    return null;
  }
}

