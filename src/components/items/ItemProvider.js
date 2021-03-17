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
        You return a context provider which has the
        `items` state, `getItems` function,
        and the `addItems` function (when added later) as keys. This
        allows any child elements to access them.
    */
  
    
return (
    <ItemsContext.Provider value={{
        items, getItems
    }}>

        {props.children}
    </ItemsContext.Provider>
)

}