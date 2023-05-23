import React, { useState } from 'react'
import { Button, Modal, Nav, Tab } from 'react-bootstrap'
import Conversation from './Conversation'
import Contact from './Contact'
import ContactModal from './ContactModal'
import ConversationModal from './ConversationModal'

const CONVERSATION_KEY='conversation'
const CONTACT_KEY='contact'


export default function Sidebar({id}) {

  const [activeKey,setActiveKey]=useState(CONTACT_KEY)
  const [modalOpen,setModalOpen] =useState(false)

  function closeModal() {
    setModalOpen(false)
  }

  return (
    <div style={{width:'250px'}} className='d-flex flex-column'>
        <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
           <Nav variant='tabs' className='justify-content-center'>
            <Nav.Item>
                <Nav.Link eventKey={CONTACT_KEY}>contact</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey={CONVERSATION_KEY}>conversation</Nav.Link>
            </Nav.Item>
           </Nav>

           <Tab.Content className='border-end overflow-auto flex-grow-1'>
               <Tab.Pane eventKey={CONTACT_KEY}>
                 <Contact/>
               </Tab.Pane>
               <Tab.Pane eventKey={CONVERSATION_KEY}>
                 <Conversation/>
               </Tab.Pane>
           </Tab.Content>
           <div className='p-2 border-top border-end small'>
             your id: <span className='text-muted'>{id}</span>
           </div>
           <Button onClick={()=>setModalOpen(true)}>
              new {activeKey}
           </Button>
        </Tab.Container>

        <Modal show={modalOpen} onHide={closeModal}>
           {activeKey==='contact'?<ContactModal closeModal={closeModal}/>:<ConversationModal closeModal={closeModal}/>}
        </Modal>
    </div>
  )
}
