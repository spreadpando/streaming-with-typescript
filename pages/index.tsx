import React from 'react'
import Nav from '../components/nav/'
import styled from '@emotion/styled'

const Blurb = styled('div')`
  position: absolute;
  z-index: 0;
  width: calc(100% - 4rem);
  height: 90%;
  display: flex;
  justify-content: center;
  align-content: center;
  line-height: 1.5;
  flex-wrap: wrap;
  margin: 0 2rem;
  p {
    width: 100%;
    display: inline-flex;
    justify-content: center;
    margin-bottom: 0;
  }
`
// deploy
const Catalog: React.FC = () => {
  return (
    <>
      <Nav/>
      <Blurb>
        <p>
          This webapp is built with Next.js and Typescript.<br/>
          There is a custom-built api made up of serverless functions <br/>
          which query third-party apis including Github and AWS S3 <br/>
          to display a portfolio of my software development and audio / visual work.<br/>
          All intermedia is streamed in byte-sized chunks from Digital Ocean Spaces <br/>
          to deliver a more secure and seamless streaming experience to the end-user.<br/>
        </p>
        <br/>
        <p>
          Additional node packages include<br/>
        </p>
        <ul>
            <li>
              emotion
            </li>
            <li>
              aws-sdk
            </li>
            <li>
              react-spring
            </li>
            <li>
              react-three-fiber
            </li>
          </ul>
      </Blurb>
    </>
  )
}

export default Catalog
