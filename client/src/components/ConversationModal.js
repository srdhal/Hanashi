import React, { useState } from 'react'
import { Modal,Form, Button } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'
import {useConversations} from '../contexts/ConversationsProvider'

export default function ConversationModal({closeModal}) {
  
   const {contacts}=useContacts()
   const [selectedContactIds,setSelectedContactIds]=useState([])
   const {createConversation} =useConversations() 


   function handleCheckboxChange(id) {
       setSelectedContactIds(prevContacts=>{
         if(prevContacts.includes(id)){
            return prevContacts.filter(contactId=>{
                return contactId===id
            })
         }
         else{
            return [...prevContacts,id]
         }
       })
   }

   function handleSubmit(e) {
       e.preventDefault()

       createConversation(selectedContactIds)
       closeModal()
   }

   return (
     <div>
        <Modal.Header closeButton>create new conversation</Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                {contacts.map(contact=>(
                  <Form.Group controlId={contact.id} key={contact.id}>
                     <Form.Check
                        type='checkbox'
                        value={selectedContactIds.includes(contact.id)}
                        label={contact.name}
                        onChange={()=>handleCheckboxChange(contact.id)} 
                     />
                  </Form.Group>
                ))}
                <Button type='submit' className='mt-2'>create</Button>
            </Form>
        </Modal.Body>
     </div>
  )
}
