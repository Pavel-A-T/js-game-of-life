module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  extends: ["airbnb-base", "prettier", "plugin:jest/recommended"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {},
};
