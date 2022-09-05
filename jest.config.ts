/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  preset: 'ts-jest/presets/js-with-ts-esm',

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ['src/**/*.{js,ts}'],

  // The directory where Jest should output its coverage files
  //coverageDirectory: "coverage/jest",

  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },

  resolver: 'jest-ts-webcompat-resolver',

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "babel",

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: ["json"],
  roots: ["test", "src"],
  extensionsToTreatAsEsm: ['.ts'],

  globals: {
    'ts-jest': {
      useESM: true
    }
  }
};
