pipeline {
    agent any

    tools {
        // Use the NodeJS tool configured in Jenkins (must be set up in Global Tools)
        nodejs "NodeJS"
    }

    stages {
        stage('Checkout') {
            steps {
                // Pull the source code from the repo
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                // Install all npm dependencies from package.json
                sh 'npm install'
            }
        }

        stage('Run Cypress Tests') {
            steps {
                script {
                    // Default Cypress run command
                    def runCommand = "npx cypress run"

                    // If a SPEC param is provided, run only that test/spec
                    if (params.SPEC) {
                        runCommand += " --spec ${params.SPEC}"
                    }

                    sh runCommand
                }
            }
        }

        stage('Archive Results') {
            steps {
                // Archive Cypress reports as build artifacts
                archiveArtifacts artifacts: 'cypress/reports/**', allowEmptyArchive: true
            }
        }

        stage('Publish Allure Report') {
            steps {
                // Generate and publish Allure report
                allure([
                    includeProperties: false,
                    jdk: '',
                    reportBuildPolicy: 'ALWAYS',
                    results: [[path: 'allure-results']]
                ])
            }
        }
    }

    post {
        always {
            // Always publish JUnit results (for Jenkins test trends)
            junit 'cypress/results/*.xml'
        }
        success {
            echo "✅ Tests passed!"
        }
        failure {
            echo "❌ Tests failed!"
        }
    }
}
