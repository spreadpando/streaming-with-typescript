import fetch from 'isomorphic-unfetch'

interface IRepo {
  name?: string
  url?: string
  description?: string
  readme?: string
}
const ghListRepos: Promise = async (key: string) => {
  return await new Promise((resolve) => {
    fetch(`https://api.github.com/${key}`).then((response) => {
      response.json().then((repos) => {
        const data = []
        repos.forEach(repo => {
          const obj: IRepo = {
            name: repo.name,
            url: repo.html_url,
            description: repo.description,
            readme: `${repo.html_url}/blob/master/README.md`
          }
          data.push(obj)
        })
        resolve(data)
      }).catch((err) =>
        console.log(err))
    }).catch((err) =>
      console.log(err))
  })
}

export default ghListRepos
