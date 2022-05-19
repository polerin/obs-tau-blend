/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!(@lit)/)'],
  extensionsToTreatAsEsm: ['.ts'],
  globals : {
    'ts-jest': {
      useESM : true
    }
  }
};