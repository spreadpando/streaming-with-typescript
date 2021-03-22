
import React from 'react'
import { css, Global } from '@emotion/react'

export const globalStyles = (
  <Global
    styles={css`
    * {
      -ms-user-select:none;
      -moz-user-select:none;
      -webkit-user-select:none;
      -webkit-touch-callout: none;
      -khtml-user-select: none;
       user-select:none;
       box-sizing: border-box;
    }
      html,
      body {
        padding: 0;
        margin: 0;
        background: #fff;
        min-height: 100vh;
        min-width: 100vw;
        height: 100vh;
        width: 100vw;
        font-family: Courier New, monospace;
        font-size: 12px;
      }
      ul {
        list-style: none;
        padding: 0;
      }
      h1 {
        font-size: 2em;
      }
    `}
  />
)
