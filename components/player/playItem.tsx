import React, { useContext } from 'react'
import styled from '@emotion/styled'
import TrackContext, { ITrack } from '../../contexts/track'
import { IoPlayCircleOutline } from 'react-icons/io5'
import { GrDrag } from 'react-icons/gr'
import { CgPlayListRemove } from 'react-icons/cg'

const ListItem = styled('div')`
position: relative;
width: 100%;
display: grid;
pointer-events: none;
grid-template-columns: 5% 40% 40% 7.5% 7.5% max-content;
padding: 0 24px;
color: #000;
span{
  align-self: center;
}
`

const Btn = styled('span')`
  font-size: 16px;
  pointer-events: all;
  text-align: center;
  padding-bottom: 4px;
  svg {
    vertical-align: middle;
  }
`

interface PlayItemProps {
  track: ITrack
  index: number

}

const PlayItem: React.FC = ({ track, index }: PlayItemProps) => {
  const tc = useContext(TrackContext)

  const handleSelect = (): void => {
    tc.trackDispatch({ type: 'SKIP', payload: index })
    tc.trackDispatch({ type: 'PLAY', payload: true })
  }

  const remove = (): void => {
    tc.trackDispatch({ type: 'REMOVE', payload: index })
  }

  return (
    <ListItem >
      <Btn>
        <GrDrag />
      </Btn>
      <span>{track.title}</span>
      <span>{track.artist}</span>
      <Btn onClick={() => handleSelect()} title='play'>
        <IoPlayCircleOutline/>
      </Btn>
      <Btn onClick={() => remove()} title='remove'>
        <CgPlayListRemove />
      </Btn>

    </ListItem>
  )
}

export default PlayItem
