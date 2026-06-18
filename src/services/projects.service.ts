import { getSheetRawData } from './googleSheets.core';
import { projectsData as fallbackProjects } from '../data/portfolioData';
import { Project } from '../types';

export const projectsService = {
  async getProjects(): Promise<Project[]> {
    const raw = await getSheetRawData('Projects');
    if (!raw || raw.length < 2) {
      return fallbackProjects;
    }
    
    // Find column alignments dynamically or statically
    const headers = raw[0].map(h => h.trim().toLowerCase());
    const dataRows = raw.slice(1);
    
    const idIdx = headers.indexOf('id');
    const titleIdx = headers.indexOf('title');
    const catIdx = headers.indexOf('category');
    const descIdx = headers.indexOf('description');
    const probIdx = headers.indexOf('problem');
    const solIdx = headers.indexOf('solution');
    const impIdx = headers.indexOf('impact');
    const techIdx = headers.indexOf('techstack');
    const gitIdx = headers.indexOf('githuburl');
    const demoIdx = headers.indexOf('demourl');
    const imgIdx = headers.indexOf('image');
    const featIdx = headers.indexOf('featured');
    
    const parsed: Project[] = [];
    
    dataRows.forEach(row => {
      if (row.length < 2) return;
      const getVal = (idx: number, fallback: string = ''): string => {
        return (idx >= 0 && idx < row.length) ? row[idx].trim() : fallback;
      };
      
      const id = getVal(idIdx);
      const title = getVal(titleIdx);
      if (!id || !title) return; // skip rows missing key info
      
      const techStackString = getVal(techIdx);
      const techStack = techStackString 
        ? techStackString.split(/[;,|]+/).map(s => s.trim()).filter(Boolean)
        : [];
        
      const isFeatured = getVal(featIdx).toLowerCase() === 'true' || getVal(featIdx) === '1';
      
      parsed.push({
        id,
        title,
        category: getVal(catIdx, 'General'),
        description: getVal(descIdx),
        problem: getVal(probIdx),
        solution: getVal(solIdx),
        impact: getVal(impIdx),
        techStack,
        githubUrl: getVal(gitIdx) || undefined,
        demoUrl: getVal(demoIdx) || undefined,
        image: getVal(imgIdx, '🚀'),
        featured: isFeatured
      });
    });
    
    return parsed.length > 0 ? parsed : fallbackProjects;
  }
};
