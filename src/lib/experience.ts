/**
 * Dynamic Experience Calculator
 * Automatically calculates career duration from start date to today
 */

export const CAREER_START_DATE = "2024-05-01"; // Career began May 2024 at Neuberg Diagnostics

export interface ExperienceStats {
  yearsDecimal: number;
  yearsFormatted: string; // e.g. "2.5"
  yearsBadge: string;     // e.g. "2.5+ Yrs"
  fullLabel: string;      // e.g. "2.5+ Years"
  totalMonths: number;    // e.g. 29
}

export function getDynamicExperience(startDateStr: string = CAREER_START_DATE): ExperienceStats {
  const start = new Date(startDateStr);
  const now = new Date();

  let months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  if (now.getDate() < start.getDate()) {
    months -= 1;
  }

  const totalMonths = Math.max(0, months);
  const yearsDecimal = totalMonths / 12;
  const yearsFormatted = (Math.round(yearsDecimal * 10) / 10).toFixed(1);

  return {
    yearsDecimal,
    yearsFormatted,
    yearsBadge: `${yearsFormatted}+ Yrs`,
    fullLabel: `${yearsFormatted}+ Years`,
    totalMonths,
  };
}
