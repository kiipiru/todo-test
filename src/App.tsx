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

function App() {
  const [todosState, dispatch] = useReducer(todosReducer, todosValue);
  const leftTodosCount = todosState.todos.filter((todo) => !todo.done).length;
  const handleTodoAdd = (val: string) => {
    dispatch({type: 'ADDTODO', payload: val})
  };
  const handleTodoClear = () => {
    dispatch({ type: "CLEARTODOS" })
  };
  const handleTodoToggle = useCallback((todo: Todo) => {
    dispatch({ type: "TOGGLE", payload: todo.key });
  }, [dispatch]);
  
  const handleSetFilter = (filter: Filter) => {
    dispatch({ type: "SETFILTER", payload: filter });
  };
  return (<>
      <header>
      <h1 className="page_heading">todos</h1>
      </header>
      <div className="page_container">
      <TodosContext.Provider value={todosState}>
        <div className="todo_list">
          <TodoInput onAdd={handleTodoAdd}/>
          {todosState.visibleTodos.map((todo) => (
            <TodoItem todo={todo} onToggle={handleTodoToggle}/>
          ))}
          <div className="todo_params_bar">
          <p className="items_left_text">{leftTodosCount} item{leftTodosCount !== 1 ? 's' : ''} left</p>
            <div className="filters_container">
              <FilterButton
                selected={todosState.filter === "All"}
                disabled={todosState.filter === "All"}
                className="button button_filter"
                onClick={() => handleSetFilter("All")}
                title={"All"}
              ></FilterButton>
              <FilterButton
                selected={todosState.filter === "Active"}
                disabled={todosState.filter === "Active"}
                className="button button_filter"
                onClick={() => handleSetFilter("Active")}
                title={"Active"}
              ></FilterButton>
              <FilterButton
                selected={todosState.filter === "Completed"}
                disabled={todosState.filter === "Completed"}
                className="button button_filter"
                onClick={() => handleSetFilter("Completed")}
                title={"Completed"}
              ></FilterButton>
            </div>
            <button disabled={!todosState.todos.some(todo => todo.done)} className="button button_clear" onClick={handleTodoClear}>
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
