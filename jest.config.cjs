module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom', // Certifique-se de que o ambiente de teste está correto
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};
