import AWS from 'aws-sdk'

const spacesEndpoint = new AWS.Endpoint('nyc3.digitaloceanspaces.com')

const S3 = new AWS.S3({
  apiVersion: '2006-03-01',
  endpoint: spacesEndpoint,
  accessKeyId: process.env.SPACES_KEY,
  secretAccessKey: process.env.SPACES_SECRET
})

export default S3
