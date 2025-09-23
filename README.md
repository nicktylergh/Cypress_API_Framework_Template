# API Automation Framework (Cypress + Jenkins + Allure)

This is a sanitized version of a production-grade test automation framework
originally scaled to run 2500+ daily regression tests.

## Features
- API + E2E test automation
- Jenkins CI/CD pipeline integration
- Allure reporting
- Database and storage validation utilities (MSSQL, MongoDB, AWS S3)

## Getting Started
1. Clone repo
2. Install dependencies: `npm install`
3. Copy `cypress.env.example.json` → `cypress.env.json` and set environment variables
4. Run tests: `npx cypress run`

## CI/CD with Jenkins
This framework includes a sample Jenkins pipeline (`Jenkinsfile`) that:
- Installs dependencies
- Runs Cypress tests
- Archives test results
- Publishes Allure reports

## Tech Stack
- **Language:** JavaScript (Cypress)
- **Test Runner:** Cypress
- **Reporting:** Allure
- **CI/CD:** Jenkins
- **Validation:** Database + AWS utilities


## Project Structure
CYPRESS_API_FRAMEWORK_TEMPLATE/
├── .github/                     # GitHub workflows / configs
│   └── CODEOWNERS
│
├── cypress/
│   ├── downloads/               # Default Cypress downloads folder
│   ├── e2e/                     # Example test specs
│   │   ├── sample_api_test.cy.js
│   │   └── sample_ui_test.cy.js
│   │
│   ├── fixtures/                # Example test data
│   │   └── example.json
│   │
│   ├── plugins/                 # Node plugins (DB, S3, etc.)
│   │   └── index.js
│   │
│   └── support/                 # Cypress support files
│       ├── commands.js          # Custom Cypress commands
│       ├── e2e.js               # Global setup (before hooks, Allure, AWS)
│       └── endpoints.js         # Central API endpoint definitions
│
├── .eslintrc.js                 # ESLint config
├── .gitignore                   # Git ignore rules
├── .prettierrc.json             # Prettier formatting config
├── cypress.config.js            # Main Cypress config (env vars, plugins, Allure)
├── cypress.env.example.json     # Example environment variables
├── Jenkinsfile                  # CI/CD pipeline (Jenkins)
├── jsconfig.json                # VSCode intellisense config (fix JSON error)
├── package.json                 # Node dependencies and scripts
├── pull_request_template.md     # PR template
└── README.md                    # Project documentation

## Purpose
This repo is a **template** version of a production-grade framework.  
All sensitive information has been removed. It demonstrates:
- How to structure a scalable Cypress automation framework
- How to integrate with Jenkins for CI/CD
- How to generate reports with Allure

## Next Steps
- Extend this framework with UI tests
- Add environment-specific configs
- Plug into any CI/CD system (Jenkins, GitHub Actions, GitLab)
