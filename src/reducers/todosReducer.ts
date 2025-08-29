import { type Reducer } from "react";
import type { TodosActions, TodosContextValue } from "../types/types";

export const todosReducer: Reducer<TodosContextValue, TodosActions> = (
  value,
  action
) => {
  let newState = { ...value };
  switch (action.type) {
    case "COMPLETE":
      newState.todos = value.todos.map((todo) =>
        todo.key === action.payload ? { ...todo, done: true } : todo
      );
      break;
    case "UNCOMPLETE":
      newState.todos = value.todos.map((todo) =>
        todo.key === action.payload ? { ...todo, done: false } : todo
      );
      break;
    case "ADDTODO":
      newState.todos = [
        ...value.todos,
        { name: action.payload, done: false, key: Math.random() },
      ];
      break;
    case "CLEARTODOS":
      newState.todos = value.todos.filter((todo) => todo.done === false);
      break;
    case "SETFILTER":
      newState.filter = action.payload;
      break;
    default:
      return value;
  }
  newState.visibleTodos = newState.todos.filter((todo) => {
    switch (newState.filter) {
      case "All":
        return true;
      case "Active":
        return !todo.done;
      case "Completed":
        return todo.done;
    }
  });
  return newState;
};
