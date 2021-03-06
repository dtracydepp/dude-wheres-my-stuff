//Maintaining the state of friend data

import React, { useState, createContext } from "react"

// Create the context and can be imported and used by individual components that need data; empty warehouse
export const FriendsContext = createContext()

export const FriendProvider = (props) => {
    // The functions below perform state tranistions in the database and then ensure the application state is in sync.

    // Define the state variable "friends" which will hold the data and the update function "setFriends" to be used to modify that state
//    
    const [friends, setFriends] = useState([])

    const getFriends = (userId) => {
        return fetch(`http://localhost:8088/friends/?userId=${userId}`)
            .then(res => res.json())
            .then(setFriends)
    }

    const getFriendItemsById = (id) => {
        return fetch(`http://localhost:8088/friends/${id}?_embed=items`)
            .then(res => res.json())

    }

    const addFriend = friend => {
        return fetch("http://localhost:8088/friends", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            // stringify() method converts the friend object or value to a JSON string
            body: JSON.stringify(friend)
        })
            .then(response => response.json())

    }
    /*
    Return a context provider other components can access the array of objects being stored in the friends variable, and can invoke the update functions.
       */


    return (
        <FriendsContext.Provider value={{
            friends, getFriends, getFriendItemsById, addFriend
        }}>

            {props.children}
        </FriendsContext.Provider>
    )

}