import React from 'react'
import styled from '@emotion/styled'
import { IoPlayCircleOutline, IoPauseCircleOutline, IoStopCircleOutline, IoPlaySkipForwardCircleOutline, IoPlaySkipBackCircleOutline } from 'react-icons/io5'

const Panel = styled('div')`
  position: relative;
  display: inline-block;
  padding: 0 1rem;
  z-index: 3;
  font-size: 22px;
`
const SkipButton = styled('span') <{ last: boolean }>`
  ${({ last }) => last ? 'color:#ccc;' : 'color: #000;'}
`

const BackButton = styled('span') <{ first: boolean }>`
${({ first }) => first ? 'color:#ccc;' : 'color: #000;'}
`

const Control = styled('span')`
  color: #000;
`

interface IControlsProps {
  back: () => void
  skip: () => void
  togglePlay: () => void
  stop: () => void
  isPlaying: boolean
  playhead: string
}

const Controls: React.FC<IControlsProps> = ({ back, skip, togglePlay, stop, isPlaying, playhead }) => {
  return (
    <Panel>
        <BackButton
          id='app-rw-btn'
          onClick={back}
          first={playhead === 'first'}>
          <IoPlaySkipBackCircleOutline />
        </BackButton>
        <Control
          id='app-play-btn'
          onClick={togglePlay}>
          { isPlaying
            ? <IoPauseCircleOutline />
            : <IoPlayCircleOutline />}
        </Control>
        <Control
          id='app-stop-btn'
          onClick={stop}>
          <IoStopCircleOutline />
        </Control>
        <SkipButton
          id='app-ff-btn'
          onClick={skip}
          last={playhead === 'last'}
        >
          <IoPlaySkipForwardCircleOutline />
        </SkipButton>
      </Panel>

  )
}

export default Controls
