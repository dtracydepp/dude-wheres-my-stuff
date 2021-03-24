// This component establishes what data can be used.

import React, {useState, createContext} from "react"

// The context is imported and used by individual components that need data
export const ItemsContext = createContext()

export const ItemProvider = (props) => {

// Define the state variable "items" which will hold the data and the function "setItems" to be used to modify that state
    const [items, setItems] = useState([])
    const [friendItems, setFriendItems] = useState([])

    const getItems = (userId) => {
        return fetch(`http://localhost:8088/items?userId=${userId}`)
        .then(res => res.json())
        .then(setItems)
    }

    const getItemById = (id) => {
        return fetch(`http://localhost:8088/items/${id}?_expand=friend`)
            .then(res => res.json())
            
          
    }

    const getItemsByFriendId = (friendId) => {
        return fetch(`http://localhost:8088/items?friendId=${friendId}`)
        .then(res => res.json())
        .then(setFriendItems)
    }

    const addItem = item => {
        return fetch("http://localhost:8088/items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        })
        .then(response => response.json())
        
    }
    const addNote = (note,itemId) => {

        
        //PATCH method edits/updates a single key:value pair in the database
        return fetch(`http://localhost:8088/items/${itemId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                note: note.note
            })
        })
            .then(getItems)
    
        }

    const deleteItem = itemId => {
        return fetch(`http://localhost:8088/items/${itemId}`, {
            method: "DELETE"
        })
            .then(getItems)
    }

    const updateItem = item => {
        return fetch(`http://localhost:8088/items/${item.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(item)
        })
          .then(getItems)
      }
 /*
 Return a context provider other components can access the array of objects being stored in the items variable, and can invoke the, getItems and addItems functions(added later).
    */
  
    
return (
    <ItemsContext.Provider value={{
        items, getItems, getItemById,getItemsByFriendId, addItem, deleteItem, friendItems, updateItem, addNote
       
    }}>

        {props.children}
    </ItemsContext.Provider>
)

}