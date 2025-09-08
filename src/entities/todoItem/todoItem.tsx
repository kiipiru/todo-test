import { memo } from "react";
import type { Todo } from "../../types/types"
import styles from './todo.module.css'

type TodoProps = {
    todo: Todo;
    onToggle: (todo: Todo) => void;
}

export const TodoItem = memo<TodoProps>(({todo, onToggle}) => {
    return <div className="todo_item_container" key={todo.key}>
    <button
      className={`button button_todo_item ${
        todo.done ? "button_todo_item_active" : ""
      }`}
      onClick={() => onToggle(todo)}
    ></button>
    <p
      className={`todo_item_name ${
        todo.done ? "todo_item_name_done" : ""
      }`}
    >
      {todo.name}
    </p>
  </div>
})