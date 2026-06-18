import { getSheetRawData } from './googleSheets.core';
import { personalDetails as fallbackProfile } from '../data/portfolioData';
import { Education } from '../types';

export const profileService = {
  async getProfile(): Promise<typeof fallbackProfile> {
    const raw = await getSheetRawData('Profile');
    if (!raw || raw.length < 2) {
      return fallbackProfile;
    }
    
    // Convert Key-Value format to the expected structure
    const details = { ...fallbackProfile };
    
    raw.forEach(row => {
      if (row.length < 2) return;
      const key = row[0].trim().toLowerCase();
      const val = row[1].trim();
      
      if (!val) return;
      
      switch (key) {
        case 'name':
          details.name = val;
          break;
        case 'title':
          details.title = val;
          break;
        case 'roles':
          details.roles = val.split(',').map(s => s.trim());
          break;
        case 'targetroles':
          details.targetRoles = val.split(',').map(s => s.trim());
          break;
        case 'bio':
          details.bio = val;
          break;
        case 'longbio':
          details.longBio = val;
          break;
        case 'degree':
          if (!details.education) details.education = {} as Education;
          details.education.degree = val;
          break;
        case 'institution':
          if (!details.education) details.education = {} as Education;
          details.education.institution = val;
          break;
        case 'duration':
          if (!details.education) details.education = {} as Education;
          details.education.duration = val;
          break;
        case 'cgpa':
          if (!details.education) details.education = {} as Education;
          details.education.cgpa = val;
          break;
        case 'education_details':
          if (!details.education) details.education = {} as Education;
          details.education.details = val.split(/[;|]/).map(s => s.trim());
          break;
        case 'github':
          if (!details.socialLinks) details.socialLinks = {} as any;
          details.socialLinks.github = val;
          break;
        case 'linkedin':
          if (!details.socialLinks) details.socialLinks = {} as any;
          details.socialLinks.linkedin = val;
          break;
        case 'email':
          if (!details.socialLinks) details.socialLinks = {} as any;
          details.socialLinks.email = val;
          break;
        case 'location':
          if (!details.socialLinks) details.socialLinks = {} as any;
          details.socialLinks.location = val;
          break;
      }
    });
    
    return details;
  }
};
