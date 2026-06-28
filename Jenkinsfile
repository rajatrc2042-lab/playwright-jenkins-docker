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
            echo Browser : ${params.BROWSERS}
            echo Environment : ${params.ENV}
            echo Suites : ${params.SUITE}
        """

        script {

            // Convert browsers into a list
            def browsers = params.BROWSERS
                    .split(',')
                    .collect { it.trim() }

            // Convert suites into grep pattern
            def grepPattern = params.SUITES
                    .split(',')
                    .collect { "@${it.trim()}" }
                    .join('|')

            for (browser in browsers) {

                echo "Running on ${browser}"

                sh """
                    TEST_ENV=${params.ENV} \
                    npx playwright test \
                    --project=${browser} \
                    --grep "${grepPattern}"
                """
            }
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