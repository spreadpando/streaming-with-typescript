import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import styled from '@emotion/styled'

const FlexContainer = styled('div')`
  position: absolute;
  display: flex;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`

const Container = styled('div')`
  position: absolute;
  width: 14rem;
  text-align: right;
  z-index: 2;
  font-family: helvetica;
  div {
    position: relative;
    width: 100%;
  }
  input {
    background-color: transparent;
    width: 100%;
    margin: 1em 0;
    border-width: 0 0 2px 0;
    border-color: #000;
    &:focus{
      outline: none;
    };
  }
  input[type='submit']{
    width: 33%;
    align-self: center;
    margin: 2em;
    border-width:  2px ;

  }
  textarea {
    display: block;
    width: 100%;
    border-width: 2px;
    border-color: #000;
    border-radius: 3px;
    background-color: transparent;
    resize: none;
    &:focus{
      outline: none;
    }
  }
  form {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    width: 100%;
  }
`

const Contact = () => {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit } = useForm()
  const onSubmit = async (data) => {
    console.log('submitted')
    const res = await fetch('/api/contact', { // eslint-disable-line
      method: 'POST',
      body: JSON.stringify(data)
    })
    const text = await res.text()
    if (text === 'success') {
      setSubmitted(true)
    }
  }

  return (
    <FlexContainer>
      <Container>
          {submitted
            ? (
              <h2 key='head' initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 1, delay: 0.3 } }}>sent.</h2>
              )
            : (
              <form
                key='form'
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <label>
              name
                  </label>
                  <input type='text' id='name' name='name' ref={register({ required: true })} />
                </div>
                <div>
                  <label>
              email
                  </label>
                  <input type='email' id='email' name='email' ref={register({ required: true })} />
                </div>
                <div>
                  <label>
              message
                  </label>
                  <textarea rows='4' id='comment' name='comment' ref={register()} />
                </div>
                <input type='submit' value='send' />
              </form>
              )}
      </Container>
    </FlexContainer>
  )
}

export default Contact