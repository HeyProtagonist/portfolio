interface EmploymentPeriod {
  startDate: string; // e.g., "Jul 2021"
  endDate: string; // e.g., "Present" or "Jun 2023"
}

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

export function calculateYearsOfExperience(
  history: EmploymentPeriod[],
): number {
  const now = new Date();

  const parseMonth = (str: string): Date => {
    const [monthStr, yearStr] = str.split(" ");
    const month = MONTHS.indexOf(monthStr.slice(0, 3).toLowerCase());
    return new Date(parseInt(yearStr, 10), month, 1);
  };

  // End month is inclusive ("Jun 2020" means through end of June), so the bound is the 1st of the next month
  const parseEnd = (str: string): Date => {
    if (str.toLowerCase() === "present") return now;
    const date = parseMonth(str);
    return new Date(date.getFullYear(), date.getMonth() + 1, 1);
  };

  const periods = history
    .map(({ startDate, endDate }) => [parseMonth(startDate), parseEnd(endDate)])
    .sort((a, b) => a[0].getTime() - b[0].getTime());

  // Merge overlapping periods (e.g. promotions sharing a boundary month) so no month counts twice
  const merged: Date[][] = [];
  for (const [start, end] of periods) {
    const last = merged[merged.length - 1];
    if (last && start <= last[1]) {
      if (end > last[1]) last[1] = end;
    } else {
      merged.push([start, end]);
    }
  }

  const totalMs = merged.reduce(
    (acc, [start, end]) => acc + (end.getTime() - start.getTime()),
    0,
  );

  const years = totalMs / (1000 * 60 * 60 * 24 * 365.25);
  return parseFloat(years.toFixed(1)); // round to 1 decimal
}
