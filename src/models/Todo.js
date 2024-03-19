import React, { useState } from "react";
import { useNotification } from "../hooks/helper";
import TodoForm from "../form/todo";
import { createTodo } from "../Api/todo";
import ModalContainer from "./ModelContainer";

export default function TodoUpload({ visible, onClose }) {
  const [busy, setBusy] = useState(false);
  const { updateNotification } = useNotification();
  const handleSubmit = async (data) => {
    setBusy(true);
    const { error, todo } = await createTodo(data);
    setBusy(false);
    if (error) return updateNotification("error", error);

    updateNotification("success", "Task created successfully.");
    onClose();
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <TodoForm
        onSubmit={!busy ? handleSubmit : null}
        title="Create New Task"
        btnTitle="Create"
        busy={busy}
      />
    </ModalContainer>
  );
}
