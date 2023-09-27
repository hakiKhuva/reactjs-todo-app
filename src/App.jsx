import { createContext, useEffect, useMemo, useReducer } from "react";
import NewTodo from "./Components/NewTodo";
import Todos from "./Components/Todos";
import H2 from "./Components/H2";
import SpecificTodo from "./Components/SpecificTodo";
import { useLocalStorage } from "./hooks/useLocalStorage";

export const TodosContext = createContext()

export const ACTIONS = {
  ADD_NEW_TODO: "add-new-todo",
  FINISH_TODO: "finish-todo",
  REPLACE_TODOS: "replace-todos",
  REMOVE_TODO: "remove-todo",
  DISPLAY_SPECIFIC_TODO: "display-specific-todo",
  HIDE_SPECIFIC_TODO: "hide-specific-todo",
}

function TodosReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_NEW_TODO:
      return {
        ...state,
        todos: [{
          id: Date.now(),
          text: action.todo.text,
          finished: false,
          finishTime: null
        }, ...state.todos]
      }
    case ACTIONS.FINISH_TODO:
      return {
        ...state,
        todos: state.todos.map(todo => {
          if(todo.id === action.todo.id){
            return {
              ...todo,
              finished: true,
              finishTime: Date.now()
            }
          }
          return todo
        })
      }
    case ACTIONS.REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.todo.id)
      }
    case ACTIONS.REPLACE_TODOS:
      return {
        ...state,
        todos: action.todos
      }
    case ACTIONS.DISPLAY_SPECIFIC_TODO:
      return {
        ...state,
        specificTodoId: action.todo.id
      }
    case ACTIONS.HIDE_SPECIFIC_TODO:
      return {
        ...state,
        specificTodoId: null
      }
    default:
      throw new Error("Unknown action type!")
  }
}

export default function App() {
  const [todosInStorage, setTodosInStorage] = useLocalStorage()

  const [state, dispatch] = useReducer(TodosReducer, {
    todos: todosInStorage.todos,
    specificTodoId: null
  })
  
  const finishedTodos = useMemo(()=>state.todos.filter(todo => todo.finished === true).sort((a,b) => a.finishTime < b.finishTime), [state.todos])
  const unfinishedTodos = useMemo(()=>state.todos.filter(todo => todo.finished === false), [state.todos])

  useEffect(()=>{
    if(JSON.stringify(state.todos) !== JSON.stringify(todosInStorage.todos)){
      setTodosInStorage(state.todos)
    }
  },[state.todos])

  useEffect(()=>{
    if(JSON.stringify(state.todos) !== JSON.stringify(todosInStorage.todos)){
      dispatch({
        type: ACTIONS.REPLACE_TODOS,
        todos: todosInStorage.todos
      })
    }
  },[todosInStorage.todos])

  return (
    <main>
      <section className="w-full max-w-3xl mx-auto font-mono">
        <TodosContext.Provider value={{
          state: state,
          dispatch: dispatch
        }}>
            <NewTodo />
            <div className="grid grid-cols-2 gap-2">
              <div>
                <H2>Unfinished</H2>
                <Todos todos={unfinishedTodos} />
              </div>
              <div>
                <H2>Finished</H2>
                <Todos todos={finishedTodos} />
              </div>
            </div>
            {
              state.specificTodoId !== null
              &&
              <SpecificTodo todoId={state.specificTodoId} />
            }
        </TodosContext.Provider>
      </section>
    </main>
  )
}