/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { createContext } from 'react'

export interface ITrack {
  title: string
  artist: string
  album: string
  apiKey: string
}

export interface ITrackActions {
  type: 'PLAY' | 'SKIP' | 'QUEUE' | 'REMOVE' | 'REPLACE'
  payload: boolean | number | [ITrack, number] | ITrack[]
}

export interface ITrackState {
  tracklist: ITrack[]
  trackIndex: number
  isPlaying: boolean
  src: string
}

export const trackReducer = (
  state: ITrackState,
  action: ITrackActions
): ITrackState => {
  const payload = action.payload
  const trackIndex = state.trackIndex
  const tracklist = [...state.tracklist]
  switch (action.type) {
    case 'PLAY':
      if (typeof (payload) === 'boolean') {
        return { ...state, isPlaying: payload }
      }
      return state

    case 'SKIP':
      if (payload < tracklist.length && payload >= 0) {
        return {
          ...state,
          trackIndex: payload,
          src: `/api/tracks/${tracklist[payload].apiKey}`
        }
      }
      return state

    case 'QUEUE':
      // payload[0] = track; payload[1] = index
      if (payload[1] === trackIndex) {
        tracklist.splice(payload[1], 0, payload[0])
        return {
          ...state,
          tracklist: tracklist,
          src: `/api/tracks/${payload[0].apiKey}`
        }
      } else if (payload[1] <= tracklist.length && payload[1] >= 0) {
        tracklist.splice(payload[1], 0, payload[0])
        return {
          ...state,
          tracklist: tracklist
        }
      }
      return state

    case 'REMOVE':
      if (payload < tracklist.length && payload >= 0) {
        tracklist.splice(payload, 1)
        return {
          ...state,
          tracklist: tracklist
        }
      }
      return state

    case 'REPLACE':
      return { ...state, tracklist: payload }
    default:
      return state
  }
}

export interface ITrackContextProps {
  trackState: ITrackState
  trackDispatch: React.Dispatch<ITrackActions>
}

export const initialTrackState: ITrackState = {
  tracklist: [{ title: 'Untitled', artist: 'aphyyd', collection: 'hello', apiKey: 'tracks/aphyyd/hello/Untitled.wav' }, { title: 'Untitled', artist: 'aphyyd', collection: 'hello', apiKey: 'tracks/aphyyd/hello/Untitled.wav' }, { title: 'Untitled', artist: 'aphyyd', collection: 'hello', apiKey: 'tracks/aphyyd/hello/Untitled.wav' }],
  trackIndex: 0,
  isPlaying: false,
  src: '/api/tracks/tracks/aphyyd/hello/Untitled.wav'
}

const TrackContext = createContext<ITrackContextProps>({
  trackState: initialTrackState,
  trackDispatch: () => {}
})

export const TrackContextConsumer = TrackContext.Consumer
export const TrackCotextProvider = TrackContext.Provider
export default TrackContext
