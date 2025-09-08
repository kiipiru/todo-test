import { useRef, useState, type FC } from "react";

type TodoInputProps = {
  onAdd: (val: string) => void
}

export const TodoInput: FC<TodoInputProps> = ({onAdd}) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [isValid, setIsValid] = useState<boolean>(true)
    const handleTodoAdd = () => {
      if (inputRef.current && inputRef.current.value.trim()) {
        onAdd(inputRef.current.value);
        inputRef.current.value = '';
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    };
    return  <div
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
      onKeyDown={(e) => {if (e.key === 'Enter') handleTodoAdd()}}
      placeholder=""
      aria-labelledby="todo-placeholder"
      aria-invalid={!isValid}
      ref={inputRef}
    />
    <label
      id="todo-placeholder"
      className={`input_placeholder ${
        !isValid ? "input_placeholder_invalid" : ""
      }`}
    >
      What needs to be done?
    </label>
  </div>
}