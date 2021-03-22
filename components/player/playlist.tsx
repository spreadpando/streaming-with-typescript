import React, { useRef } from 'react'
import { ITrack } from '../contexts/track'
import Track from './trackAbrv'
import clamp from 'lodash-es/clamp'
import swap from 'lodash-move'
import { useDrag } from 'react-use-gesture'
import { useSprings, animated } from 'react-spring'
import styled from '@emotion/styled'

const TracklistFrame = styled('div')`
  position: relative;
  padding: 16px;
  z-index: 2;
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

const fn = (order, active, originalIndex, curIndex, y) => (index) =>
  active && index === originalIndex
    ? { y: curIndex * 100 + y, scale: 1.1, zIndex: '1', shadow: 15, immediate: (n) => n === 'y' || n === 'zIndex' }
    : { y: order.indexOf(index) * 100, scale: 1, zIndex: '0', shadow: 1, immediate: false }

interface IPlaylistProps {
  tracklist: ITrack[]
}

const Playlist: React.FC<IPlaylistProps> = ({ tracklist }) => {
  const order = useRef(tracklist.map((_, index) => index)) // Store indicies as a local ref, this represents the item order
  const [springs, setSprings] = useSprings(tracklist.length, fn(order.current)) // Create springs, each corresponds to an item, controlling its transform, scale, etc.
  const bind = useDrag(({ args: [originalIndex], active, movement: [, y] }) => {
    const curIndex = order.current.indexOf(originalIndex)
    const curRow = clamp(Math.round((curIndex * 100 + y) / 100), 0, tracklist.length - 1)
    const newOrder = swap(order.current, curIndex, curRow)
    setSprings(fn(newOrder, active, originalIndex, curIndex, y)) // Feed springs new style data, they'll animate the view without causing a single render
    if (!active) order.current = newOrder
  })
  return (
    <TracklistFrame>
      {springs.map((track, i: number) => {
        return (
          <animated.div
          {...bind(i)}
          key={i}
          style={{
            zIndex,
            boxShadow: shadow.to((s) => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`),
            y,
            scale
          }}
          children={items[i]}>
            {/* <Track track={track} key={`track-${i}`}/>
            <hr /> */}
          </animated.div>
        )
      })}
    </TracklistFrame>
  )
}

export default Playlist
