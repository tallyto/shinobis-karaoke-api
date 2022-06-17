export const music = {
  Type: 'AWS::DynamoDB::Table',
  DeletionPolicy: 'Retain',
  Properties: {
    TableName: '${self:provider.environment.MUSIC_TABLE}',
    AttributeDefinitions: [
      { AttributeName: 'id', AttributeType: 'S' },
      { AttributeName: 'played', AttributeType: 'N' }
    ],
    KeySchema: [
      { AttributeName: 'id', KeyType: 'HASH' }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: '1',
      WriteCapacityUnits: '1'
    },
    GlobalSecondaryIndexes: [
      {
        IndexName: 'played-index',
        KeySchema: [
          { AttributeName: 'played', KeyType: 'HASH' },
        ],
        Projection: { // attributes to project into the index
          ProjectionType: 'ALL'
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: '1',
          WriteCapacityUnits: '1'
        },
      }
    ]
  },


}