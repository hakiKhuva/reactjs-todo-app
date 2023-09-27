import TodoItem from "./TodoItem";

export default function Todos({todos}){
    return(
        <div className="border p-4">
            {
                todos.map(todo => (
                    <TodoItem {...todo} key={todo.id}/>
                ))
            }
            {
                todos.length === 0
                &&
                <p className="my-4 text-black/60 text-center">No todos!</p>
            }
        </div>
    )
}