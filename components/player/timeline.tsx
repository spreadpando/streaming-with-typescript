import React from 'react'
import styled from '@emotion/styled'

const Bar = styled('div')`
  position: relative;
  width: 100%;
  height: 5px;
  z-index: 3;
`

const Elapsed = styled('div') <{ elapsed: number }>`
  width: ${props => props.elapsed}%;
  max-width: 100%;
  height: 100%;
  background-color: #000;
  transition: width 250ms;
  transition-timing-function: linear;
  pointer-events: none;
`

interface ITimelineProps {
  setScrubActive: React.Dispatch<React.SetStateAction<boolean>>
  seek: (e: any, isClick: boolean) => void
  elapsed: number
}

const Timeline: React.FC<ITimelineProps> = ({ setScrubActive, seek, elapsed }: ITimelineProps) => {
  return (
  <Bar onMouseDown={() => setScrubActive(true)}
    onClick={(e) => seek(e, true)}>
    <Elapsed elapsed={elapsed} />
  </Bar>
  )
}

export default Timeline
