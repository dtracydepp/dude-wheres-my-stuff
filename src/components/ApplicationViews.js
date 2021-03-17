import React from "react"
import { Route } from "react-router-dom"
import { ItemProvider } from "./items/ItemProvider.js"
import { ItemList } from "./items/ItemList.js"
import { SortFriends } from "../components/sort/SortButton.js"
import { FriendProvider } from "./friends/FriendProvider.js"
import { FriendList } from "./friends/FriendList.js"
import { ItemDetail } from "./items/ItemDetail.js"

export const ApplicationViews = () => {
    return (
        <>
            {/* Render the item list when http://localhost:3000/ */}
            <ItemProvider>
                <FriendProvider>
                <Route exact path="/">
                    <ItemList />
                </Route>

                <Route exact path="/items/detail/:itemId(\d+)">
                    <ItemDetail />
                </Route>
                </FriendProvider>
            </ItemProvider>

            <Route exact path="/" render={props => <SortFriends {...props} />} />

            <Route exact path="/items">

            </Route>

            <FriendProvider>
                <Route exact path="/allfriends">
                    <FriendList />
                </Route>


            </FriendProvider>
        </>
    )
}