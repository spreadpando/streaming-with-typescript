import React from 'react'
import styled from '@emotion/styled'

const Frame = styled('div')`
  position: absolute;
  left: 100px;
  display: inline-block;
  color: #000;
  padding: 24px;
  border-radius: 0 5px 0 0;
  z-index: 3;
  p {
    margin: 0;
    span {
      padding: 0 8px;
    }
  }
`
interface ITrackInfoProps {
  name?: string
  artist?: string
  collection?: string
}

const TrackInfo: React.FC = ({ name, artist, collection }: ITrackInfoProps) => {
  return (
    <Frame>
      <p>track: <span> {name}</span></p>
      {artist?.length > 0 ? <p>artist: <span> {artist}</span></p> : null}
      {collection?.length > 0 ? <p>collection: <span> {collection}</span></p> : null}
    </Frame>
  )
}

export default TrackInfo
