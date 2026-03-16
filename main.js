import {FEMALE_NAMES, FEMALE_SURNAMES, MALE_NAMES, MALE_SURNAMES} from "./src/constants.js";
import {generateRandomBirthdate, pickRandom} from "./src/utils.js";
import {buildSortedOutput, countNameFrequencies} from "./src/chartHelpers.js";

/** Average number of milliseconds in a year (accounting for leap years). */
const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;

/** Available workload options in hours per week. */
const WORKLOADS = [10, 20, 30, 40];

/** Available gender options. */
const GENDERS = ["male", "female"];

/** All gender × workload combinations for guaranteed coverage in generated data. */
const MANDATORY_COMBINATIONS = GENDERS.flatMap(
  (gender) => WORKLOADS.map((workload) => ({ gender, workload }))
);

/**
 * Generates employees and computes name frequency statistics.
 * @param {object} dtoIn - Input parameters.
 * @param {number} dtoIn.count - Number of employees to generate.
 * @param {object} dtoIn.age - Age constraints.
 * @param {number} dtoIn.age.min - Minimum age (inclusive).
 * @param {number} dtoIn.age.max - Maximum age (inclusive).
 * @returns {object} Name frequency statistics with `names` and `chartData`.
 */
export function main(dtoIn) {
  const employees = generateEmployeeData(dtoIn);
  return getEmployeeChartContent(employees);
}

/**
 * Generates a list of random employees with guaranteed gender and workload coverage.
 * @param {object} dtoIn - Input parameters.
 * @param {number} dtoIn.count - Number of employees to generate.
 * @param {object} dtoIn.age - Age constraints.
 * @param {number} dtoIn.age.min - Minimum age (inclusive).
 * @param {number} dtoIn.age.max - Maximum age (inclusive).
 * @returns {Array<object>} Array of employee objects.
 */
export function generateEmployeeData(dtoIn) {
  const { count, age } = dtoIn;
  const now = Date.now();
  const maxBirthdate = now - age.min * MS_PER_YEAR;
  const minBirthdate = now - age.max * MS_PER_YEAR;

  const employees = [];

  for (let i = 0; i < count; i++) {
    const isMandatory = i < MANDATORY_COMBINATIONS.length;

    const gender = isMandatory
      ? MANDATORY_COMBINATIONS[i].gender
      : pickRandom(GENDERS);

    const workload = isMandatory
      ? MANDATORY_COMBINATIONS[i].workload
      : pickRandom(WORKLOADS);

    const name = gender === "male"
      ? pickRandom(MALE_NAMES)
      : pickRandom(FEMALE_NAMES);

    const surname = gender === "male"
      ? pickRandom(MALE_SURNAMES)
      : pickRandom(FEMALE_SURNAMES);

    const birthdate = generateRandomBirthdate(minBirthdate, maxBirthdate);

    employees.push({ gender, birthdate, name, surname, workload });
  }

  return employees;
}

/**
 * Computes name frequency statistics across five employee categories.
 * @param {Array<object>} employees - Array of employee objects.
 * @returns {object} Object with `names` and `chartData`, both sorted descending by frequency.
 */
export function getEmployeeChartContent(employees) {
  const frequencies = countNameFrequencies(employees);

  const allSorted = buildSortedOutput(frequencies.all);
  const maleSorted = buildSortedOutput(frequencies.male);
  const femaleSorted = buildSortedOutput(frequencies.female);
  const femalePartTimeSorted = buildSortedOutput(frequencies.femalePartTime);
  const maleFullTimeSorted = buildSortedOutput(frequencies.maleFullTime);

  return {
    names: {
      all: allSorted.nameObject,
      male: maleSorted.nameObject,
      female: femaleSorted.nameObject,
      femalePartTime: femalePartTimeSorted.nameObject,
      maleFullTime: maleFullTimeSorted.nameObject,
    },
    chartData: {
      all: allSorted.chartArray,
      male: maleSorted.chartArray,
      female: femaleSorted.chartArray,
      femalePartTime: femalePartTimeSorted.chartArray,
      maleFullTime: maleFullTimeSorted.chartArray,
    },
  };
}
