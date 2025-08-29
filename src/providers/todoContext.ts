import { createContext } from "react";
import type {TodosContextValue} from "../types/types";

export const TodosContext = createContext<TodosContextValue>(
    {todos: [],
     visibleTodos: [],
     filter: 'All'
    }
)