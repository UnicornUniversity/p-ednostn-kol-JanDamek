/**
 * Counts first-name frequencies across five employee categories in a single pass.
 * @param {Array<object>} employees - Array of employee objects.
 * @returns {object} Frequency objects: { all, male, female, femalePartTime, maleFullTime }.
 */
export function countNameFrequencies(employees) {
  const all = {};
  const male = {};
  const female = {};
  const femalePartTime = {};
  const maleFullTime = {};

  for (let i = 0; i < employees.length; i++) {
    const { name, gender, workload } = employees[i];

    all[name] = (all[name] || 0) + 1;

    if (gender === "male") {
      male[name] = (male[name] || 0) + 1;

      if (workload === 40) {
        maleFullTime[name] = (maleFullTime[name] || 0) + 1;
      }
    } else {
      female[name] = (female[name] || 0) + 1;

      if (workload !== 40) {
        femalePartTime[name] = (femalePartTime[name] || 0) + 1;
      }
    }
  }

  return { all, male, female, femalePartTime, maleFullTime };
}

/**
 * Sorts a frequency map descending by count and returns both object and array representations.
 * @param {object} frequencyMap - Object mapping name to count.
 * @returns {{ nameObject: object, chartArray: Array<{label: string, value: number}> }} Sorted output.
 */
export function buildSortedOutput(frequencyMap) {
  const sortedEntries = Object.entries(frequencyMap).sort(([, a], [, b]) => b - a);

  const nameObject = Object.fromEntries(sortedEntries);

  const chartArray = sortedEntries.map(([label, value]) => ({ label, value }));

  return { nameObject, chartArray };
}
