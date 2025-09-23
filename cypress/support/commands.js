// ***********************************************
// Custom Cypress Commands
// ***********************************************
//
// This file is for reusable Cypress commands
// (e.g., generating test data, making requests,
// or wrapping common assertions).
//
// Add your own commands here.
// https://on.cypress.io/custom-commands
//

// Example: mark tests with an Allure suite
Cypress.Commands.add("setAllureSuite", (suiteName) => {
  if (cy.allure) {
    cy.allure().parentSuite(suiteName);
  }
});

// Example: generate a random email
Cypress.Commands.add("generateRandomEmail", (prefix = "user") => {
  const domain = "example.com";
  return `${prefix}${Date.now()}@${domain}`;
});

// Example: simple API request wrapper
Cypress.Commands.add("apiRequest", (options) => {
  return cy.request({
    method: options.method || "GET",
    url: options.url,
    body: options.body || null,
    headers: options.headers || {},
    failOnStatusCode: options.failOnStatusCode ?? true,
  });
});

// Example: read a file with default timeout
Cypress.Commands.add("readFileCustom", (filePath, encoding = "utf-8", options = {}) => {
  options.timeout = options.timeout || 20 * 1000;
  return cy.readFile(filePath, encoding, options);
});
