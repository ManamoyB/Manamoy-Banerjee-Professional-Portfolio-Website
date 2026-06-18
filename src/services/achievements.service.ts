import { getSheetRawData } from './googleSheets.core';
import { achievementsData as fallbackAchievements } from '../data/portfolioData';

export const achievementsService = {
  async getAchievements(): Promise<string[]> {
    const raw = await getSheetRawData('Achievements');
    if (!raw || raw.length < 2) {
      return fallbackAchievements;
    }
    
    const headers = raw[0].map(h => h.trim().toLowerCase());
    const dataRows = raw.slice(1);
    
    const nameIdx = headers.indexOf('achievement');
    const parsed: string[] = [];
    
    dataRows.forEach(row => {
      const getVal = (idx: number, fallback: string = ''): string => {
        return (idx >= 0 && idx < row.length) ? row[idx].trim() : fallback;
      };
      
      const content = nameIdx >= 0 ? getVal(nameIdx) : row[0]?.trim();
      if (content) {
        parsed.push(content);
      }
    });
    
    return parsed.length > 0 ? parsed : fallbackAchievements;
  }
};
