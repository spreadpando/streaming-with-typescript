import { createContext } from 'react'

export interface ITrack {
  title: string
  artist: string
  album: string
  apiKey: string
}

export interface ITrackActions {
  type: 'PLAY' | 'SKIP' | 'BACK' | 'INSERT' | 'QUEUE' | 'REMOVE' | 'REPLACE'
  payload?: ITrack | ITrack[] | boolean
}

export interface ITrackState {
  tracklist: ITrack[]
  trackIndex: number
  isPlaying: boolean
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
      console.log(typeof (payload))
      if (typeof (payload) === 'boolean') {
        return { ...state, isPlaying: payload }
      } else {
        tracklist.splice(trackIndex, 0, payload)
        return { ...state, tracklist: tracklist, isPlaying: true }
      }
    case 'SKIP':
      if (trackIndex <= tracklist.length) {
        return { ...state, trackIndex: trackIndex + 1 }
      } else {
        return state
      }
    case 'BACK':
      if (trackIndex > 0) {
        return { ...state, trackIndex: trackIndex - 1 }
      } else {
        return state
      }
    case 'INSERT':
      tracklist.splice(trackIndex, 0, payload)
      return { ...state, tracklist: tracklist }
    case 'QUEUE':
      if (!tracklist.includes(payload)) {
        tracklist.push(payload)
        return { ...state, tracklist: tracklist }
      }
      return state
    case 'REMOVE':
      if (tracklist.includes(payload)) {
        const index = tracklist.indexOf(payload)
        if (index > -1) {
          tracklist.splice(index, 1)
        }
        return { ...state, tracklist: tracklist }
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
  tracklist: [{ title: 'Untitled', artist: 'aphyyd', collection: 'hello', apiKey: 'tracks/aphyyd/hello/Untitled.wav' }, { title: 'Untitled', artist: 'aphyyd', collection: 'hello', apiKey: 'tracks/aphyyd/hello/raven.mp3' }, { title: 'Untitled', artist: 'aphyyd', collection: 'hello', apiKey: 'tracks/aphyyd/hello/cat0007.WAV' }],
  trackIndex: 0,
  isPlaying: false
}

const TrackContext = createContext<ITrackContextProps>({
  trackState: initialTrackState,
  trackDispatch: () => {}
})

export const TrackContextConsumer = TrackContext.Consumer
export const TrackCotextProvider = TrackContext.Provider
export default TrackContext
