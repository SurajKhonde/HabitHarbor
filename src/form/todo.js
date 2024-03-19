import React, { useEffect, useState } from "react";
import { ImSpinner3 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../hooks/helper";
import { commonInputClasses } from "../Utility/theme";
import Selector from "../Utility/Selector";

const defaultTodoInfo = {
    name: "",
    description: "",
    targetdate: Date,
    priority: "",
};

const priorityOptions = [
    { title: "priority1", value: "priority1" },
    { title: "priority2", value: "priority2" },
    { title: "priority3", value: "priority3" },
];

const validateTodo = ({ name, description, priority }) => {
    if (!name.trim()) return { error: "Todo name is missing!" };
    if (!description.trim()) return { error: "Unravel the depths of your task for me." };
    if (!priority.trim()) return { error: "Please decide your priority!" };

    return { error: null };
};

export default function TodoForm({
    title,
    initialState,
    btnTitle,
    busy,
    onSubmit,
}) {
    const [todoInfo, setTodoInfo] = useState({ ...defaultTodoInfo });
    const { updateNotification } = useNotification();
    const navigate = useNavigate();

    const handleChange = ({ target }) => {
        const { value, name } = target;
        setTodoInfo({ ...todoInfo, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { error } = validateTodo(todoInfo);
        if (error) return updateNotification("error", error);
        // Submit form
        // const formData = new FormData();
        // for (let key in todoInfo) {
        //     formData.append(key, todoInfo[key]);
        // }
       
        onSubmit(todoInfo);
        
    };
    

    useEffect(() => {
        if (initialState) {
            setTodoInfo({ ...initialState });
        }
    }, [initialState]);

    const { name, description, targetdate, priority } = todoInfo;

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
                    type="submit"
                >
                    {busy ? <ImSpinner3 className="animate-spin" /> : btnTitle}
                </button>
            </div>

            <div className="flex space-x-2">
                <div className="flex-grow flex flex-col space-y-2">
                    <input
                        placeholder="Assign Task"
                        type="text"
                        className={commonInputClasses + "  border-b-2"}
                        name="name"
                        value={name}
                        onChange={handleChange}
                    />
                    <textarea
                        name="description"
                        value={description}
                        onChange={handleChange}
                        placeholder="Description"
                        className={commonInputClasses + " border-b-2 resize-none h-full"}
                    ></textarea>
                </div>
            </div>

            <div className="mt-3 flex justify-between gap-2">
                <Selector
                    options={priorityOptions}
                    label="Priority"
                    value={priority}
                    onChange={handleChange}
                    name="priority"
                />
                <input
                    type="date"
                    data-val="true" data-val-date="The field My date must be a date." 
                    className={commonInputClasses + " border-2 rounded p-1 w-full"}
                    onChange={handleChange}
                    name="targetdate"
                    value={targetdate}
                />
            </div>
        </form>
    );
}
