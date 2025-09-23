// ***********************************************
// Global Cypress support (runs before all tests)
// ***********************************************

import "./commands";
import "@mmisty/cypress-allure-adapter/support";
const AWS = require("aws-sdk");

// Validate environment before tests
before(() => {
  const validEnvs = ["qa", "prod", "dev"];
  const currentEnv = Cypress.env("ENV");

  if (!currentEnv || !validEnvs.includes(currentEnv)) {
    throw new Error(`Invalid environment: ${currentEnv}`);
  }

  // Example global variable setup
  Cypress.env("generatedEmailsMap", {});
});

// Configure Allure tagging per test
beforeEach(function () {
  const suiteName = this.currentTest.parent.title;
  cy.setAllureSuite(suiteName);

  if (cy.allure) {
    cy.allure().tag(Cypress.spec.relative);
  }
});

// --- AWS Placeholder ---
// You can configure AWS SDK here if needed.
// Replace with your own credentials or use Jenkins secrets.
AWS.config.update({
  region: "us-west-2",
  accessKeyId: Cypress.env("AWS_ACCESS_KEY_ID") || "your-access-key",
  secretAccessKey: Cypress.env("AWS_SECRET_ACCESS_KEY") || "your-secret-key",
});

// Example DynamoDB client placeholder
const dynamoDBClient = new AWS.DynamoDB.DocumentClient();
Cypress.env("dynamoDBClient", dynamoDBClient);
