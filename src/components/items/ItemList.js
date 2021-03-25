import React, { useContext, useEffect } from "react"
import { ItemsContext } from "./ItemProvider.js"
import { ItemCard } from "./ItemCard.js"
import "./Item.css"
import { useHistory } from "react-router-dom"

export const ItemList = () => {
  const userId = parseInt(sessionStorage.getItem("app_user_id"))

  //  // The useHistory hook tells React which route to visit. Tells React to render the item form component(not added yet).
  const history = useHistory()

  // Need the items and getItems data stored from fetch to use in this comp
  const { items, getItems } = useContext(ItemsContext)


  //useEffect - reach out to the world for something - API call for the items, invoking getItems; will only run one time at intial render because array is empty. passing userid so that only items for logged in user displays.
  useEffect(() => {
    getItems(userId)

  }, [])


  return (
    <div className="items">
      <h3>Where's My Stuff?</h3>
      {/* add comments */}
      {
        items.map((item) => {
          //   key and item become properties on the object passed in as in argument ??
          return <ItemCard key={item.id} item={item} />
        })
      }
    </div>
  )
}
