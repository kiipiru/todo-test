import { useReducer, useRef } from "react";
import "./App.css";
import './fonts.css'
import { TodosContext } from "./providers/todoContext";
import type { Filter, Todo, TodosContextValue } from "./types/types";
import { todosReducer } from "./reducers/todosReducer";
import { FilterButton } from "./ui/filterButton";

function App() {
  const todosValue: TodosContextValue = {
    todos: [],
    visibleTodos: [],
    filter: 'All',
  };
  const inputRef = useRef<HTMLInputElement>(null);
  const [todosState, dispatch] = useReducer(todosReducer, todosValue);
  const leftTodosCount = todosState.todos.filter(todo => !todo.done).length
  const handleTodoAdd = () => {
    const value = inputRef.current;
    if (value && value.value.length > 1 ) {
      dispatch({ type: "ADDTODO", payload: value.value });
      value.value = ''
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
    dispatch({ type: 'SETFILTER', payload: filter})
  }
  return (
    <TodosContext.Provider value={todosState}>
        <h1 className='page_heading'>todos</h1>
        <div className='page_container'>
        <div className='todo_list'>
        <div className='input_container'>
        <button className='button button_chevron'onClick={handleTodoAdd}></button>
        <input className='input_todo'
          placeholder="What needs to be done?"
          ref={inputRef}
        />
        </div>
        {todosState.visibleTodos.map((todo) => (
          <div className='todo_item_container' key={todo.key}>
            <button className={`button button_todo_item ${todo.done ? 'button_todo_item_active' : ''}`} onClick={() => handleTodoStatusChange(todo)}></button>
            <p className={`todo_item_name ${todo.done ? 'todo_item_name_done' : ''}`}>{todo.name}</p>
          </div>
        ))}
        <div className="todo_params_bar">
          <p className='text'> {`${leftTodosCount} items left`}</p>
          <div className="filters_container">
          <FilterButton selected={todosState.filter === 'All'} className='button button_filter' onClick={() => handleSetFilter('All')} title={'All'}></FilterButton>
          <FilterButton selected={todosState.filter === 'Active'} className='button button_filter' onClick={() => handleSetFilter('Active')} title={'Active'}></FilterButton>
          <FilterButton selected={todosState.filter === 'Completed'} className='button button_filter' onClick={() => handleSetFilter('Completed')} title={'Completed'}></FilterButton>
          </div>
          <button className='button button_clear' onClick={handleTodoClear}>Clear completed</button>
        </div>
        </div>
      </div>
    </TodosContext.Provider>
  );
}

export default App;
