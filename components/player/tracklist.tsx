import React, { useEffect, useRef, useState, useContext } from 'react'
import styled from '@emotion/styled'
import PlayItem from './playItem'
import TrackContext from '../../contexts/track'

const Content = styled('ul')`
  position: absolute;
  right: 0;
  top: 64px;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  ::-webkit-scrollbar{ display: none }
  scrollbar-width: none; 
  z-index: 4;
  li {
    display: flex;
    border-width: 0 0 1px 0;
    padding: 3px 0;
    border-color: #000;
    border-style: solid;
  }
`

const Indicator = styled('div')<{active: boolean}>`
  position: absolute;
  border-radius: 5px;
  width: 10px;
  height: 10px;
  margin: 0 16px;
  background-color: orange;
  align-self: center;
  ${({ active }) => active ? 'display: block' : 'display: none;'}
`

const DragToReorderList: React.FC = ({ tracklist }: Track[]) => {
  const draggingItem = useRef()
  const dragOverItem = useRef()
  const tc = useContext(TrackContext)
  const [list, setList] = useState(tracklist)

  useEffect(() => {
    setList(tracklist)
  }, [tracklist])

  const handleDragStart = (e, position): void => {
    draggingItem.current = position
  }

  const handleDragEnter = (e, position): void => {
    dragOverItem.current = position
    const listCopy = [...list]
    const draggingItemContent = listCopy[draggingItem.current]
    listCopy.splice(draggingItem.current, 1)
    listCopy.splice(dragOverItem.current, 0, draggingItemContent)
    draggingItem.current = dragOverItem.current
    dragOverItem.current = null
    setList(listCopy)
    tc.trackDispatch({ type: 'REPLACE', payload: listCopy })
  }

  return (
    <Content>
      <ol>
      {list.map((track, index) => {
        return (

            <li
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => handleDragEnter(e, index)}
              key={index}
              draggable
              >
              <Indicator active={tc.trackState.trackIndex === index} />
              <PlayItem track={track}
              index={index} />
            </li>
        )
      })}
      </ol>
    </Content>
  )
}

export default DragToReorderList
