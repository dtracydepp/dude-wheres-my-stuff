import React from "react"
import "../sort/SortButton.css"

export const SortFriends = (props) => {
      
    return (
        <>


            <button
            onClick={() => props.history.push("/allfriends")}>
                Sort by Friends
            </button>
        </>
    )
}