module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    globals: {
        'ts-jest': {
        isolatedModules: true,
        },
    },
    moduleFileExtensions: ['ts', 'js'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
};