interface EmploymentPeriod {
  startDate: string; // e.g., "Jul 2021"
  endDate: string; // e.g., "Present" or "Jun 2023"
}

export function calculateYearsOfExperience(
  history: EmploymentPeriod[],
): number {
  const now = new Date();

  const parseDate = (str: string): Date => {
    if (str.toLowerCase() === "present") return now;
    const [monthStr, yearStr] = str.split(" ");
    const month = new Date(`${monthStr} 1, 2000`).getMonth(); // dummy year for parsing month
    const year = parseInt(yearStr, 10);
    return new Date(year, month, 1);
  };

  const totalMs = history.reduce((acc, { startDate, endDate }) => {
    const start = parseDate(startDate);
    const end = parseDate(endDate);
    return acc + (end.getTime() - start.getTime());
  }, 0);

  const years = totalMs / (1000 * 60 * 60 * 24 * 365.25);
  return parseFloat(years.toFixed(1)); // round to 1 decimal
}
