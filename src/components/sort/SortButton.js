import React, { useState, useContext, useEffect } from "react"
import { FriendsContext } from "../friends/FriendProvider.js"
import "../sort/SortButton.css"

export const SortFriends = (props) => {
    const { getFriends } = useContext(FriendsContext)
    const [friends, setFriends] = useState([])


   

   

    return (
        <>


            <button
            onClick={() => props.history.push("/allfriends")}>
                Sort by Friends
            </button>
        </>
    )
}