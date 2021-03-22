import React from 'react'
import styled from '@emotion/styled'

const Frame = styled('div')`
  position: relative;
  display: inline-block;
  color: #000;
  padding: 6px 0 6px 24px;
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

const TrackInfo: React.FC<ITrackInfoProps> = ({ name, artist, collection }) => {
  return (
    <Frame>
      <p>track: <span> {name}</span></p>
      {artist?.length > 0 ? <p>artist: <span> {artist}</span></p> : null}
      {collection?.length > 0 ? <p>collection: <span> {collection}</span></p> : null}
    </Frame>
  )
}

export default TrackInfo
