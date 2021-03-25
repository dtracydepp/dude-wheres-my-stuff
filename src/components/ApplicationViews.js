import React from "react"
import { Route } from "react-router-dom"
import { ItemProvider } from "./items/ItemProvider.js"
import { ItemList } from "./items/ItemList.js"
import { SortFriends } from "../components/sort/SortButton.js"
import { FriendProvider } from "./friends/FriendProvider.js"
import { FriendSelect } from "./friends/FriendSelect.js"
import { ItemDetail } from "./items/ItemDetail.js"
import { ItemForm } from "./items/ItemForm.js"
import { FriendForm } from "./friends/FriendForm.js"
import { NoteForm } from "./notes/NoteForm"
import { LogoutBtn } from "./logout/Logout.js"

export const ApplicationViews = () => {
    return (
        <>
            {/* Render the item list when http://localhost:3000/ */}
            <ItemProvider>
                <FriendProvider>
                    <Route exact path="/">
                        <ItemList />
                    </Route>
                    {/* Renders Item form when at http://localhost:300/items */}
                    <Route exact path="/items">
                        <ItemForm />
                    </Route>
                    {/* Renders ItemDetail form when at http://localhost:300/items/detail  */}
                    {/* itemId will not show up in the URL,it is the parameter passed on the URL. /d+ is at the end to serve as a a variable to hold the actual value that be in the URL ex. /items/1. 1 is stored in itemId variable to be used and accessed in the comp.  */}
                    <Route exact path="/items/detail/:itemId(\d+)">
                        <ItemDetail />
                    </Route>
                    {/* Renders ItemForm when at http://localhost:300/items/edit  */}
                    <Route path="/items/edit/:itemId(\d+)">
                        <ItemForm />
                    </Route>
                    {/* Renders NoteForm when at http://localhost:300/items/create  */}
                    <Route path="/items/create/:itemId(\d+)">
                        <NoteForm />
                    </Route>
                </FriendProvider>
            </ItemProvider>


            <FriendProvider>
                <ItemProvider>
                    {/* Renders FriendForm when at http://localhost:300/friends  */}
                    <Route exact path="/friends">
                        <FriendForm />
                    </Route>
                    {/* Renders FriendSelect"dropdown" when at http://localhost:300/allfriends  */}
                    <Route exact path="/allfriends">
                        <FriendSelect />

                    </Route>
                    {/* on "home page" SortFriends function returns sort by friend button that pushes to "/allfriends" */}
                    <Route exact path="/" render={props => <SortFriends {...props} />}>
                    </Route>
                    {/* LogoutBtn function returns logout button and invokes sessionStorage.clear method then pushes to "/login" */}
                    <Route exact path="/logout" render={props => <LogoutBtn {...props} />}>
                    </Route>
                </ItemProvider>
            </FriendProvider>


        </>
    )
}