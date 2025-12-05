module.exports = {
  extends: ["google", "eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    "require-jsdoc": "off",
    "valid-jsdoc": "off",
    "max-len": ["error", { "code": 120 }],
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }]
  },
  env: {
    node: true,
    es6: true,
  },
};
