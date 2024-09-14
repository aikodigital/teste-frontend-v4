module.exports = {
  ignorePatterns: ["node_modules/"],

  "overrides": [
    {
      "files": ["node_modules/**/*.d.ts"],
      "rules": {
        "no-empty-interface": "off"
      }
    }
  ]
}
