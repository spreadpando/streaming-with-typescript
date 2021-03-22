const s3ListObjects = (s3, prefix) => {
  return new Promise((resolve) => {
    const params = {
      Bucket: process.env.SPACES_BUCKET,
      Prefix: prefix
    }

    const listObjects = s3.listObjects(params).promise()
    const artist = prefix.split('/')[1]
    const collection = prefix.split('/')[2]
    listObjects.then((data) => {
      const contents = data.Contents
      const tracks = []
      contents.forEach(obj => {
        const key = obj.Key
        const id = key.replace(prefix, '')
        const name = id.substring(0, id.length - 4)
        const track = {
          title: name,
          artist: artist,
          collection: collection,
          apiKey: key
        }
        if (track.title.length) { tracks.push(track) }
      })
      resolve(tracks)
    }).catch((err) => {
      console.log(err)
    })
  })
}

export default s3ListObjects
