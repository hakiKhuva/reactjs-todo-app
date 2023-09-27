import { useCallback, useContext, useState } from "react"
import { ACTIONS, TodosContext } from "../App"

export default function TodoItem({id ,text, finished}){
    const todosContext = useContext(TodosContext);

    const handleTodoClick = useCallback(function(){
        todosContext.dispatch({
            type: ACTIONS.DISPLAY_SPECIFIC_TODO,
            todo: {
                id: id
            }
        })
    }, [id])

    const handleCompleteClick = useCallback(function(){
        todosContext.dispatch({
            type: ACTIONS.FINISH_TODO,
            todo: {
                id: id
            }
        })
    },[id])

    const handleRemoveClick = useCallback(function(){
        todosContext.dispatch({
            type: ACTIONS.REMOVE_TODO,
            todo: {
                id: id
            }
        })
    },[id])

    return(
        <div className="p-2 mx-2 my-5 rounded bg-zinc-100 hover:bg-zinc-200 transition">
            <p className="text-lg p-2 cursor-pointer" onClick={handleTodoClick}>{text}</p>
            <div className="grid grid-cols-2 border-t-2 mt-2 border-black/60 text-sm font-bold">
                {
                    !finished
                    &&
                    <button type="button" className="p-1" onClick={handleCompleteClick}>COMPLETE</button>
                }
                <button type="button" className="p-1" onClick={handleRemoveClick}>REMOVE</button>
            </div>
        </div>
    )
}