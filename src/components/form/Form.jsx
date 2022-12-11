import React, { useState, useRef } from "react";
import { instance } from "../../network/request";

export const Form = ({ todo, setTodo }) => {
  const initialState = { todo: "" }; // 초기값
  const [inputTodo, setInputTodo] = useState(initialState);

  const nextId = useRef(2);

  const onChangeHandler = (event) => {
    const content = event.target.value;
    setInputTodo({ ...inputTodo, todo: content });
    setTodo(content);
    nextId.current++;
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
      <div className="input_container">
        <label>내용</label>
        <input
          type="text"
          name="content"
          placeholder="오늘의 할 일을 적어보세요"
          onChange={onChangeHandler}
          value={inputTodo.todo}
          required
        />
      </div>
      <button onClick={creatTodoHandler}>추가하기</button>
    </form>
  );
};
export default Form;
