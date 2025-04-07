module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	transform: {
		"^.+\\.tsx?$": "ts-jest",
	},
	moduleNameMapper: {
		"^axios$": require.resolve("axios"),
	},
	transformIgnorePatterns: ["/node_modules/(?!(axios)/)"],
	testMatch: ["**/__tests__/**/*.test.ts"],
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
