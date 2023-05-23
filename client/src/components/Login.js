import React, { useRef } from 'react'
import {Button, Container, Form} from 'react-bootstrap'
import {v4 as uuidv4} from 'uuid'


export default function Login({setId}) {

  const id = useRef()

  function createId() {
      setId(uuidv4()) 
  }

  function handleSubmit(e) {
    e.preventDefault()

    setId(id.current.value)
  }

  return (
    <Container className='d-flex align-items-center' style={{height:'100vh'}}>
       <Form onSubmit={handleSubmit} style={{width:'100vw'}}>
            <Form.Group className='m-2'>
                <Form.Label>enter the id</Form.Label>
                <Form.Control ref={id} type='text' required/>
            </Form.Group>
            <Button type='submit' className='m-2'>join</Button>
            <Button onClick={createId}>create new id</Button>    
       </Form>
       
    </Container>

  )
}
