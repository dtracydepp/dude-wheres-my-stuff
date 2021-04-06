//   ItemList which renders individual item objects as HTML

import React, { useContext, useEffect } from "react"
import { ItemsContext } from "./ItemProvider.js"
import { ItemCard } from "./ItemCard.js"
import "./Item.css"
import { useHistory } from "react-router-dom"

export const ItemList = () => {
  const userId = parseInt(sessionStorage.getItem("app_user_id"))

  //  // Not using..The useHistory hook tells React which route to visit. Tells React to render the item form component(not added yet).
  // const history = useHistory()

  // Need the items and getItems data stored from fetch to use in this comp
  const { items, getItems } = useContext(ItemsContext)


  //useEffect - reach out to the world for something - API call for the items, invoking; will only run one time at intial render because array is empty. passing userid so that only items for logged in user displays.
  useEffect(() => {
    getItems(userId)

  }, [])

// returns ItemCard with list of items borrowed
  return (
    <div className="items__list">
      <h2>Where's My Stuff?</h2>
      {/* map method on items array to add key value pair to item object */}
      {
        items.map((item) => {
          //   returning ItemCard and passing the item oject to the comp
          return <ItemCard key={item.id} item={item} />
        })
      }
    </div>
  )
}
