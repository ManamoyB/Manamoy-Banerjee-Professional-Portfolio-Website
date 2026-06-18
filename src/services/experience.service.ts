import { getSheetRawData } from './googleSheets.core';
import { experienceData as fallbackExperience } from '../data/portfolioData';
import { Experience } from '../types';

export const experienceService = {
  async getExperience(): Promise<Experience[]> {
    const raw = await getSheetRawData('Experience');
    if (!raw || raw.length < 2) {
      return fallbackExperience;
    }
    
    const headers = raw[0].map(h => h.trim().toLowerCase());
    const dataRows = raw.slice(1);
    
    const roleIdx = headers.indexOf('role');
    const compIdx = headers.indexOf('company');
    const locIdx = headers.indexOf('location');
    const durIdx = headers.indexOf('duration');
    const typeIdx = headers.indexOf('type');
    const pointsIdx = headers.indexOf('points');
    const techIdx = headers.indexOf('techused');
    
    const parsed: Experience[] = [];
    
    dataRows.forEach(row => {
      const getVal = (idx: number, fallback: string = ''): string => {
        return (idx >= 0 && idx < row.length) ? row[idx].trim() : fallback;
      };
      
      const role = getVal(roleIdx);
      if (!role) return;
      
      const pointsString = getVal(pointsIdx);
      const points = pointsString 
        ? pointsString.split(/[;|]+/).map(s => s.trim()).filter(Boolean)
        : [];
        
      const techString = getVal(techIdx);
      const techUsed = techString 
        ? techString.split(/[;,|]+/).map(s => s.trim()).filter(Boolean)
        : [];
        
      const typeRaw = getVal(typeIdx, 'Internship');
      const validTypes = ['Internship', 'Leadership', 'Academic Project', 'Achievement'];
      const type = validTypes.find(t => t.toLowerCase() === typeRaw.toLowerCase()) || 'Internship';
      
      parsed.push({
        role,
        company: getVal(compIdx),
        location: getVal(locIdx),
        duration: getVal(durIdx),
        type: type as any,
        points,
        techUsed: techUsed.length > 0 ? techUsed : undefined
      });
    });
    
    return parsed.length > 0 ? parsed : fallbackExperience;
  }
};
