import React, { useEffect, useState } from "react";
import { ImSpinner3 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../hooks/helper";



export default function CompleteForm({
    title,
    initialState,
    btnTitle,
    busy,
    onSubmit,
}) {
     const [TodoInformation, setTodoInfo] = useState({});
    const { updateNotification } = useNotification();
    const navigate = useNavigate();
    useEffect(() => {
        if (initialState) {
            setTodoInfo({ ...initialState });
        }
    }, [initialState]);
    function handleClick() {
        setTodoInfo({ ...TodoInformation, taskcompleted: true })
     }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(TodoInformation)
        window.location.reload(true)
    };
    
     return (
        <form
            className="dark:bg-primary bg-white p-3 w-[35rem] rounded"
            onSubmit={handleSubmit}
        >
            <div className="flex justify-between items-center mb-3">
                <h1 className="font-semibold text-xl dark:text-white text-primary">
                    {title}
                </h1>
                <button
                     className="h-8 w-24 bg-primary text-white dark:bg-white dark:text-primary hover:opacity-80 transition rounded flex items-center justify-center"
                    onClick={handleClick}
                    type="submit"
                >
                    {busy ? <ImSpinner3 className="animate-spin" /> : btnTitle}
                </button>
             </div>
         </form>
     )


    }