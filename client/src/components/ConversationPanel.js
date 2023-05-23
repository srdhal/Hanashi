import React, { useCallback, useState } from 'react'
import {Button, Form, InputGroup} from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider'


export default function ConversationPanel() {

  const [text,setText]=useState('')
  const {selectedConversation,sendMessage}=useConversations()
  const setRef=useCallback((dom)=>{
     if(dom){
        dom.scrollIntoView({smooth: true})
     }
  },[])
  
  function handleSubmit(e) {
     e.preventDefault()

     sendMessage(selectedConversation.recipients.map(r=>r.id),text)

     setText('')
  }

  return (
    <div className='d-flex flex-column flex-grow-1'>
      <div className='flex-grow-1 overflow-auto'>
        <div className='d-flex flex-column align-items-start justify-content-right px-3'>
           {selectedConversation.messages.map((message,index)=>{
             const lastMsgPos=index===selectedConversation.messages.length-1
             return (
               <div key={index} ref={lastMsgPos?setRef:null}className={`my-1 d-flex flex-column ${message.fromMe?'align-self-end align-items-end':'align-items-start'}`}>
                  <div className={`rounded px-2 py-1 ${message.fromMe?'bg-primary text-white':'border'}`}>
                      {message.text}
                  </div>
                  <div className={`text-muted small ${message.fromMe?'text-right':''}`}>
                      {message.fromMe?'You':message.senderName}
                  </div>
               </div>
             )
           })}

        </div>
      </div>

      <Form onSubmit={handleSubmit}>
         <Form.Group>
           <InputGroup>
              <Form.Control
                as='textarea'
                required
                value={text}
                onChange={(e)=>setText(e.target.value)}
                style={{height: '85px',resize: 'none'}}
              />
              <Button type='submit'>send</Button>
           </InputGroup>
         </Form.Group>
      </Form>
     </div>
  )
}
