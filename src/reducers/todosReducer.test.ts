import { describe, it, expect } from "vitest";
import { todosReducer } from "./todosReducer";
import type { TodosContextValue, TodosActions } from "../types/types";

const initialState: TodosContextValue = {
  todos: [
    { key: "1", name: "Test todo 1", done: false },
    { key: "2", name: "Test todo 2", done: true },
    { key: "3", name: "Test todo 3", done: false },
  ],
  visibleTodos: [],
  filter: "All",
};

const FILTERS = {
  ALL: "All",
  ACTIVE: "Active",
  COMPLETED: "Completed",
} as const;

describe("проверка работы todosReducer", () => {
  describe("проверка экшена TOGGLE", () => {
    it('проверяем переключение "done" у дела в списке', () => {
      const action: TodosActions = { type: "TOGGLE", payload: "1" };
      const result = todosReducer(initialState, action);

      expect(result.todos.find((todo) => todo.key === "1")?.done).toBe(true);
      expect(result.todos.find((todo) => todo.key === "2")?.done).toBe(true);
      expect(result.todos.find((todo) => todo.key === "3")?.done).toBe(false);
    });

    it("проверяем обновление видимых дел в списке при фильтре Active", () => {
      const stateWithActiveFilter = { ...initialState, filter: FILTERS.ACTIVE };
      const action: TodosActions = { type: "TOGGLE", payload: "1" };
      const result = todosReducer(stateWithActiveFilter, action);

      expect(result.visibleTodos).toHaveLength(1);
      expect(result.visibleTodos[0].key).toBe("3");
    });
  });

  describe("проверяем работу экшена ADDTODO", () => {
    it("добавляем новое дело в список", () => {
      const action: TodosActions = { type: "ADDTODO", payload: "New todo" };
      const result = todosReducer(initialState, action);

      expect(result.todos).toHaveLength(4);
      expect(result.todos[3].name).toBe("New todo");
      expect(result.todos[3].done).toBe(false);
      expect(result.todos[3].key).toBeDefined();
    });

    it("проверяем генерацию ключа у дела", () => {
      const action: TodosActions = { type: "ADDTODO", payload: "New todo" };
      const result1 = todosReducer(initialState, action);
      const result2 = todosReducer(initialState, action);

      expect(result1.todos[3].key).not.toBe(result2.todos[3].key);
    });
  });

  describe("проверка экшена CLEARTODOS", () => {
    it("удаляем все выполненные дела", () => {
      const action: TodosActions = { type: "CLEARTODOS" };
      const result = todosReducer(initialState, action);

      expect(result.todos).toHaveLength(2);
      expect(result.todos.every((todo) => !todo.done)).toBe(true);
      expect(result.todos.map((todo) => todo.key)).toEqual(["1", "3"]);
    });
  });

  describe("проверяем работу экшена SETFILTER", () => {
    it("фильтруем невыполненные дела", () => {
      const action: TodosActions = { type: "SETFILTER", payload: "Active" };
      const result = todosReducer(initialState, action);

      expect(result.filter).toBe("Active");
      expect(result.visibleTodos).toHaveLength(2);
      expect(result.visibleTodos.every((todo) => !todo.done)).toBe(true);
    });

    it("фильтруем выполненные дела", () => {
      const action: TodosActions = { type: "SETFILTER", payload: "Completed" };
      const result = todosReducer(initialState, action);

      expect(result.filter).toBe("Completed");
      expect(result.visibleTodos).toHaveLength(1);
      expect(result.visibleTodos[0].done).toBe(true);
    });

    it("фильтруем все дела", () => {
      const action: TodosActions = { type: "SETFILTER", payload: "All" };
      const result = todosReducer(initialState, action);

      expect(result.filter).toBe("All");
      expect(result.visibleTodos).toHaveLength(3);
    });
  });

  describe("проверяем, чтобы visibleTodos отображались корректно", () => {
    it("проверяем показ всех дел при фильтре All", () => {
      const state = { ...initialState, filter: FILTERS.ALL };
      const action: TodosActions = { type: "SETFILTER", payload: FILTERS.ALL };
      const result = todosReducer(state, action);

      expect(result.visibleTodos).toHaveLength(3);
    });

    it("проверяем показ невыполненных дел при фильтре Active", () => {
      const state = { ...initialState, filter: FILTERS.ACTIVE };
      const action: TodosActions = {
        type: "SETFILTER",
        payload: FILTERS.ACTIVE,
      };
      const result = todosReducer(state, action);

      expect(result.visibleTodos).toHaveLength(2);
      expect(result.visibleTodos.every((todo) => !todo.done)).toBe(true);
    });

    it("проверяем показ выполненных дел при фильтре Completed", () => {
      const state = { ...initialState, filter: FILTERS.COMPLETED };
      const action: TodosActions = {
        type: "SETFILTER",
        payload: FILTERS.COMPLETED,
      };
      const result = todosReducer(state, action);

      expect(result.visibleTodos).toHaveLength(1);
      expect(result.visibleTodos.every((todo) => todo.done)).toBe(true);
    });
  });
});
