import React, { useState } from "react";
import { instance } from "../../network/request";
export const TodoItem = ({ id, todo, isCompleted, userId }) => {
  // 리스트 페이지에는 투두 리스트의 내용과 완료 여부가 표시되어야 합니다.
  // 투두 리스트의 수정, 삭제 기능을 구현해주세요
  // 투두 리스트의 개별 아이템 우측에 수정버튼이 존재하고 해당 버튼을 누르면 수정모드가 활성화되고 투두 리스트의 내용을 수정할 수 있도록 해주세요
  // 수정모드에서는 개별 아이템의 우측에 제출버튼과 취소버튼이 표시되며 해당 버튼을 통해서 수정 내용을 제출하거나 수정을 취소할 수 있도록 해주세요
  // 투두 리스트의 개별 아이템 우측에 삭제버튼이 존재하고 해당 버튼을 누르면 투두 리스트가 삭제되도록 해주세요

  const [editMode, setEditMode] = useState(false);

  const updateHandler = async () => {
    setEditMode(!editMode);
    try {
      const res = await instance.put(`/todos/${id}`, {
        todo,
        isCompleted,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = () => {};

  return (
    <>
      <div>{todo}</div>
      <button onClick={updateHandler}>수정</button>
      <button onClick={deleteHandler}>삭제</button>
      <button>제출</button>
      <button>수정 취소</button>
      <div>내용</div>
    </>
  );
};
