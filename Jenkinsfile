pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.61.0-noble'
            reuseNode true
        }
    }
    tools {
        nodejs 'node20'
    }

    parameters {

        choice(
            name: 'BROWSER',
            choices: ['chromium', 'firefox', 'webkit'],
            description: 'Select Browser'
        )

        choice(
            name: 'ENV',
            choices: ['qa', 'uat', 'prod'],
            description: 'Select Environment'
        )

        choice(
            name: 'SUITE',
            choices: ['smoke', 'regression', 'sanity'],
            description: 'Select Test Suite'
        )

    }
    
    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                url: 'https://github.com/rajatrc2042-lab/playwright-jenkins-docker.git'
            }
        }

        stage('Verify') {
            steps {
                sh 'pwd'
                sh 'ls -la'
            }
        }
        
        stage('Install') {
            steps {
                sh 'npm ci'
    }
}
        stage('Run Tests') {
            steps {
                sh 'npx playwright test'
    }
}
    }
    
   post {
    always {
        publishHTML(target: [
            allowMissing: false,
            alwaysLinkToLastBuild: true,
            keepAll: true,
            reportDir: 'playwright-report',
            reportFiles: 'index.html',
            reportName: 'Playwright Report'
        ])
        archiveArtifacts(
            artifacts: 'playwright-report/**,test-results/**',
            fingerprint: true
        )
    }
}
}