import React, { useState } from "react";
import { updateTodo } from "../Api/todo";
import { useNotification } from "../hooks/helper";
import TodoForm from "../form/todo";
import ModalContainer from "./ModelContainer";
export default function UpdateTask({
  visible,
  initialState,
  onSuccess,
  onClose,
}) {
  const [busy, setBusy] = useState(false);
  const { updateNotification } = useNotification();
  const handleSubmit = async (data) => {
    setBusy(true);
    const { error, todo } = await updateTodo(initialState.id, data);
    setBusy(false);
    if (error) return updateNotification("error", error);
    onSuccess(todo);
    updateNotification("success", "Todod updated successfully.");
    onClose();
  };
  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <TodoForm
        onSubmit={!busy ? handleSubmit : null}
        title=" Update Task"
        btnTitle="Update"
        busy={busy}
        initialState={initialState}
      />
    </ModalContainer>
  );
}
