import { useReducer, useRef, useState, type KeyboardEvent } from "react";
import "./App.css";
import "./fonts.css";
import { TodosContext } from "./providers/todoContext";
import type { Filter, Todo, TodosContextValue } from "./types/types";
import { todosReducer } from "./reducers/todosReducer";
import { FilterButton } from "./ui/filterButton";

function App() {
  const todosValue: TodosContextValue = {
    todos: [],
    visibleTodos: [],
    filter: "All",
  };
  const inputRef = useRef<HTMLInputElement>(null);
  const [todosState, dispatch] = useReducer(todosReducer, todosValue);
  const [isValid, setIsValid] = useState<boolean>(true);
  const leftTodosCount = todosState.todos.filter((todo) => !todo.done).length;
  const handleTodoAdd = () => {
    const value = inputRef.current;
    if (value && value.value.trim().length >= 1) {
      dispatch({ type: "ADDTODO", payload: value.value });
      value.value = "";
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };
  const handleEnterPress = (e: KeyboardEvent, callBack: () => void) => {
    if (e.key === "Enter") {
      callBack();
    }
  };
  const handleTodoClear = () => {
    dispatch({ type: "CLEARTODOS" });
  };
  const handleTodoStatusChange = (payload: Todo) => {
    payload.done
      ? dispatch({ type: "UNCOMPLETE", payload: payload.key })
      : dispatch({ type: "COMPLETE", payload: payload.key });
  };
  const handleSetFilter = (filter: Filter) => {
    dispatch({ type: "SETFILTER", payload: filter });
  };
  return (
    <TodosContext.Provider value={todosState}>
      <h1 className="page_heading">todos</h1>
      <div className="page_container">
        <div className="todo_list">
          <div
            className={`input_container ${
              isValid ? "" : "input_container_invalid"
            }`}
            onBlur={() => setIsValid(true)}
          >
            <button
              className={`button button_chevron ${
                isValid ? "" : "button_chevron_invalid"
              }`}
              onClick={handleTodoAdd}
            ></button>
            <input
              className={`input_todo ${isValid ? "" : "input_todo_invalid"}`}
              ref={inputRef}
              onKeyDown={(e) => handleEnterPress(e, handleTodoAdd)}
              placeholder=""
              aria-labelledby="todo-placeholder"
              aria-invalid={!isValid}
            />
            <span
              id="todo-placeholder"
              className={`input_placeholder ${
                !isValid ? "input_placeholder_invalid" : ""
              }`}
            >
              What needs to be done?
            </span>
          </div>
          {todosState.visibleTodos.map((todo) => (
            <div className="todo_item_container" key={todo.key}>
              <button
                className={`button button_todo_item ${
                  todo.done ? "button_todo_item_active" : ""
                }`}
                onClick={() => handleTodoStatusChange(todo)}
              ></button>
              <p
                className={`todo_item_name ${
                  todo.done ? "todo_item_name_done" : ""
                }`}
              >
                {todo.name}
              </p>
            </div>
          ))}
          <div className="todo_params_bar">
          <p className="items_left_text">{leftTodosCount} item{leftTodosCount !== 1 ? 's' : ''} left</p>
            <div className="filters_container">
              <FilterButton
                selected={todosState.filter === "All"}
                className="button button_filter"
                onClick={() => handleSetFilter("All")}
                title={"All"}
              ></FilterButton>
              <FilterButton
                selected={todosState.filter === "Active"}
                className="button button_filter"
                onClick={() => handleSetFilter("Active")}
                title={"Active"}
              ></FilterButton>
              <FilterButton
                selected={todosState.filter === "Completed"}
                className="button button_filter"
                onClick={() => handleSetFilter("Completed")}
                title={"Completed"}
              ></FilterButton>
            </div>
            <button className="button button_clear" onClick={handleTodoClear}>
              Clear completed
            </button>
          </div>
        </div>
      </div>
    </TodosContext.Provider>
  );
}

export default App;
