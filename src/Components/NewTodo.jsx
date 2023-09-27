import { useCallback, useContext, useState } from "react"
import { ACTIONS, TodosContext } from "../App"

export default function NewTodo() {
    const [todoData, setTodoData] = useState("")
    const context = useContext(TodosContext)

    const handleSubmit = useCallback((e)=>{
        e.preventDefault()
        if(todoData){
            context.dispatch({
                type: ACTIONS.ADD_NEW_TODO,
                todo: {
                    text: todoData
                }
            })
            setTodoData("");
        }
    }, [todoData])

    return (
        <div className="my-8 border p-4">
            <h2 className="font-bold text-2xl my-2">Add todo</h2>
            <form className="grid grid-cols-[80%_20%]" onSubmit={handleSubmit}>
                <input type="text" value={todoData} onChange={e => setTodoData(e.target.value)} placeholder="Enter todo" className="p-2 border-b-2 focus:border-black outline-none" />
                <button className="bg-sky-600 p-2 text-white border-2 border-sky-600">Add</button>
            </form>
        </div>
    )
}