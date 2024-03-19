import React, { useEffect, useState } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { getTodo, deleteTodo } from "../Api/todo";
import { useNotification } from "../hooks/helper";
import ConfirmModal from "../models/ConfirmModel";
import NextAndPrevButton from "../models/NextAndPrevButton";
import UpdateTask from "../models/UpdateTodo";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import CompleatedTask from "../models/CompleatedTask"
let currentPageNo = 0;
const limit = 16;
export default function CurrentTodoTask() { 
  
  const [Todotask, setTodotask] = useState([]);
  const [reachedToEnd, setReachedToEnd] = useState(false);
  const [busy, setBusy] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const[showCompleated, setshowCompleated]=useState(false)
  const [selectedProfile, setSelectedProfile] = useState(null);
  const { updateNotification } = useNotification();
  const fetchTodo = async (pageNo) => {
    
    const { profiles, error } = await getTodo(pageNo, limit);
    if (error) return updateNotification("error", error);
    if (!profiles.length) {
      currentPageNo = pageNo - 1;
      return setReachedToEnd(true);
    }
    let actualdata = profiles.filter((Data) => { return (!Data.taskcompleted && !Data.delaytask) })
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

  const handleOnEditClick = (profile) => {  
    setShowUpdateModal(true);
    setSelectedProfile(profile);
  };
  const handleOnCompleated = (profile) => {  
    setshowCompleated(true);
    setSelectedProfile(profile);
  };

  const hideUpdateModal = () => {
    setShowUpdateModal(false);
  };
    const hideCompltedModel = () => {
    setshowCompleated(false);
  };
  const handleOnTodoUpdate = (profile) => {
    const updatedTodo= Todotask.map((Task) => {
      if (profile.id === Task.id) {
        return profile;
      }
      return Task;
    });

    setTodotask([...updatedTodo]);

  }
const handleOnDeleteClick = (profile) => {
    setSelectedProfile(profile);
    setShowConfirmModal(true);
  };

  const handleOnDeleteConfirm = async () => {
    setBusy(true);
    const { error, message } = await deleteTodo(selectedProfile.id);
    setBusy(false);
    if (error) return updateNotification("error", error);
    updateNotification("success", message);
    hideConfirmModal();
    fetchTodo(currentPageNo);
  };

  const hideConfirmModal = () => setShowConfirmModal(false);

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
            key={TodoTasks.id}
            onEditClick={() => handleOnEditClick(TodoTasks)}
            onDeleteClick={() => handleOnDeleteClick(TodoTasks)} 
            OnCompleate= {()=>handleOnCompleated(TodoTasks)}/>
    ))}
      </div>
     <NextAndPrevButton
            className="mt-5"
            onNextClick={handleOnNextClick}
            onPrevClick={handleOnPrevClick}
          />
      </div>
      <ConfirmModal
        visible={showConfirmModal}
        title="Are you sure?"
        subtitle="This action will remove this Task permanently!"
        busy={busy}
        onConfirm={handleOnDeleteConfirm}
        onCancel={hideConfirmModal}
      />
        <UpdateTask
        visible={showUpdateModal}
        onClose={hideUpdateModal}
        initialState={selectedProfile}
        onSuccess={handleOnTodoUpdate}

      />
         <CompleatedTask
        visible={showCompleated}
        onClose={hideCompltedModel}
        initialState={selectedProfile}
        onSuccess={handleOnTodoUpdate}

      />
      </>

)
}

const TaskProfile = ({ profile, onEditClick, onDeleteClick ,OnCompleate}) => {
  const[NumOfDays,setNumOfDays]=useState(0)
  const [CurrentDate, SetCurrentDate] = useState({date:"",month:""})
  useEffect(() => {
      const Currentdate = new Date();
      const CurrentData = {
        date: Currentdate.getTime(),
      }
      SetCurrentDate(CurrentData)
    }, [])
  
  const [showOptions, setShowOptions] = useState(false);
  const acceptedNameLength = 50;

  const handleOnMouseEnter = () => {
    setShowOptions(true);
  };

  const handleOnMouseLeave = () => {
    setShowOptions(false);
  };

  const getName = (name) => {
    if (name.length <= acceptedNameLength) return name;

    return name.substring(0, acceptedNameLength) + "..";
  };
  const { name, description, priority, targetdate } = profile;
  let timeStamp = Date.parse(targetdate);
  let date = new Date(timeStamp);
  let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  let year = date.getFullYear();
  let month = months[date.getMonth()];
  let dateVal = date.getDate();
  let formattedDate = dateVal + '-' + month + '-' + year;
  let TargetDate=date.getTime()
  if (!profile) return null;
  return (
    <div className="bg-white shadow dark:shadow dark:bg-secondary rounded min-h-fit overflow-hidden text-wrap w-[18rem] p-2 ">
      <div
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        className="flex cursor-pointer relative"
      >

        <div className="px-2 border-black rounded">
          <div className=" flex justify-between items-start">
          <h1 className="text-xl text-primary dark:text-white font-semibold whitespace-nowrap font-mono">
            {getName(name)}
          </h1>
            <div className="">{
              priority === "priority1" ? (<h1 className="bg-lime-400 font-bold rounded   p-2">High</h1>)
                : priority === "priority2" ? (<h1 className="bg-yellow-400 rounded  font-bold  p-2 ">Mid</h1>)
                :  priority === "priority3" ? (<h1 className="bg-orange-300 rounded  p-2  ">Low</h1>):""
            }</div>
            </div>
          <p className="text-primary dark:text-white opacity-70 font-serif">
            {description.substring(0, 200)}
          </p>
          <span className="flex text-primary dark:text-white  font-serif pt-2 gap-2">
            <h1 className="opacity-70">TargetDate:</h1>
            <h4 className="font-semibold">{formattedDate}</h4>
           
            <h5>{(TargetDate > CurrentDate.date) ? (`${Math.floor(((TargetDate - CurrentDate?.date) / 3600000))} Hr`) : ""}</h5>
            
         </span>
          
          
        </div>
        <Options
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
          OnCompleate={OnCompleate}
          visible={showOptions}
        />
      </div>
    </div>
  );
};

const Options = ({ visible, onDeleteClick, onEditClick,OnCompleate }) => {
  if (!visible) return null;

  return (
    <div className="absolute inset-0 bg-primary bg-opacity-25 backdrop-blur-sm flex justify-center items-center space-x-5">
      <button
        onClick={onDeleteClick}
        className="p-2 rounded-full bg-white text-primary hover:opacity-80 transition"
        type="button"
      >
        <BsTrash />
      </button>
      <button
        onClick={onEditClick}
        className="p-2 rounded-full bg-white text-primary hover:opacity-80 transition"
        type="button"
      >
        <BsPencilSquare />
      </button>
      <button
        onClick={OnCompleate}
        className="p-2 rounded-full bg-white text-primary hover:opacity-80 transition"
        type="button"
      >
        
       <IoCheckmarkDoneCircle />
      </button>
    </div>
  );
};