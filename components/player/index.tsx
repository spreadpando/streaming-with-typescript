import React, { useState, useEffect, useContext, useRef } from 'react'
import TrackContext from '../../contexts/track'
import TrackInfo from './trackInfo'
import styled from '@emotion/styled'
import Timeline from './timeline'
import Controls from './controls'
import Tracklist from './tracklist'
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'

const Container = styled('div')<{isOpen: boolean, playlistLength: number}>`
  position: absolute;
  background-color: #fff;
  box-shadow: 5px -2px 15px 15px #fff;
  z-index: 2;
  bottom: 0;
  left: 0;
  width: 100%;
  max-height: 90%;
  overflow: hidden;
  transition: height 1s;
  border-width: 1px 0 0 0;
  border-style: solid;
  border-color: #000;
  box-shadow: 2px 0px 25px 5px #ccc;
  ${({ isOpen, playlistLength }) => isOpen ? `height: calc(65px + 40px * ${playlistLength});` : 'height: 78px;'}
`

const ToggleOpen = styled('span')`
  position: absolute;
  top: 0;
  left: 48%;
  font-size: 16px;
  padding: 5px;
  z-index: 4;
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

  // update playhead
  useEffect(() => {
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

  // play/pause audio
  useEffect(() => {
    tc.trackState.isPlaying
      ? void audio.play()
      : void audio.pause()
  }, [tc.trackState.isPlaying])

  // update audio.src
  useEffect(() => {
    audio.src = tc.trackState.src
    tc.trackState.isPlaying
      ? void audio.play()
      : void audio.pause()
  }, [tc.trackState.src])

  useEffect(() => {
    // update elapsed
    const updateElapsed = (): void => {
      const currentTime = audio.currentTime
      const percentage = Math.round((currentTime / duration) * 100.0)
      setElapsed(percentage)
    }

    // update duration
    const updateDuration = (): void => {
      const totalTime = audio.duration
      setDuration(totalTime)
    }
    // handle audio ended
    const handleEnd = (): void => {
      if (playhead !== 'last' && playhead !== 'single') {
        skip()
      } else {
        audio.currentTime = 0
        setElapsed(0)
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
    console.log(audio.currentTime)
    if (audio.currentTime > 1) {
      audio.currentTime = 0
      setElapsed(0)
    } else {
      if (tc.trackState.trackIndex > 0) {
        setElapsed(0)
        audio.currentTime = 0
        tc.trackDispatch({
          type: 'SKIP',
          payload: tc.trackState.trackIndex - 1
        })
      }
    }
  }

  const seek = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, isClick: boolean): void => {
    if (
      (scrubActive || isClick) &&
      (scrubArea !== null || scrubArea !== undefined)
    ) {
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
