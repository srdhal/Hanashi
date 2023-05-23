import React from 'react'
import Sidebar from './Sidebar'
import ConversationPanel from './ConversationPanel'
import { useConversations } from '../contexts/ConversationsProvider'

export default function Dashboard({id}) {

  const {conversations,selectedConversation}=useConversations()

  return (
    <div className='d-flex' style={{height: '100vh'}}>
      <Sidebar id={id}/>
      {selectedConversation && <ConversationPanel/>}
      

    </div>
  )
}
