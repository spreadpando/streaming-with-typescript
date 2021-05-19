import React, { useReducer } from 'react'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { TrackCotextProvider, trackReducer, initialTrackState } from '../contexts/track'
import { globalStyles } from '../styles/'
const Player = dynamic(
  async () => await import('../components/player'),
  {
    ssr: false
  }
)

const App: React.FC = ({ Component, pageProps }: AppProps) => {
  const [trackState, trackDispatch] = useReducer(trackReducer, initialTrackState)

  const trackContextValues = {
    trackState,
    trackDispatch
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <TrackCotextProvider value={trackContextValues}>
      <Component {...pageProps} />
      <Player />
      </TrackCotextProvider>
      {globalStyles}
    </>
  )
}

export default App
