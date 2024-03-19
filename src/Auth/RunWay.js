import React from 'react'
import Container from '../Utility/Container'
const RunWay = () => {
  return (
      <div className="dark:bg-primary bg-white">
          <Container className="relative">
        <img className="overflow-hidden absolute w-screen h-[40rem]" src='https://images.unsplash.com/photo-1662027008658-b615840c7deb?q=80&w=2062&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
        <img className=" hidden md:block shadow-2xl shadow-black md:absolute md:w-[20rem] md:h-[20rem] md:rounded md:mt-10 md:ml-10  " src='https://images.unsplash.com/photo-1545264835-3e14e4dae383?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
        <img  className=" hidden md:block shadow-2xl shadow-black md:absolute md:w-[15rem] md:h-[15rem] md:rounded md:mt-5 md:ml-[62rem]  " src='https://images.unsplash.com/photo-1606489129187-1eee19a0a103?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'/>
       </Container>
   
    </div>
  )
}

export default RunWay;