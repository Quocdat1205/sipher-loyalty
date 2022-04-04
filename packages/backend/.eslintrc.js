module.exports = {
  parserOptions: {
    project: "./tsconfig.json",
  },
  extends: ["airbnb-base", "airbnb-typescript/base", "../../.eslintrc.js"],
  rules: {
    "class-methods-use-this": "off",
    "no-unused-vars": "warn",
    "eslint-disable-next-line": "off",
    "no-await-in-loop": "off",
    "prefer-destructuring": "off",
    "no-restricted-syntax": ["error", "ForInStatement"],
  },
  // "eslint.validate": ["json", { language: "typescript", autoFix: true }],
};
