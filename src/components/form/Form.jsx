import React, { useState, useRef } from "react";
import styled from "styled-components";
import { instance } from "../../network/request";

export const Form = ({ todo, setTodo }) => {
  const initialState = { todo: "" }; // 초기값
  const [inputTodo, setInputTodo] = useState(initialState);

  const onChangeHandler = (event) => {
    const content = event.target.value;
    setInputTodo({ ...inputTodo, todo: content });
    setTodo(content);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault(); //from의 기능 중 submit을 하면 자동으로 페이지를 리랜더링하는데 이걸 하면 정보가 다 날아가기 때문에 이를 방지
  };

  async function creatTodoHandler() {
    try {
      const res = await instance.post(`/todos`, { todo });
      console.log(res);
      setTodo([...todo, todo]);
      setInputTodo(initialState); // input창을 빈칸으로
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="form_container">
      <FormContainer className="input_container">
        <input
          type="text"
          name="content"
          placeholder="오늘의 할 일을 적어보세요"
          onChange={onChangeHandler}
          value={inputTodo.todo}
          required
        />
        <button onClick={creatTodoHandler}>추가하기</button>
      </FormContainer>
    </form>
  );
};
export default Form;

const FormContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  & input {
    &::placeholder {
      display: flex;
      padding-left: 15px;
    }
    border: none;
    border-radius: 10px;
    width: 25vw;
    height: 30px;
    font-size: 15px;
    margin-right: 20px;
    /* background-color: transparent; */
  }
  & button {
    border: transparent;
    border-radius: 5px;
    /* padding: 8px 10px; */
    background-color: #6949e980;
    width: 75px;
    height: 30px;
    text-align: center;
    color: white;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
  }
`;
