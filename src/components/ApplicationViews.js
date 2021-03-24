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

export const ApplicationViews = () => {
    return (
        <>
            {/* Render the item list when http://localhost:3000/ */}
            <ItemProvider>
                <FriendProvider>
                    <Route exact path="/">
                        <ItemList />
                    </Route>

                    <Route exact path="/items">
                        <ItemForm />
                    </Route>


                    <Route exact path="/items/detail/:itemId(\d+)">
                        <ItemDetail />
                    </Route>

                    <Route path="/items/edit/:itemId(\d+)">
                        <ItemForm />
                    </Route>

                    <Route path="/items/create">


                    </Route>
                </FriendProvider>
            </ItemProvider>


            <FriendProvider>
                <ItemProvider>

                    <Route exact path="/friends">
                        <FriendForm />
                    </Route>

                    <Route exact path="/allfriends">
                        <FriendSelect />

                    </Route>

                    <Route exact path="/" render={props => <SortFriends {...props} />}>
                    </Route>

                </ItemProvider>
            </FriendProvider>


        </>
    )
}