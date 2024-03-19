import React, { useState } from "react";
import { useNotification } from "../hooks/helper";
import ModalContainer from "./ModelContainer";
import CompleteForm from "../form/CompleteForm";
import { CompleatedTask } from "../Api/todo";


export default function CompleatedTask({ visible,initialState,
    onSuccess,
    onClose })
{
    const [busy, setBusy] = useState(false);
    const { updateNotification } = useNotification();
    const handleSubmit = async (data) => {
        setBusy(true);
        const { error, todo } = await CompleatedTask(initialState.id, data);
        setBusy(false);
        if (error) return updateNotification("error", error);
        onSuccess(todo);
        updateNotification("success", "Todod updated successfully.");
        onClose();
    }
    return (
        <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
            <CompleteForm
                onSubmit={!busy ? handleSubmit : null}
                title="Congratulations, you completed the task!"
                btnTitle="Go Head"
                busy={busy}
                initialState={initialState}
            /> 
        </ModalContainer>
    )
    };