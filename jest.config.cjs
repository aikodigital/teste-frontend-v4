module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    moduleFileExtensions: ["js", "vue"],
    moduleNameMapper: {
      "^@/(.*)": "<rootDir>/$1",
    },
    transform: {
      "^.+\\.(js)$": "babel-jest",
      ".+\\.(css|scss|png|jpg|svg)$": "jest-transform-stub",
      ".*\\.(vue)$": "@vue/vue3-jest",
    },
    
    transformIgnorePatterns: ["node_modules/(?!(nuxt3|unenv))", "node_modules/(?!(vuetify|@nuxt))"],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.json',
      },
    },
};