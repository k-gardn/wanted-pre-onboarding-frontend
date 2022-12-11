import React from "react";
import { TodoItem } from "../components/todo/TodoItem";

export const TodoList = () => {
  // 리스트 페이지에는 입력창과 추가 버튼이 있고, 추가 버튼을 누르면 입력창의 내용이 새로운 투두 리스트로 추가되도록 해주세요

  return (
    <>
      <div>todo List</div>
      <input placeholder="오늘의 할일은 무엇이 있을까?"></input>
      <TodoItem />
      <TodoItem />
      <TodoItem />
    </>
  );
};
