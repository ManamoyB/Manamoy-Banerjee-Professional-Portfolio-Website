import { getSheetRawData } from './googleSheets.core';
import { personalDetails as fallbackProfile } from '../data/portfolioData';

export interface SocialLinks {
  github: string;
  linkedin: string;
  email: string;
  location: string;
}

export const socialLinksService = {
  async getSocialLinks(): Promise<SocialLinks> {
    const raw = await getSheetRawData('SocialLinks');
    if (!raw || raw.length < 2) {
      return fallbackProfile.socialLinks;
    }

    const social: SocialLinks = { ...fallbackProfile.socialLinks };

    // Support Key-Value
    let hasKeys = false;
    raw.forEach(row => {
      if (row.length < 2) return;
      const key = row[0].trim().toLowerCase();
      const val = row[1].trim();
      if (!val) return;

      if (['github', 'linkedin', 'email', 'location'].includes(key)) {
        hasKeys = true;
        if (key === 'github') social.github = val;
        else if (key === 'linkedin') social.linkedin = val;
        else if (key === 'email') social.email = val;
        else if (key === 'location') social.location = val;
      }
    });

    if (hasKeys) {
      return social;
    }

    // Try headers
    const headers = raw[0].map(h => h.trim().toLowerCase());
    const dataRow = raw[1];

    const getVal = (headerName: string, row: string[]): string => {
      const idx = headers.indexOf(headerName);
      if (idx >= 0 && idx < row.length) {
        return row[idx].trim();
      }
      return '';
    };

    const github = getVal('github', dataRow);
    const linkedin = getVal('linkedin', dataRow);
    const email = getVal('email', dataRow);
    const location = getVal('location', dataRow);

    if (github) social.github = github;
    if (linkedin) social.linkedin = linkedin;
    if (email) social.email = email;
    if (location) social.location = location;

    return social;
  }
};
