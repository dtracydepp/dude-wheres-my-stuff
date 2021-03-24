import React from "react"


export const LogoutBtn = (props) => {
      
    sessionStorage.clear()

    return (
        <>
            <button
           onClick={() => props.history.push("/login")}>
                Logout
            </button>
        </>
    )
}
