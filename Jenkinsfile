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

        string(
    name: 'BROWSERS',
    defaultValue: 'chromium',
    description: 'Comma separated browsers. Example: chromium,firefox'
)

string(
    name: 'BROWSERS',
    defaultValue: 'firefox',
    description: 'Comma separated browsers. Example: chromium,firefox'
)

        choice(
            name: 'ENV',
            choices: ['dev', 'qa', 'prod'],
            description: 'Select Environment'
        )

        string(
    name: 'SUITES',
    defaultValue: 'smoke',
    description: 'Example: smoke,regression'
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

        sh """
            echo Browser : ${params.BROWSER}
            echo Environment : ${params.ENV}
            echo Suite : ${params.SUITE}
        """
def browsers = params.BROWSERS.split(',')
def grepPattern = params.SUITES
        .split(',')
        .collect { "@${it.trim()}" }
        .join('|')
for (browser in browsers) {
        sh "ENV=${params.ENV} \
            npx playwright test \
            --project=${params.BROWSER} \
            --grep "${grepPattern}"
    """
}
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