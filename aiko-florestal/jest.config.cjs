/* eslint-disable no-undef */
module.exports = {
   preset: 'ts-jest',
   testEnvironment: 'jsdom',
   setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
   moduleNameMapper: {
     '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
     '^@/(.*)$': '<rootDir>/src/$1',
   },
   transform: {
     '^.+\\.(ts|tsx)$': 'ts-jest',
   },
   testPathIgnorePatterns: ['/node_modules/', '/dist/'],
   collectCoverage: false,
   coverageDirectory: 'coverage',
   coverageReporters: ['text', 'lcov'],
 };
