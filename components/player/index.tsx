import React, { useState, useEffect, useContext, useRef } from 'react'
import TrackContext from '../../contexts/track'
import TrackInfo from './trackInfo'
import styled from '@emotion/styled'
import Timeline from './timeline'
import Controls from './controls'
import Tracklist from './tracklist'
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'
import { IoFingerPrint } from 'react-icons/io5'

const Container = styled('div')<{isOpen: boolean, playlistLength: number}>`
  position: absolute;
  background-color: #fff;
  z-index: 2;
  bottom: 0;
  left: 0;
  width: 100%;
  max-height: 90%;
  overflow: hidden;
  transition: height 1s;
  border-width: 2px 0 0 0;
  border-style: solid;
  border-color: #000;
  ${({ isOpen, playlistLength }) => isOpen ? `height: calc(65px + 40px * ${playlistLength});` : 'height: 78px;'}
`

const ToggleOpen = styled('span')`
  position: absolute;
  top: 0;
  left: 48%;
  font-size: 16px;
  padding: 5px;

`

const Player: React.FC = () => {
  const scrubArea = useRef<HTMLInputElement>(null)
  const tc = useContext(TrackContext)
  const [isOpen, setIsOpen] = useState(false)
  const [duration, setDuration] = useState(1)
  const [elapsed, setElapsed] = useState(0)
  const [playhead, setPlayhead] = useState('first')
  const [scrubActive, setScrubActive] = useState(false)
  const [audio] = useState(new Audio(tc.trackState.src))

  useEffect(() => {
    console.log(tc.trackState.tracklist.length)
    if (tc.trackState.tracklist.length > 1) {
      if (tc.trackState.trackIndex >= tc.trackState.tracklist.length - 1) {
        setPlayhead('last')
      } else if (tc.trackState.trackIndex === 0) {
        setPlayhead('first')
      } else {
        setPlayhead('middle')
      }
    } else {
      setPlayhead('single')
    }
  }, [tc.trackState.trackIndex, tc.trackState.tracklist.length])

  useEffect(() => {
    tc.trackState.isPlaying
      ? void audio.play()
      : void audio.pause()
  }, [tc.trackState.isPlaying])

  useEffect(() => {
    audio.src = tc.trackState.src
    tc.trackState.isPlaying
      ? void audio.play()
      : void audio.pause()
  }, [tc.trackState.src])
  useEffect(() => {
    const updateElapsed = (): void => {
      const currentTime = audio.currentTime
      const percentage = Math.round((currentTime / duration) * 100.0)
      setElapsed(percentage)
    }

    const updateDuration = (): void => {
      const totalTime = audio.duration
      setDuration(totalTime)
    }

    const handleEnd = (): void => {
      if (playhead !== 'last' && playhead !== 'single') {
        skip()
      } else {
        stop()
      }
    }

    audio.addEventListener('timeupdate', updateElapsed)
    audio.addEventListener('durationchange', updateDuration)
    audio.addEventListener('ended', handleEnd)

    return () => {
      audio.removeEventListener('timeupdate', updateElapsed)
      audio.removeEventListener('durationchange', updateDuration)
      audio.removeEventListener('ended', handleEnd)
    }
  })

  const togglePlay = (): void => tc.trackDispatch(
    { type: 'PLAY', payload: !tc.trackState.isPlaying }
  )

  const stop = (): void => {
    tc.trackDispatch({ type: 'PLAY', payload: false })
    audio.currentTime = 0
    setElapsed(0)
  }

  const skip = (): void => {
    if (playhead !== 'last') {
      setElapsed(0)
      audio.currentTime = 0
      tc.trackDispatch({
        type: 'SKIP',
        payload: tc.trackState.trackIndex + 1
      })
    }
  }

  const back = (): void => {
    if (tc.trackState.trackIndex > 0) {
      setElapsed(0)
      audio.currentTime = 0
      tc.trackDispatch({
        type: 'SKIP',
        payload: tc.trackState.trackIndex - 1
      })
    }
  }

  const seek = (e, isClick: boolean): void => {
    if (scrubActive || isClick) {
      const position = e.clientX / scrubArea.current.getBoundingClientRect().width
      const percentage = 100 * position
      setElapsed(percentage)
      audio.currentTime = duration * position
    }
  }

  return (
    <Container ref={scrubArea}
      onMouseUp={() => scrubActive
        ? setScrubActive(false)
        : null}
      onMouseMove={(e) => seek(e, false)}
      onMouseLeave={() => setScrubActive(false)}
      isOpen={isOpen}
      playlistLength={tc.trackState.tracklist.length}>
      <ToggleOpen onClick={() => setIsOpen(!isOpen)} >
        {isOpen ? <IoIosArrowDown/> : <IoIosArrowUp/>}
      </ToggleOpen>
      <TrackInfo
        name={tc.trackState.tracklist[tc.trackState.trackIndex]?.title}
        artist={tc.trackState.tracklist[tc.trackState.trackIndex]?.artist}
        collection={tc.trackState.tracklist[tc.trackState.trackIndex]?.collection}/>
      <Controls back={back}
        skip={skip}
        togglePlay={togglePlay}
        stop={stop}
        isPlaying={tc.trackState.isPlaying}
        playhead={playhead}/>
      <Timeline setScrubActive={setScrubActive}
        seek={seek}
        elapsed={elapsed}/>
      <Tracklist tracklist={tc.trackState.tracklist}/>
    </Container>
  )
}
export default Player
