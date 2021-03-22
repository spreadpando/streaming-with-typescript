const s3GetObject = (s3, key) => {
  return new Promise((resolve) => {
    const params = {
      Bucket: process.env.SPACES_BUCKET,
      Key: key
    }

    const object = s3.getObject(params).promise()

    object.then((data) => {
      resolve(data)
    }).catch((err) => {
      console.log(err)
    })
  })
}

export default s3GetObject
