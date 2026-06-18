import { getSheetRawData } from './googleSheets.core';
import { defaultCertifications as fallbackCertifications } from '../data/portfolioData';
import { Certification } from '../types';

export const certificationsService = {
  async getCertifications(): Promise<Certification[]> {
    const raw = await getSheetRawData('Certifications');
    if (!raw || raw.length < 2) {
      return fallbackCertifications;
    }
    
    const headers = raw[0].map(h => h.trim().toLowerCase());
    const dataRows = raw.slice(1);
    
    const titleIdx = headers.indexOf('title');
    const issuerIdx = headers.indexOf('issuer');
    const dateIdx = headers.indexOf('issuedate');
    const skillsIdx = headers.indexOf('skills');
    const credIdx = headers.indexOf('credentialurl');
    
    const parsed: Certification[] = [];
    
    dataRows.forEach(row => {
      const getVal = (idx: number, fallback: string = ''): string => {
        return (idx >= 0 && idx < row.length) ? row[idx].trim() : fallback;
      };
      
      const title = getVal(titleIdx);
      if (!title) return;
      
      parsed.push({
        title,
        issuer: getVal(issuerIdx),
        issueDate: getVal(dateIdx),
        skills: getVal(skillsIdx),
        credentialUrl: getVal(credIdx)
      });
    });
    
    return parsed.length > 0 ? parsed : fallbackCertifications;
  }
};
