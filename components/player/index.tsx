import React, { useState, useEffect, useContext, useRef } from 'react'
import TrackContext from '../../contexts/track'
import TrackInfo from './trackInfo'
import styled from '@emotion/styled'
import Timeline from './timeline'
import Controls from './controls'
import Playlist from './playlist'
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'

const Container = styled('div')<{isOpen: boolean, playlistLength: number}>`
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: row;
  background-color: #fff;
  z-index: 2;
  justify-content: space-between;
  @media(min-width: 600px){
    justify-content: flex-start;
  }
  bottom: 0;
  left: 0;
  width: 100%;
  max-height: 90%;
  overflow: hidden;
  transition: height 1s;
  border-width: 2px 0 0 0;
  border-style: solid;
  border-color: #000;
  ${({ isOpen, playlistLength }) => isOpen ? `height: calc(65px + 30px * ${playlistLength.toString()});` : 'height: 68px;'}
`

const ToggleOpen = styled('span')`
  position: absolute;
  top:0;
  left: 48%;
  font-size: 16px;
  padding: 15px 0 0 0;

`

const Player: React.FC = () => {
  const scrubArea = useRef<HTMLInputElement>(null)
  const trackContext = useContext(TrackContext)
  const [isOpen, setIsOpen] = useState(false)
  const [duration, setDuration] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [playhead, setPlayhead] = useState('first')
  const [scrubActive, setScrubActive] = useState(false)
  const [audio] = useState(
    new Audio(`/api/tracks/${trackContext.trackState.tracklist[trackContext.trackState.trackIndex]?.apiKey}`)
  )

  // check if track is first or last
  useEffect(() => {
    if (trackContext.trackState.trackIndex >= trackContext.trackState.tracklist.length - 1) {
      setPlayhead('last')
    } else if (trackContext.trackState.trackIndex === 0) {
      setPlayhead('first')
    } else { setPlayhead('middle') }
  }, [trackContext.trackState.trackIndex])

  // play / pause audio
  useEffect(() => {
    trackContext.trackState.isPlaying
      ? void audio.play()
      : void audio.pause()
  }, [trackContext.trackState.isPlaying])

  // update audio src
  useEffect(() => {
    setElapsed(0)
    audio.src = `/api/tracks/${trackContext.trackState.tracklist[trackContext.trackState.trackIndex]?.apiKey}`
  }, [trackContext.trackState.tracklist, trackContext.trackState.trackIndex])

  // add listeners to update timeline css
  useEffect(() => {
    audio.addEventListener('timeupdate', updateElapsed)
    audio.addEventListener('durationchange', updateDuration)
    return () => {
      audio.removeEventListener('timeupdate', updateElapsed)
      audio.removeEventListener('durationchange', updateDuration)
    }
  }, [])

  const togglePlay = (): void => trackContext.trackDispatch(
    { type: 'PLAY', payload: !trackContext.trackState.isPlaying }
  )

  const stop = (): void => {
    trackContext.trackDispatch({ type: 'PLAY', payload: false })
    setElapsed(0)
    audio.currentTime = 0
  }

  const skip = (): void => {
    if (trackContext.trackState.trackIndex < trackContext.trackState.tracklist.length - 1) {
      setElapsed(0)
      audio.currentTime = 0
      trackContext.trackDispatch({ type: 'SKIP', payload: null })
    }
  }

  const back = (): void => {
    if (trackContext.trackState.trackIndex > 0) {
      setElapsed(0)
      audio.currentTime = 0
      trackContext.trackDispatch({ type: 'BACK', payload: null })
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

  const updateElapsed = (): void => {
    const currentTime = audio.currentTime
    const percentage = (currentTime / duration) * 100
    if (percentage >= 100) {
      if (trackContext.trackState.trackIndex >= trackContext.trackState.tracklist.length - 1) {
        trackContext.trackDispatch({ type: 'PLAY', payload: false })
      }
      setTimeout(skip, 1000)
    }
    setElapsed(percentage)
  }

  const updateDuration = (): void => {
    const totalTime = audio.duration
    setDuration(totalTime)
  }

  return (
    <Container ref={scrubArea}
      onMouseUp={() => scrubActive
        ? setScrubActive(false)
        : null}
      onMouseMove={(e) => seek(e, false)}
      onMouseLeave={() => setScrubActive(false)}
      isOpen={isOpen}
      playlistLength={trackContext.trackState.tracklist.length}>
      <ToggleOpen onClick={() => setIsOpen(!isOpen)} >
        {isOpen ? <IoIosArrowDown/> : <IoIosArrowUp/>}
      </ToggleOpen>
      <TrackInfo
        name={trackContext.trackState.tracklist[trackContext.trackState.trackIndex]?.title}
        artist={trackContext.trackState.tracklist[trackContext.trackState.trackIndex]?.artist}
        collection={trackContext.trackState.tracklist[trackContext.trackState.trackIndex]?.collection}/>
      <Controls back={back}
        skip={skip}
        togglePlay={togglePlay}
        stop={stop}
        isPlaying={trackContext.trackState.isPlaying}
        playhead={playhead}/>
      <Timeline setScrubActive={setScrubActive}
        seek={seek}
        elapsed={elapsed}/>
       <Playlist tracklist={trackContext.trackState.tracklist}/>

    </Container>
  )
}
export default Player
