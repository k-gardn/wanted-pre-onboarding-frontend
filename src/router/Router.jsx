import { Route, Routes } from "react-router-dom";
import { Join } from "../pages/auth/Join";
import { Login } from "../pages/auth/Login";
import { TodoList } from "../pages/TodoList";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Join />} />
      <Route path="/login" element={<Login />} />
      <Route path="/todo" element={<TodoList />} />
    </Routes>
  );
};
