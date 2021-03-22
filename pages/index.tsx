import React from 'react'
import { GetServerSideProps } from 'next'
import s3ListObjects from '../util/s3listObjects'
import S3 from '../util/s3Connect'
import Playlist from '../components/playlist'
import Nav from '../components/nav/'
import { ITrack } from '../contexts/track'

const Catalog: React.FC = ({ tracklist }: ITrack[]) => {
  return (
    <>
      <Nav/>
      <Playlist tracklist={tracklist} />
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
