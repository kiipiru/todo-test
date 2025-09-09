import { useRef, useState, type FC } from "react";
import styles from "./todoInput.module.css";

type TodoInputProps = {
  onAdd: (val: string) => void;
};

export const TodoInput: FC<TodoInputProps> = ({ onAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isValid, setIsValid] = useState<boolean>(true);
  const handleTodoAdd = () => {
    if (inputRef.current && inputRef.current.value.trim()) {
      onAdd(inputRef.current.value);
      inputRef.current.value = "";
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };
  return (
    <div
      className={`${styles.inputContainer} ${
        !isValid ? styles.inputContainerInvalid : ""
      }`}
      onBlur={() => {
        if (!isValid) setIsValid(true);
      }}
    >
      <button
        className={`button ${styles.buttonChevron} ${
          !isValid ? styles.buttonChevronInvalid : ""
        }`}
        onClick={handleTodoAdd}
      ></button>
      <input
        className={`${styles.inputTodo} ${
          !isValid ? styles.inputTodoInvalid : ""
        }`}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleTodoAdd();
        }}
        placeholder=""
        aria-labelledby="todo-placeholder"
        aria-invalid={!isValid}
        ref={inputRef}
      />
      <label
        id="todo-placeholder"
        className={`${styles.inputPlaceholder} ${
          !isValid ? styles.inputPlaceholderInvalid : ""
        }`}
      >
        What needs to be done?
      </label>
    </div>
  );
};
