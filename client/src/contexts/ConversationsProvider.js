import React, { useCallback, useContext, useEffect, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from './ContactsProvider'
import { useSocket } from './SocketProvider'


const ConversationsContext=React.createContext()

export function useConversations() {
    return useContext(ConversationsContext)
}

export function ConversationsProvider({id,children}) {

  const [conversations,setConversations]=useLocalStorage('conversations',[])
  const {contacts}=useContacts()
  const [selectedConversationIndex,setSelectedConversationIndex]=useState(0)
  const socket=useSocket()

  function createConversation(recipients) {

    if(!conversations){
        setConversations([{recipients,messages:[]}])
    } 
    else{
        setConversations(prevConversations=>{
            return [...prevConversations,{recipients,messages:[]}]
        })
    }
  }

  const addMessageToConversation=useCallback(({recipients,text,sender})=> {
       setConversations(prevConversations=>{
        let madeChange=false
        const newMessage={sender,text}
        const newConversation=prevConversations.map(conversation=>{
          if(arrayEqual(conversation.recipients,recipients)){
            madeChange=true
            if(!conversation.messages){
              return {
                ...conversation,
                messages: [newMessage]     
              } 
            }
            else{
              return {
                ...conversation,
                messages: [...conversation.messages,newMessage]     
              } 
            }
          }

          return conversation
        })

        if(madeChange){

            return newConversation
        }
        else{
          return [
            ...prevConversations,
            {recipients,messages:[newMessage]}
          ]
        }
       }) 
  },[setConversations])

  useEffect(()=>{
    if(socket==null) return

    socket.on('receive-message',addMessageToConversation)
  
    return ()=>socket.off('receive-message')
  },[socket,addMessageToConversation])


  function sendMessage(recipients,text) {
     socket.emit('send-message',{recipients,text})

     addMessageToConversation({recipients,text,sender: id})
  }

  const formattedConversations=conversations?.map((conversation,index)=>{
    const recipients=conversation?.recipients.map((recipient)=>{
        const contact=contacts?.find(contact=>{
            return contact.id===recipient
        })
        const name = (contact && contact.name) || recipient
        return { id: recipient, name: name }
    })

    const messages=conversation.messages.map(message=>{
      const contact=contacts?.find(contact=>{
        return contact.id===message.sender
      })
      const name = (contact && contact.name) || message.sender
      const fromMe=id===message.sender
      return {...message,senderName: name,fromMe}
    }) 


    const selected=index===selectedConversationIndex
    return {...conversation,messages,recipients,selected}
  })

  const value={
    conversations: formattedConversations,
    createConversation,
    sendMessage,
    selectConversationIndex: setSelectedConversationIndex,
    selectedConversation: formattedConversations[selectedConversationIndex] 
  }

  return (
    <ConversationsContext.Provider value={value}>
        {children}
    </ConversationsContext.Provider>
  )

   function arrayEqual(a,b){
     if(a.length!==b.length) return false

     a.sort()
     b.sort()

     return a.every((element,index)=>{
      return element===b[index]
     })
   }

}
