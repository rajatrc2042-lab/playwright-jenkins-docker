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
    name: 'SUITES',
    defaultValue: 'smoke',
    description: 'Example: smoke,regression'
)

choice(
            name: 'ENV',
            choices: ['dev', 'qa', 'prod'],
            description: 'Select Environment'
        )

    }

    environment {
        ENV = "${params.ENV}"
        SUITES = "${params.SUITES}"
        BROWSERS = "${params.BROWSERS}"
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

        script {

            echo "Browsers : ${BROWSERS}"
            echo "Environment : ${ENV}"
            echo "Suites : ${SUITES}"

            def browserArgs = BROWSERS
                .split(',')
                .collect { "--project=${it.trim()}" }
                .join(' ')

            def grepPattern = SUITES
                .split(',')
                .collect { "@${it.trim()}" }
                .join('|')

            sh """
                npx playwright test \
                ${browserArgs} \
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