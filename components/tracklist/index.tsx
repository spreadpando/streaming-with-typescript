import React from 'react'
import styled from '@emotion/styled'
import { ITrack } from '../contexts/track'
import Track from './track'

const TracklistFrame = styled('div')`
  position: absolute;
  bottom: 20vh;
  padding: 16px;
  z-index: 1;
  height: fit-content;
  max-height: 75vh;
  width: fill-available;
  overflow-y: scroll;
  border-radius: 2px;
  background-color: #fff;
  ::-webkit-scrollbar {
    display: none;
  }
  hr{
    margin: 0;
  }                  
`
interface ITracklistProps {
  tracklist: ITrack[]
}

const Tracklist: React.FC<ITracklistProps> = ({ tracklist }) => {
  return (
    <TracklistFrame>
      {tracklist.map((track, i: number) => {
        return (
          <div key={`track-${i}`}>
            <Track track={track} />
            <hr />
          </div>
        )
      })}
    </TracklistFrame>
  )
}

export default Tracklist
