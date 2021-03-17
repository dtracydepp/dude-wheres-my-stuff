// This component establishes what data can be used.

import React, {useState, createContext} from "react"

// The context is imported and used by individual components that need data
export const ItemsContext = createContext()

export const ItemProvider = (props) => {

// Define the state variable "items" which will hold the data and the function "setItems" to be used to modify that state
    const [items, setItems] = useState([])

    const getItems = () => {
        return fetch("http://localhost:8088/items")
        .then(res => res.json())
        .then(setItems)
    }



 /*
 Return a context provider other components can access the array of objects being stored in the items variable, and can invoke the, getItems and addItems functions(added later).
    */
  
    
return (
    <ItemsContext.Provider value={{
        items, getItems
    }}>

        {props.children}
    </ItemsContext.Provider>
)

}