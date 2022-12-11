import React from "react";
import { useState } from "react";
import { instance } from "../../network/request";

export const EditItem = ({
  content,
  setContent,
  status,
  editiId,
  setTodo,
  closeEdit,
}) => {
  console.log(content);

  const initialState = { todo: "" }; // 초기값
  const [inputTodo, setInputTodo] = useState(initialState);

  const onChangeHandler = async (event) => {
    event.preventDefault();
    const editText = event.target.value;
    setInputTodo({ ...inputTodo, todo: editText });
    setContent(editText);
  };

  async function editTodoHandler() {
    try {
      const res = await instance.put(`/todos/${editiId}`, {
        todo: content,
        isCompleted: status,
      });
      setTodo([...content, content]);
      console.log(res);
      closeEdit();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>내용</label>
        <input
          type="text"
          name="content"
          placeholder="내용을 입력해주세요"
          onChange={onChangeHandler}
          value={content}
          required
        />
        <button onClick={editTodoHandler}>제출</button>
      </form>
    </>
  );
};
