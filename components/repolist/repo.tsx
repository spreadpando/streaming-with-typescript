import React from 'react'
import styled from '@emotion/styled'

const Row = styled('div')`
  width: 100%;
  display: grid;
  grid-template-columns: 25% 15% 45% 15%;
  text-align: center;
  hr{
    margin: 0;
    width: 100%;
  } 
`

interface RepoProps {
  repo: {}
}

const Repo: React.FC = ({ repo }: RepoProps) => {
  return (
    <Row >
    <span style={{ textAlign: 'left' }}>
      {repo.name}
    </span>
    <span>
      <a href={repo.url}>link</a>
    </span>
    <span>
      {repo.description}
    </span>
    <span>
      <a href={repo.url}>readme</a>
    </span>
  </Row>
  )
}

export default Repo
