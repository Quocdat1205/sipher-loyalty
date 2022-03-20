module.exports = {
  parserOptions: {
    project: "./tsconfig.json",
  },
  extends: ["airbnb-base", "airbnb-typescript/base", "../../.eslintrc.js"],
  rules: {
    "class-methods-use-this": "off",
    "no-unused-vars": "warn",
    "eslint-disable-next-line": "off",
  },
  // "eslint.validate": ["json", { language: "typescript", autoFix: true }],
};
