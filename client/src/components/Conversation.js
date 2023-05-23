import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider'



export default function Conversation() {
 
  const {conversations,selectConversationIndex}=useConversations()

  return (
    <ListGroup variant='flush'>
     {conversations.map((conversation,index)=>(
      <ListGroup.Item 
      key={index}
      active={conversation.selected}
      action
      onClick={()=>selectConversationIndex(index)}
      >
         {conversation.recipients && conversation.recipients.map(r=>r.name).join(', ')}
      </ListGroup.Item>
     ))}
    </ListGroup>
  )
}
