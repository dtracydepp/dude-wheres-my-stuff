// maintaining the state of item data

import React, { useState, createContext } from "react"

// The context is created and can be imported and used by individual components that need data: empty warehouse
export const ItemsContext = createContext()

export const ItemProvider = (props) => {
// / The functions below perform state tranistions in the database and then ensure the application state is in sync.
    // Define the state variable "items" which will hold the data and the function "setItems" to be used to modify that state
    const [items, setItems] = useState([])
    // Used in FriendSelect Compon---Define state variable "friendItems" which whold the data and the update function "setFriendItems" to be used to modify the state.
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
            // stringify() method converts the item object or value to a JSON string
            body: JSON.stringify(item)
        })
            .then(response => response.json())

    }
    const addNote = (note, itemId) => {


        //PATCH method edits/updates a single key:value pair in the database
        return fetch(`http://localhost:8088/items/${itemId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            // stringify() method converts the note object or value to a JSON string
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
    Return a context provider other components can access the array of objects being stored in the items variable and the friendItems variable, and can invoke the update functions.
       */


    return (
        <ItemsContext.Provider value={{
            items, getItems, getItemById, getItemsByFriendId, addItem, deleteItem, friendItems, updateItem, addNote

        }}>

            {props.children}
        </ItemsContext.Provider>
    )

}