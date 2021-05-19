import React from 'react'
import { GetServerSideProps } from 'next'
import Nav from '../components/nav/'
import ghListRepos from '../util/ghListRepos'
import Repolist from '../components/repolist'

const Code: React.FC = ({ repos }: []) => {
  return (
    <>
      <Nav/>
      <Repolist repos={repos}/>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const list = await ghListRepos('users/spreadpando/repos')
  return {
    props: {
      repos: list
    }
  }
}

export default Code
