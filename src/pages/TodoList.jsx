import React, { useCallback, useState, useEffect } from "react";
import Form from "../components/form/Form";
import { TodoItem } from "../components/todo/TodoItem";
import { instance } from "../network/request";

export const TodoMain = () => {
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

    // setList(data);
  }, [fetch]);
  console.log(list);

  return (
    <>
      <div>todo List</div>
      <Form todo={todo} setTodo={setTodo} />
      {list &&
        list?.map((todo) => {
          return <TodoItem key={todo.id} {...todo} />;
        })}
    </>
  );
};

// function Todo({todo, onDeleteHandler, onCompleteHandler }) {
//   return (
//     <div className="todo-container">
//       <h2>
//         {todo.title}
//       </h2>
//       <p>
//         {todo.body}
//       </p>
//       <button onClick={()=> {onDeleteHandler(todo.id)}}>삭제</button>
//       <button onClick={()=> {onCompleteHandler(todo.id)}} >{todo.isDone ? "취소" : "완료"}</button>

//     </div>
//   )
// }
