/**
 * Picks a random element from the given array.
 * @param {Array} array - Non-empty array to pick from.
 * @returns {*} Randomly selected element.
 */
export function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Generates a random ISO 8601 date string within the given timestamp range.
 * @param {number} minTimestamp - Earliest timestamp (ms).
 * @param {number} maxTimestamp - Latest timestamp (ms).
 * @returns {string} Date in format YYYY-MM-DDTHH:mm:ss.sssZ.
 */
export function generateRandomBirthdate(minTimestamp, maxTimestamp) {
  const timestamp = minTimestamp + Math.random() * (maxTimestamp - minTimestamp);
  return new Date(timestamp).toISOString();
}
