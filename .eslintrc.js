module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true, // Add this line to include Node.js environment for Cypress
  },
  extends: ["eslint:recommended", "plugin:cypress/recommended"], // Add the 'plugin:cypress/recommended' configuration
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
    {
      files: ["cypress/**/*.js"], // Apply the override only to Cypress files
      rules: {
        "cypress/no-unnecessary-waiting": "off", // Disable the rule for Cypress files
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {},
  globals: {
    // Add Cypress global variables here
    cy: true,
    describe: true,
    it: true,
    expect: true,
  },
};
