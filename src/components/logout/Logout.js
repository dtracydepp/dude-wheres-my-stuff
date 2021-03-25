import React from "react"

// When the Logout link on the NavBar is clicked it routes to "/logout" then LogoutBtn function is invoked which returns a logout button using the sessionStorage.clear method to logout the user and push to "/login" page.
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
