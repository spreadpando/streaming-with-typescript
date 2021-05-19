import React from 'react'
import styled from '@emotion/styled'
import { IoPlayCircleOutline, IoPauseCircleOutline, IoPlaySkipForwardCircleOutline, IoPlaySkipBackCircleOutline } from 'react-icons/io5'

const Panel = styled('div')`
  position: absolute;
  display: inline-block;
  padding: 36px 18px;
  z-index: 3;
  font-size: 22px;
`
const SkipButton = styled('span') <{ enabled: boolean }>`
  ${({ enabled }) => enabled ? 'color:#000;' : 'color: #ccc;'}
`

const BackButton = styled('span') <{ enabled: boolean }>`
${({ enabled }) => enabled ? 'color:#000;' : 'color: #ccc;'}
`

const Control = styled('span')`
  color: #000;
`

interface IControlsProps {
  back: () => void
  skip: () => void
  togglePlay: () => void
  isPlaying: boolean
  playhead: string
}

const Controls: React.FC<IControlsProps> = ({ back, skip, togglePlay, isPlaying, playhead }) => {
  return (
    <Panel>
        <BackButton
          id='app-rw-btn'
          onClick={back}
          enabled={playhead !== 'first' && playhead !== 'single'}>
          <IoPlaySkipBackCircleOutline />
        </BackButton>
        <Control
          id='app-play-btn'
          onClick={togglePlay}>
          { isPlaying
            ? <IoPauseCircleOutline />
            : <IoPlayCircleOutline />}
        </Control>
        <SkipButton
          id='app-ff-btn'
          onClick={skip}
          enabled={playhead !== 'last' && playhead !== 'single'}
        >
          <IoPlaySkipForwardCircleOutline />
        </SkipButton>
      </Panel>

  )
}

export default Controls
