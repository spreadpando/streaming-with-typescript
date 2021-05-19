import React, { useContext } from 'react'
import styled from '@emotion/styled'
import TrackContext, { ITrack } from '../../contexts/track'
import { IoPlayCircleOutline, IoListCircleOutline } from 'react-icons/io5'

const ListItem = styled('div')`
position: relative;
display: grid;
grid-template-columns: 27% 27% 27% 10% 10% max-content;
padding: 0px 4%;
color: #000;
span {
  align-self: center;
}
`

const Btn = styled('span')`
  font-size: 24px;
  text-align: center;
  padding-bottom: 4px;
  svg {
    vertical-align: middle;
  }

`

interface ITrackProps {
  track: ITrack
}

const Track: React.FC<ITrackProps> = ({ track }: ITrackProps) => {
  const tc = useContext(TrackContext)

  const handleSelect = (track): void => {
    tc.trackDispatch({ type: 'QUEUE', payload: [track, tc.trackState.trackIndex] })
    tc.trackDispatch({ type: 'PLAY', payload: true })
  }

  const queue = (track): void => {
    tc.trackDispatch({ type: 'QUEUE', payload: [track, tc.trackState.tracklist.length] })
  }

  return (
    <ListItem>
      <span>{track.title}</span>
      <span>{track.collection}</span>
      <span>{track.artist}</span>
      <Btn onClick={() => handleSelect(track)} title='play'>
        <IoPlayCircleOutline/>
      </Btn>
      <Btn onClick={() => queue(track)} title='queue'>
        <IoListCircleOutline/>
      </Btn>
    </ListItem>
  )
}

export default Track
