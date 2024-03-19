import React from 'react'
import { useState } from 'react';
import { AiOutlinePlus } from "react-icons/ai";
import { CreateOptions } from '../Utility/CreateOption'

const Heropage = ({onAddTask }) => {
  const [showOptions, setShowOptions] = useState(false);
  const options = [
    { title: "Add Task", onClick: onAddTask },
   ];
  return (
    <div className='mt-1 ml-[75rem] '>
      <button
          onClick={() => setShowOptions(true)}
          className="flex items-center space-x-2 dark:border-dark-subtle border-light-subtle dark:text-dark-subtle text-light-subtle hover:opacity-80 transition font-semibold border-2 rounded text-lg px-3 py-1"
        >
          <span>Create</span>
          <AiOutlinePlus />
        </button>

        <CreateOptions
          visible={showOptions}
          onClose={() => setShowOptions(false)}
          options={options}
        />
      </div>
  )
}

export default Heropage;