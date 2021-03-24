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
    const addNote = itemId => {
        // addNote function changes adds a note to items object
        const completeNote = {
           note: ""
        }
    
        //PATCH method edits/updates a single key:value pair in the database
        return fetch(`http://localhost:8088/items/${itemId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(completeNote)
        })
            .then(getItems)
           
    
        }
    // const addNote = note => {
    //     return fetch(`http://localhost:8088/items/${note.id}`, {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(note)
    //     })
    //     .then(response => response.json())
        
    // }

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
        items, getItems, getItemById,getItemsByUser, addItem, deleteItem, friendItems, updateItem
       
    }}>

        {props.children}
    </ItemsContext.Provider>
)

}