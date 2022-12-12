import React, { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/form/Form";
import { TodoItem } from "../components/todo/TodoItem";
import { instance } from "../network/request";
import styled from "styled-components";

export const TodoMain = () => {
  const navigate = useNavigate();

  const [list, setList] = useState([]);
  const [todo, setTodo] = useState("");

  const fetch = useCallback(async () => {
    try {
      const { data } = await instance.get(`/todos`);
      console.log(data);
      setList(data); //여기에서는 불변성을 안지켜줘야하네
    } catch (err) {
      console.error(err);
    }
  }, [todo]); //바로 렌더링

  useEffect(() => {
    fetch();
  }, [fetch]);

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/todo");
    } else {
      navigate("/");
    }
  }, [navigate]);

  console.log(list);

  return (
    <TodoListContainer>
      <h1>Todo List</h1>
      <Form todo={todo} setTodo={setTodo} />
      {list &&
        list?.map((todo) => {
          return <TodoItem key={todo.id} {...todo} setTodo={setTodo} />;
        })}
    </TodoListContainer>
  );
};

const TodoListContainer = styled.div`
  border-radius: 20px;
  background-color: #5720af32;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10vh auto;
  width: 70vw;
`;
