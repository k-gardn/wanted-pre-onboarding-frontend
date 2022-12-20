import React, { useState } from "react";
import styled from "styled-components";
import { todoAPI } from "../../network/api";
import { EditItem } from "./EditItem";

export const TodoItem = ({ id, todo, setTodo, isCompleted, userId }) => {
  // 리스트 페이지에는 투두 리스트의 내용과 완료 여부가 표시되어야 합니다.
  // 투두 리스트의 수정, 삭제 기능을 구현해주세요
  // 투두 리스트의 개별 아이템 우측에 수정버튼이 존재하고 해당 버튼을 누르면 수정모드가 활성화되고 투두 리스트의 내용을 수정할 수 있도록 해주세요
  // 수정모드에서는 개별 아이템의 우측에 제출버튼과 취소버튼이 표시되며 해당 버튼을 통해서 수정 내용을 제출하거나 수정을 취소할 수 있도록 해주세요
  // 투두 리스트의 개별 아이템 우측에 삭제버튼이 존재하고 해당 버튼을 누르면 투두 리스트가 삭제되도록 해주세요

  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(isCompleted);
  const [content, setContent] = useState(todo);

  const updateHandler = async () => {
    setEditMode(!editMode);
  };

  //status가 false일 때, 누르면 완성으로 돌아가는 버튼
  const completeHandler = async (e) => {
    try {
      const { data } = await todoAPI.updateTodo(id, {
        todo: content,
        isCompleted: !status,
      });
      setStatus(!status);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  //status가 true일 때, 누르면 미완성으로 돌아가는 버튼

  const deleteHandler = async () => {
    try {
      const { data } = await todoAPI.deleteTodo(id);
      setTodo([...todo, todo]);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const closeEdit = () => {
    setEditMode(false);
  };
  return (
    <TodoItemContainer>
      {editMode ? <div>{todo}</div> : <div>{content}</div>}
      {status ? (
        <StatusButton className="notyet" onClick={completeHandler}>
          not yet
        </StatusButton>
      ) : (
        <StatusButton className="completed" onClick={completeHandler}>
          complete!
        </StatusButton>
      )}
      {editMode ? (
        <>
          <EditItem
            editiId={id}
            content={content}
            setContent={setContent}
            status={status}
            setTodo={setTodo}
            closeEdit={closeEdit}
          />
        </>
      ) : (
        <MainButtonSet>
          <button className="editButton" onClick={updateHandler}>
            수정
          </button>
          <button onClick={deleteHandler}>삭제</button>
        </MainButtonSet>
      )}
    </TodoItemContainer>
  );
};

const TodoItemContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  /* padding: 10px; */
  height: 150px;
  width: 40vw;
  margin: 0 auto;
  margin-bottom: 20px;
`;

const StatusButton = styled.button`
  position: absolute;
  top: 10px;
  right: 20px;
  border: transparent;
  color: white;
  border-radius: 5px;
  padding: 5px;
  font-size: 16px;
  cursor: pointer;
  &.completed {
    background-color: #394ae185;
  }
  &.notyet {
    background-color: #abaaaa;
  }
`;

const MainButtonSet = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  & button {
    border: 2px solid #6949e980;
    background-color: white;
    color: #502ae7ee;
    border-radius: 7px;
    padding: 5px 7px;
    cursor: pointer;
  }
  .editButton {
    margin-right: 10px;
  }
`;
