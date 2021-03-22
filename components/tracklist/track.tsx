import React, { useContext } from 'react'
import styled from '@emotion/styled'
import TrackContext, { ITrack } from '../../contexts/track'
import { IoPlayCircleOutline, IoListCircleOutline } from 'react-icons/io5'

const ListItem = styled('li')`
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

const Track: React.FC<Itrack> = ({ track }) => {
  const trackContext = useContext(TrackContext)

  const handleSelect = (track): void => {
    trackContext.trackDispatch({ type: 'PLAY', payload: track })
  }

  const queue = (track): void => {
    trackContext.trackDispatch({ type: 'QUEUE', payload: track })
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
