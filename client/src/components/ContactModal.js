import React, { useRef } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'


export default function ContactModal({closeModal}) {
  
    const idRef=useRef()
    const nameRef=useRef()
    const {createContact}=useContacts()

  function handleSubmit(e) {
      e.preventDefault()

      createContact(idRef.current.value,nameRef.current.value)

      closeModal()
  }


  return (
    <>
        <Modal.Header closeButton>create new contact</Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Id</Form.Label>
                    <Form.Control type='text' ref={idRef} required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>name</Form.Label>
                    <Form.Control type='text' ref={nameRef} required/>
                </Form.Group>
                <Button type='submit' className='mt-2'>create</Button>
            </Form>
        </Modal.Body>
    </>
  )
}
