type IsNever<T, True, False> = [T] extends [never] ? True : False;

type Action<Type extends string, Payload = never> = IsNever<
  Payload,
  {
    type: Type;
  },
  {
    type: Type;
    payload: Payload;
  }
>;

export type Todo = {
  name: string;
  done: boolean;
  key: number;
};

export type Filter = "All" | "Active" | "Completed";

export type TodosContextValue = {
  todos: Todo[];
  visibleTodos: Todo[];
  filter: Filter;
};

export type TodosActions =
  | Action<"COMPLETE", number>
  | Action<"UNCOMPLETE", number>
  | Action<"ADDTODO", string>
  | Action<"CLEARTODOS">
  | Action<"SETFILTER", Filter>;
