import type { AWS } from '@serverless/typescript';

import music from '@functions/music';
import { resources } from 'src/resources';

const serverlessConfiguration: AWS = {
  service: 'shinobis-karaoke-api',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      MUSIC_TABLE: '${self:custom.musicTableName}',
    },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: [
              'dynamodb:GetItem',
              'dynamodb:PutItem',
              'dynamodb:UpdateItem',
              'dynamodb:DescribeTable',
              'dynamodb:DeleteItem',
              'dynamodb:Scan',
            ],
            Resource: '*'
          }
        ]
      }
    }
  },
  // import the function via paths
  functions: { music },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    region: '${ self:provider.region}',
    musicTableName: '${self:service}-music-${opt:stage, "dev"}',
  },
  resources: {
    Resources: resources
  }

};

module.exports = serverlessConfiguration;
