import { useCallback, useEffect, useState } from "react";

function getInitialState(){
    const infoInStorage = window.localStorage.getItem("appState")
    if(infoInStorage){
        try {
            const parsedJSON = JSON.parse(infoInStorage)
            if(Array.isArray(parsedJSON['todos'])){
                if(parsedJSON['todos'].length > 0){
                    parsedJSON['todos'].forEach(todo => {
                        if(
                            typeof(todo.id) !== "number" ||
                            typeof(todo.text) !== "string" ||
                            typeof(todo.finished) !== "boolean" ||
                            (todo.finishTime !== null && typeof(todo.finishTime) !== "number")
                        ){
                            throw new Error()
                        }
                    })
                }
                return parsedJSON
            }
        } catch {}
    }
    return {
        todos: []
    }
}

export function useLocalStorage(){
    const [state, setState] = useState(getInitialState)

    useEffect(()=>{
        window.localStorage.setItem("appState", JSON.stringify(state))
    },[state])

    function currentStateEventListener(){
        const changedValue = getInitialState();
        if(JSON.stringify(state) !== JSON.stringify(changedValue)){
            setState(changedValue)
        }
    }

    useEffect(()=>{
        window.addEventListener("storage", currentStateEventListener)
        return function(){
            window.removeEventListener("storage",currentStateEventListener)
        }
    },[])

    return [state, function(todos){
        setState({
            ...state,
            todos: todos
        })
    }]
}