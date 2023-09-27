import { useCallback, useContext, useEffect, useState } from "react"
import { ACTIONS, TodosContext } from "../App"

export default function SpecificTodo({todoId}){
    const context = useContext(TodosContext);
    const [currentTodo, setCurrentTodo] = useState(null)

    useEffect(() => {
        const todo = context.state.todos.filter(todo => todo.id === todoId)
        if(todo.length === 0){
            context.dispatch({
                type: ACTIONS.HIDE_SPECIFIC_TODO
            })
        } else {
            setCurrentTodo(todo[0])
        }
    },[])

    const handleHideClick = useCallback(function(){
        context.dispatch({
            type: ACTIONS.HIDE_SPECIFIC_TODO
        })
    },[])

    return(
        <div className="fixed top-0 bottom-0 right-0 left-0 flex items-center justify-center z-50 bg-black/60">
            <div className="bg-zinc-700 p-8 w-full max-w-lg rounded-lg text-white text-sm">
                <h3 className="text-2xl my-2 mb-4">{currentTodo?.text}</h3>
                <p>Created at {currentTodo?.id ? new Date(currentTodo?.id).toLocaleString() : []}</p>
                {
                    currentTodo?.finished === true &&
                    <p>Finished at {currentTodo?.finishTime ? new Date(currentTodo?.finishTime).toLocaleString() : []}</p>
                }
                <p>Status is <strong>{currentTodo?.finished === true ? "Finished" : "Unfinished" }</strong></p>
                <div className="mt-5">
                    <button type="button" className="bg-zinc-800/40 p-2 mr-0 ml-auto block rounded hover:bg-zinc-800/80" onClick={handleHideClick}>Close</button>
                </div>
            </div>
        </div>
    )
}