'use strict'

const { receiveSMS }  = require('./receiveSMS')


exports.lambdaHandler = async (event, context) => {
  console.log('Starting handler')
  
  await Promise.all(
    event.Records.map(async (record) => {
      try {
        await receiveSMS(record)
      } catch (err) {
        console.error(err)
        return err
      }
    })
  )

  return  {
    'statusCode': 200
  }
}
