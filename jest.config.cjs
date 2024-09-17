module.exports = {
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],

  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.m?js$": "babel-jest",
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'jest-transform-stub',
    '\\.(png|jpg|jpeg|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!react-leaflet|@react-leaflet/core|leaflet)/', 
  ],
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "jsx", "json", "node"],
};
