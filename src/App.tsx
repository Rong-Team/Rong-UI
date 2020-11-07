import React, { useState, useEffect } from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components'
import Switch from '../components/Switch'
import './App.css';
import { ThemeStore } from '../components/styles';



import message from '../components/Message'
import notification from '../components/Notification'
import Drawer from '../components/Drawer';
import Modal from '../components/Modal';


function App() {
  const [visible, setvisible] = useState(false)
  const [val, setval] = useState('')
  const listData = [];
  for (let i = 0; i < 5; i++) {
    listData.push({
      href: 'https://ant.design',
      title: `ant design part ${i}`,
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      description:
        'Ant Design, a design language for background applications, is refined by Ant UED Team.',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
  }
  const IconText = ({ icon, text }: any) => (
    <>
      {React.createElement(icon)}
      {text}
    </>
  );
  const marks = {
    0: '0°C',
    26: '26°C',
    37: '37°C',
    100: {
      style: {
        color: '#f50',
      },
      label: <strong>100°C</strong>,
    },
  };
  return (
    <ThemeProvider theme={ThemeStore}>
   
      <span onClick={()=>{setvisible(true)}}> Tooltip will show on mouse enter.</span>
  
      <Modal
          title="Basic Modal"
          visible={visible}
          onOk={()=>setvisible(false)}
          onCancel={()=>setvisible(false)}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
       
      
      
   
    </ThemeProvider>
  );
}

export default App;
