import { useCallback, useReducer } from "react";
import "./App.css";
import "./fonts.css";
import { TodosContext } from "./providers/todoContext";
import type { Filter, Todo, TodosContextValue } from "./types/types";
import { todosReducer } from "./reducers/todosReducer";
import { FilterButton } from "./ui/filterButton/filterButton";
import { TodoItem } from "./entities/todoItem/todoItem";
import { TodoInput } from "./entities/todoInput/todoInput";

const todosValue: TodosContextValue = {
  todos: [],
  visibleTodos: [],
  filter: "All",
};
const filters = ["All", "Active", "Completed"] as const;

function App() {
  const [todosState, dispatch] = useReducer(todosReducer, todosValue);
  const leftTodosCount = todosState.todos.filter((todo) => !todo.done).length;
  const handleTodoAdd = (val: string) => {
    dispatch({ type: "ADDTODO", payload: val });
  };
  const handleTodoClear = () => {
    dispatch({ type: "CLEARTODOS" });
  };
  const handleTodoToggle = useCallback(
    (todo: Todo) => {
      dispatch({ type: "TOGGLE", payload: todo.key });
    },
    [dispatch]
  );

  const handleSetFilter = (filter: Filter) => {
    dispatch({ type: "SETFILTER", payload: filter });
  };
  return (
    <>
      <header>
        <h1 className="page_heading">todos</h1>
      </header>
      <div className="page_container">
        <TodosContext.Provider value={todosState}>
          <div className="todo_list">
            <TodoInput onAdd={handleTodoAdd} />
            {todosState.visibleTodos.map((todo) => (
              <TodoItem
                key={todo.key}
                todo={todo}
                onToggle={handleTodoToggle}
              />
            ))}
            <div className="todo_params_bar">
              <p className="items_left_text">
                {leftTodosCount} item{leftTodosCount !== 1 ? "s" : ""} left
              </p>
              <div className="filters_container">
                {filters.map((f) => (
                  <FilterButton
                    key={f}
                    selected={todosState.filter === f}
                    disabled={todosState.filter === f}
                    onClick={() => handleSetFilter(f)}
                    title={f}
                  />
                ))}
              </div>
              <button
                disabled={!todosState.todos.some((todo) => todo.done)}
                className="button button_clear"
                onClick={handleTodoClear}
              >
                Clear completed
              </button>
            </div>
          </div>
        </TodosContext.Provider>
      </div>
    </>
  );
}

export default App;
