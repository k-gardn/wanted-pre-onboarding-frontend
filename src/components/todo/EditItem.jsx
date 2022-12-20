import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { todoAPI } from "../../network/api";

export const EditItem = ({
  content,
  setContent,
  status,
  editiId,
  setTodo,
  closeEdit,
}) => {
  // console.log(content);

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
      const res = await todoAPI.updateTodo(editiId, {
        todo: content,
        isCompleted: status,
      });
      setTodo([...content, content]);
      // console.log(res);
      closeEdit();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <EditItemContainer>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          name="content"
          placeholder="내용을 입력해주세요"
          onChange={onChangeHandler}
          value={content}
          required
        />
        <EditbuttonSet>
          <EditButton onClick={editTodoHandler}>제출</EditButton>
          <EditCancelButton onClick={closeEdit}>수정 취소</EditCancelButton>
        </EditbuttonSet>
      </form>
    </EditItemContainer>
  );
};

const EditItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  & form {
    display: flex;
    flex-direction: column;
  }
  & input {
    &::placeholder {
      display: flex;
      padding-left: 10px;
    }
    border: 2px solid #6949e980;
    border-radius: 10px;
    width: 220px;
    height: 30px;
    font-size: 15px;
    margin-top: 10px;
  }
`;

const EditbuttonSet = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
`;

const EditButton = styled.button`
  border: 2px solid #6949e980;
  background-color: white;
  color: #502ae7ee;
  border-radius: 7px;
  padding: 5px 7px;
  cursor: pointer;
  margin: 0 7px;
`;

const EditCancelButton = styled.button`
  border: 2px solid #6949e980;
  background-color: white;
  color: #502ae7ee;
  border-radius: 7px;
  padding: 5px 7px;
  cursor: pointer;
`;
