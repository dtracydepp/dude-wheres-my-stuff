// This component establishes what data can be used.

import React, {useState, createContext} from "react"

// The context is imported and used by individual components that need data
export const FriendsContext = createContext()

export const FriendProvider = (props) => {

// Define the state variable "friends" which will hold the data and the function "setFriends" to be used to modify that state
    const [friends, setFriends] = useState([])

    const getFriends = () => {
        return fetch("http://localhost:8088/friends")
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
            body: JSON.stringify(friend)
        })
        .then(response => response.json())
        
    }
 /*
 Return a context provider other components can access the array of objects being stored in the friends variable, and can invoke the, getFriends and addFriends functions(added later).
    */
  
    
return (
    <FriendsContext.Provider value={{
        friends, getFriends, getFriendItemsById, addFriend
    }}>

        {props.children}
    </FriendsContext.Provider>
)

}