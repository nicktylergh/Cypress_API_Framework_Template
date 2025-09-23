const { defineConfig } = require("cypress");
const { initPlugins } = require("cypress-plugin-init");
const { configureAllureAdapterPlugins } = require("@mmisty/cypress-allure-adapter/plugins");
const ini = require("ini");
const fs = require("fs");
const cypressEnvVariables = require("./cypress.env.json");

// Determine env (default: qa)
const env = process.env.ENV
  ? process.env.ENV.toLowerCase()
  : (cypressEnvVariables.ENV || "qa").toLowerCase();

let send_grid_live_env = false;
const fromJenkins = process.env.JENKINS_HOME || "";

// Load local credentials when NOT running from Jenkins
let awsCreds, qaCreds;
if (!fromJenkins) {
  try {
    // Example: AWS creds file (~/.aws/credentials)
    const credentialsFile = fs.readFileSync(
      `${process.env.HOME || process.env.USERPROFILE}/.aws/credentials`,
      "utf-8"
    );
    awsCreds = ini.parse(credentialsFile);

    // Example: custom QA creds (~/.qa_cypress/credentials)
    const qaCredsFile = fs.readFileSync(
      `${process.env.HOME || process.env.USERPROFILE}/.qa_cypress/credentials`,
      "utf-8"
    );
    qaCreds = ini.parse(qaCredsFile);
    qaCreds = qaCreds[env];
  } catch (e) {
    console.warn("⚠️ Local creds not found, falling back to process.env");
  }
}

// Load env vars from JSON file
const envVars = cypressEnvVariables[env];

// Allow overrides from process.env
envVars.ENV = env;
send_grid_live_env = process.env.SENDGRID_LIVE_ENV
  ? process.env.SENDGRID_LIVE_ENV.toLowerCase()
  : (envVars.SENDGRID_LIVE_ENV || "false").toLowerCase();

envVars.SENDGRID_LIVE_ENV = send_grid_live_env;

// Example secrets (always injected via Jenkins or local creds)
envVars.AWS_ACCESS_KEY_ID = !fromJenkins
  ? awsCreds?.default?.accessKeyId
  : process.env.AWS_ACCESS_KEY_ID;
envVars.AWS_SECRET_ACCESS_KEY = !fromJenkins
  ? awsCreds?.default?.secretAccessKey
  : process.env.AWS_SECRET_ACCESS_KEY;

// Switch configs between QA and PROD
switch (env) {
  case "prod":
    envVars.DB_USER = !fromJenkins ? qaCreds?.PROD_DB_USER : process.env.PROD_DB_USER;
    envVars.DB_PASS = !fromJenkins ? qaCreds?.PROD_DB_PASS : process.env.PROD_DB_PASS;
    envVars.API_KEY = !fromJenkins ? qaCreds?.PROD_API_KEY : process.env.PROD_API_KEY;

    // --- Add required placeholders ---
    envVars.MSSQL_USERNAME = !fromJenkins ? qaCreds?.PROD_MSSQL_USERNAME : process.env.PROD_MSSQL_USERNAME;
    envVars.MSSQL_PASSWORD = !fromJenkins ? qaCreds?.PROD_MSSQL_PASSWORD : process.env.PROD_MSSQL_PASSWORD;
    envVars.MSSQL_SERVER = !fromJenkins ? qaCreds?.PROD_MSSQL_SERVER : process.env.PROD_MSSQL_SERVER;
    envVars.MSSQL_DATABASE = !fromJenkins ? qaCreds?.PROD_MSSQL_DATABASE : process.env.PROD_MSSQL_DATABASE;

    envVars.MONGO_DB_URI = !fromJenkins ? qaCreds?.PROD_MONGO_DB_URI : process.env.PROD_MONGO_DB_URI;
    envVars.S3_BUCKET_NAME = !fromJenkins ? qaCreds?.PROD_S3_BUCKET_NAME : process.env.PROD_S3_BUCKET_NAME;
    break;

  default: // qa
    envVars.DB_USER = !fromJenkins ? qaCreds?.QA_DB_USER : process.env.QA_DB_USER;
    envVars.DB_PASS = !fromJenkins ? qaCreds?.QA_DB_PASS : process.env.QA_DB_PASS;
    envVars.API_KEY = !fromJenkins ? qaCreds?.QA_API_KEY : process.env.QA_API_KEY;

    // --- Add required placeholders ---
    envVars.MSSQL_USERNAME = !fromJenkins ? qaCreds?.QA_MSSQL_USERNAME : process.env.QA_MSSQL_USERNAME;
    envVars.MSSQL_PASSWORD = !fromJenkins ? qaCreds?.QA_MSSQL_PASSWORD : process.env.QA_MSSQL_PASSWORD;
    envVars.MSSQL_SERVER = !fromJenkins ? qaCreds?.QA_MSSQL_SERVER : process.env.QA_MSSQL_SERVER;
    envVars.MSSQL_DATABASE = !fromJenkins ? qaCreds?.QA_MSSQL_DATABASE : process.env.QA_MSSQL_DATABASE;

    envVars.MONGO_DB_URI = !fromJenkins ? qaCreds?.QA_MONGO_DB_URI : process.env.QA_MONGO_DB_URI;
    envVars.S3_BUCKET_NAME = !fromJenkins ? qaCreds?.QA_S3_BUCKET_NAME : process.env.QA_S3_BUCKET_NAME;
    break;
}

module.exports = defineConfig({
  retries: {
    runMode: 2,
    openMode: 0,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // Save JSON results for reporting
      require("cypress-json-results")({
        on,
        filename: "results.json",
      });

      // Init Allure plugin
      initPlugins(on, [configureAllureAdapterPlugins], config);

      // Pass env vars into Cypress
      Object.keys(envVars).forEach((key) => {
        config.env[key] = envVars[key];
      });

      // Load custom plugins if needed
      const pluginConfigs = require("./cypress/plugins/index.js")(on, config);
      config.pluginConfigs = pluginConfigs;

      return config;
    },
  },
  video: false,
});
