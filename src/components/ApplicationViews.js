import React from "react"
import { Route } from "react-router-dom"
import {ItemProvider} from "./items/ItemProvider.js"
import {ItemList} from "./items/ItemList.js"

export const ApplicationViews = () => {
    return (
        <>
            {/* Render the location list when http://localhost:3000/ */}
            <ItemProvider>
                <Route exact path="/">
                    <ItemList />
                </Route>
            </ItemProvider>



        </>
    )
}