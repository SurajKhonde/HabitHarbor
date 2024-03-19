import React, { useEffect, useState } from "react";
import { getTodo} from "../Api/todo";
import { useNotification } from "../hooks/helper";
import NextAndPrevButton from "../models/NextAndPrevButton";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
let currentPageNo = 0;
const limit = 16;
export default function CompleatedTask() { 
  const [Todotask, setTodotask] = useState([]);
  const [reachedToEnd, setReachedToEnd] = useState(false);
  const { updateNotification } = useNotification();
  const fetchTodo = async (pageNo) => { 
    const { profiles, error } = await getTodo(pageNo, limit);
    if (error) return updateNotification("error", error);
    if (!profiles.length) {
      currentPageNo = pageNo - 1;
      return setReachedToEnd(true);
    }
    let actualdata = profiles.filter((Data) => { return (Data.taskcompleted ) })
     setTodotask([...actualdata]);
  };
const handleOnNextClick = () => {
    if (reachedToEnd) return;
    currentPageNo += 1;
    fetchTodo(currentPageNo);
  };

  const handleOnPrevClick = () => {
    if (currentPageNo <= 0) return;
    if (reachedToEnd) setReachedToEnd(false);

    currentPageNo -= 1;
    fetchTodo(currentPageNo);
  };
  useEffect(() => {
    fetchTodo(currentPageNo);
  }, []);

  return (
    <>
    <div className="p-5 -z-0">
      <div className="grid grid-cols-4 gap-5">{
        Todotask.map((TodoTasks) => (
          <TaskProfile
            profile={TodoTasks}
            key={TodoTasks.id}/>
    ))}
      </div>
     <NextAndPrevButton
            className="mt-5"
            onNextClick={handleOnNextClick}
            onPrevClick={handleOnPrevClick}
          />
      </div>
            </>

)
}

const TaskProfile = ({ profile }) => {
    const acceptedNameLength = 50;
  const getName = (name) => {
    if (name.length <= acceptedNameLength) return name;
    return name.substring(0, acceptedNameLength) + "..";
  };
  const { name, description } = profile;
  
  if (!profile) return null;
  return (
    <div className="bg-white shadow dark:shadow dark:bg-secondary rounded min-h-fit overflow-hidden min-w-min p-2 ">
        <div className="px-2 border-black rounded">
          <div className=" flex justify-between items-start">
          <h1 className="text-xl text-primary dark:text-white font-semibold whitespace-nowrap font-mono">
            {getName(name)}
          </h1>
          <div>
            <IoCheckmarkDoneCircle />
          </div>
            </div>
          <p className="text-primary dark:text-white opacity-70 font-serif">
            {description.substring(0, 200)}
          </p>
          
        </div>

      </div>

  );
};

