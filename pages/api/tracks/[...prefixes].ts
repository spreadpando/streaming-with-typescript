import type { NextApiRequest, NextApiResponse } from 'next'
import S3 from '../../../util/s3Connect'

const handler = async (req: NextApiRequest, res: NextApiResponse): void => {
  const {
    query: { prefixes }
  } = req
  const key = prefixes.join('/')
  // constants
  const bucket = process.env.SPACES_BUCKET
  const range = req.headers.range
  // const key = 'tracks/aphyyd/hello/raven.mp3'
  const fileSize = await S3.headObject({ Bucket: bucket, Key: key })
    .promise()
    .then(response => response.ContentLength)

  // if client request includes range header
  if (range !== undefined) {
    // define start and end bytes for res head
    const parts = range.replace(/bytes=/, '').split('-')
    const start = parseInt(parts[0], 10)
    const end = (parts[1] !== '')
      ? parseInt(parts[1], 10)
      : fileSize - 1

    // return error
    if (start >= fileSize) {
      res.status(416).send(`Requested range not satisfiable\n ${start} >= ${fileSize}`)
      return
    }

    // get BYTE RANGE of file from aws bucket
    const params = {
      Bucket: bucket,
      Key: key,
      Range: range
    }
    const file = S3.getObject(params).createReadStream()
    const chunksize = (end - start) + 1
    // set response headers
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'audio/mp3'
    }
    // stream to client
    res.writeHead(206, head)
    file.pipe(res)
  } else {
    const params = {
      Bucket: bucket,
      Key: key
    }
    const file = S3.getObject(params).createReadStream()
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'audio/mp3'
    }
    res.writeHead(200, head)
    file.pipe(res)
  }
}

export default handler
