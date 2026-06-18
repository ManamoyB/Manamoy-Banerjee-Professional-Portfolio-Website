import { getSheetRawData } from './googleSheets.core';
import { personalDetails as fallbackProfile } from '../data/portfolioData';
import { Education } from '../types';

export const educationService = {
  async getEducation(): Promise<Education> {
    const raw = await getSheetRawData('Education');
    if (!raw || raw.length < 2) {
      return fallbackProfile.education;
    }

    // Design to support either Key-Value (e.g. key in Col 0, val in Col 1) or headers row
    const education: Education = { ...fallbackProfile.education };

    // Let's try parsing as Key-Value first
    let hasKeys = false;
    raw.forEach(row => {
      if (row.length < 2) return;
      const key = row[0].trim().toLowerCase();
      const val = row[1].trim();
      if (!val) return;

      if (['degree', 'institution', 'duration', 'cgpa', 'details'].includes(key)) {
        hasKeys = true;
        if (key === 'degree') education.degree = val;
        else if (key === 'institution') education.institution = val;
        else if (key === 'duration') education.duration = val;
        else if (key === 'cgpa') education.cgpa = val;
        else if (key === 'details') {
          education.details = val.split(/[;|]/).map(s => s.trim()).filter(Boolean);
        }
      }
    });

    if (hasKeys) {
      return education;
    }

    // Otherwise try parsing as headers (Col 0: degree, Col 1: institution, Col 2: duration, Col 3: cgpa, Col 4: details)
    const headers = raw[0].map(h => h.trim().toLowerCase());
    const dataRow = raw[1];

    const getVal = (headersList: string[], row: string[]): string => {
      for (const header of headersList) {
        const idx = headers.indexOf(header);
        if (idx >= 0 && idx < row.length) {
          return row[idx].trim();
        }
      }
      return '';
    };

    const degree = getVal(['degree', 'program'], dataRow);
    const institution = getVal(['institution', 'school', 'university'], dataRow);
    const duration = getVal(['duration', 'years', 'dates'], dataRow);
    const cgpa = getVal(['cgpa', 'grades', 'gpa'], dataRow);
    const detailsVal = getVal(['details', 'description', 'notes'], dataRow);

    if (degree) education.degree = degree;
    if (institution) education.institution = institution;
    if (duration) education.duration = duration;
    if (cgpa) education.cgpa = cgpa;
    if (detailsVal) {
      education.details = detailsVal.split(/[;|]/).map(s => s.trim()).filter(Boolean);
    }

    return education;
  }
};
