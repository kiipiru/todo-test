import { memo } from "react";
import type { Todo } from "../../types/types";
import styles from "./todoItem.module.css";

type TodoProps = {
  todo: Todo;
  onToggle: (todo: Todo) => void;
};

export const TodoItem = memo<TodoProps>(({ todo, onToggle }) => {
  return (
    <div className={styles.todoContainer} key={todo.key}>
      <button
        className={`button ${styles.buttonTodo} ${
          todo.done ? styles.buttonTodoActive : ""
        }`}
        onClick={() => onToggle(todo)}
      ></button>
      <p
        className={`${styles.todoItemName} ${
          todo.done ? styles.todoItemNameDone : ""
        }`}
      >
        {todo.name}
      </p>
    </div>
  );
});
