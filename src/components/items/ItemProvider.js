// This component establishes what data can be used.

import React, {useState, createContext} from "react"

// The context is imported and used by individual components that need data
export const ItemsContext = createContext()

export const ItemProvider = (props) => {

// Define the state variable "items" which will hold the data and the function "setItems" to be used to modify that state
    const [items, setItems] = useState([])
    const [friendItems, setFriendItems] = useState([])

    const getItems = () => {
        return fetch("http://localhost:8088/items")
        .then(res => res.json())
        .then(setItems)
    }

    const getItemById = (id) => {
        return fetch(`http://localhost:8088/items/${id}?_embed=friends`)
            .then(res => res.json())
          
    }

    const getItemsByUser = (userId) => {
        return fetch(`http://localhost:8088/items?userId=${userId}`)
        .then(res => res.json())
        .then(setFriendItems)
    }

 /*
 Return a context provider other components can access the array of objects being stored in the items variable, and can invoke the, getItems and addItems functions(added later).
    */
  
    
return (
    <ItemsContext.Provider value={{
        items, getItems, getItemById,getItemsByUser, friendItems
    }}>

        {props.children}
    </ItemsContext.Provider>
)

}