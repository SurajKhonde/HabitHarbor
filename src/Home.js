import React, { useState,useEffect } from 'react'
import NavBar from './components/NavBar';
import { Route, Routes } from "react-router-dom";
import Heropage from './components/Heropage';
import TodoUpload from "./models/Todo"
import CurrentTodoTask from "./components/CurrentTodoTask"
import Delayed from './components/Delayed';
import CompleatedTask from './components/CompleatedTask';
import NotFound from './components/NotFound';
import TopRatedTask from './components/TopRatedTask';
const Home = () => {
  const [ShowTodoUploadModal,setShowTodoUploadModal]=useState(false)
  const displayTodoUploadModal = () => {
    setShowTodoUploadModal(true);
  };
  const hideTodoUploadModal = () => {
    setShowTodoUploadModal(false);
  };
  return (
    <>
      <div className='flex fixed inset-0 dark:bg-black bg-white '>
        <NavBar />
        <div className="flex-1 max-w-screen-xl">
          <Heropage
            onAddTask={displayTodoUploadModal} />
          <Routes>
            <Route path="/" element={<CurrentTodoTask/>} />
            <Route path="/CompleateTask" element={ <CompleatedTask/>}/>
            <Route path="/DelayedTask" element={<Delayed/>} />
            <Route path="/Toprated" element={<TopRatedTask/>} />
            <Route path="*" element={<NotFound/>} /> 
          </Routes>
        </div>
      </div>
      <TodoUpload
        visible={ShowTodoUploadModal}
        onClose={hideTodoUploadModal}
      />
    </>
      
  );
}

export default Home;