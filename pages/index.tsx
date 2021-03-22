import React from 'react'
import { GetServerSideProps } from 'next'
import s3ListObjects from '../util/s3listObjects'
import S3 from '../util/s3Connect'
import Tracklist from '../components/tracklist/'
import Nav from '../components/nav/'

const Catalog: React.FC = (props) => {
  return (
    <>
      <Nav/>
      <Tracklist tracklist={props.tracklist} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const list = await s3ListObjects(S3, 'tracks/aphyyd/hello/')
  return {
    props: {
      tracklist: list
    }
  }
}

export default Catalog
