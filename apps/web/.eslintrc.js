const sharedConfig = require("@nexus/config/eslint-preset");

module.exports = {
  ...sharedConfig,
  extends: [
    "next/core-web-vitals",
    "google",
    "plugin:@typescript-eslint/recommended"
  ],
  rules: {
    ...sharedConfig.rules,
    "react/no-unescaped-entities": "off",
    "@next/next/no-page-custom-font": "off"
  }
};
