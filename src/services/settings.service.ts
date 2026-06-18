import { getSheetRawData } from './googleSheets.core';

export interface SiteSettings {
  siteTitle: string;
  siteSubtitle: string;
  footerText: string;
  comingSoonFeatures: string[];
}

export const defaultSettings: SiteSettings = {
  siteTitle: 'Manamoy Banerjee',
  siteSubtitle: 'AI Engineer • Data Analyst • ML Engineer',
  footerText: 'Stripe-grade layouts • Apple-grade UI • Designed for target AI & software roles',
  comingSoonFeatures: ['Blog', 'Gallery', 'Journey', 'Recruiter Resources']
};

export const settingsService = {
  async getSettings(): Promise<SiteSettings> {
    const raw = await getSheetRawData('Settings');
    if (!raw || raw.length < 2) {
      return defaultSettings;
    }

    const settings: SiteSettings = { ...defaultSettings };

    // Parse Key-Value mapping
    raw.forEach(row => {
      if (row.length < 2) return;
      const key = row[0].trim().toLowerCase();
      const val = row[1].trim();
      if (!val) return;

      if (key === 'sitetitle') {
        settings.siteTitle = val;
      } else if (key === 'sitesubtitle') {
        settings.siteSubtitle = val;
      } else if (key === 'footertext') {
        settings.footerText = val;
      } else if (key === 'comingsoonfeatures' || key === 'comingsoon') {
        settings.comingSoonFeatures = val.split(/[;,|]+/).map(s => s.trim()).filter(Boolean);
      }
    });

    return settings;
  }
};
