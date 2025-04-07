/** @type {import('jest').Config} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    transform: {
        '^.+\\.(ts|tsx)$': 'babel-jest',
    },
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '^leaflet$': require.resolve('leaflet'),
    },
    transformIgnorePatterns: [
        '/node_modules/(?!(react-leaflet|@react-leaflet/core|leaflet)/)', 
    ],
};