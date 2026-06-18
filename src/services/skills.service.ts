import { getSheetRawData } from './googleSheets.core';
import { skillsData as fallbackSkills } from '../data/portfolioData';
import { Skill } from '../types';

export const skillsService = {
  async getSkills(): Promise<Skill[]> {
    const raw = await getSheetRawData('Skills');
    if (!raw || raw.length < 2) {
      return fallbackSkills;
    }
    
    const headers = raw[0].map(h => h.trim().toLowerCase());
    const dataRows = raw.slice(1);
    
    const nameIdx = headers.indexOf('name');
    const catIdx = headers.indexOf('category');
    const profIdx = headers.indexOf('proficiency');
    const iconIdx = headers.indexOf('icontype');
    
    const parsed: Skill[] = [];
    
    dataRows.forEach(row => {
      const getVal = (idx: number, fallback: string = ''): string => {
        return (idx >= 0 && idx < row.length) ? row[idx].trim() : fallback;
      };
      
      const name = getVal(nameIdx);
      if (!name) return;
      
      const categoryRaw = getVal(catIdx, 'Programming');
      // Validate category structure match
      const validCategories = ['Programming', 'Domains', 'Frameworks', 'Databases', 'Tools'];
      const category = validCategories.find(c => c.toLowerCase() === categoryRaw.toLowerCase() || 
        (c === 'Domains' && categoryRaw === 'AI/ML') || 
        (c === 'Frameworks' && categoryRaw === 'Data Analytics')
      ) || 'Programming';
      
      // Fix rating limit standard [0, 100]
      const proficiencyNum = Math.min(100, Math.max(0, parseInt(getVal(profIdx, '80'), 10) || 80));
      
      parsed.push({
        name,
        category: category as any,
        proficiency: proficiencyNum,
        iconType: getVal(iconIdx).toLowerCase() || name.toLowerCase()
      });
    });
    
    return parsed.length > 0 ? parsed : fallbackSkills;
  }
};
