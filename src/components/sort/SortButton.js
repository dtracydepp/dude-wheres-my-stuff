import React from "react"
import "../sort/SortButton.css"

// // SortFriends function returns a Sort by Friends button and when clicked push to "/allfriends" page.
export const SortFriends = (props) => {

    return (
        <>
            <button
            // pushes the new entry into the history stack---redirecting to another route
                onClick={() => props.history.push("/allfriends")}>
                Sort by Friends
            </button>
        </>
    )
}