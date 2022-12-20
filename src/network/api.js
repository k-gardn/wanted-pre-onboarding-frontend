import { instance } from "./request";

export const todoAPI = {
  getTodos: () => instance.get(`/todos`),
  addTodo: (data) => instance.post(`/todos`, data),
  updateTodo: (editiId, data) => instance.put(`/todos/${editiId}`, data),
  deleteTodo: (id) => instance.delete(`/todos/${id}`),
};
