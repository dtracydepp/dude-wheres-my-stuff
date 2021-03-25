import React, { useContext, useEffect, useState } from "react"
import { ItemsContext } from "./ItemProvider.js"
import "./Item.css"
import { useParams, useHistory } from "react-router-dom"

export const ItemDetail = () => {
    // Need the getItemById and deleteItem data stored from fetch to use in this comp
  const { getItemById, deleteItem } = useContext(ItemsContext)

// useState will hold and set the state of the items object. items will hold the data, setItems will modify the state of the items object when invoked.
  const [items, setItems] = useState({})

  // useParams hook that allows me to extract value of the parameter from the URL, here I need the value of itemId
  const { itemId } = useParams();
  // useHistory hook allows me to tell React which route
  const history = useHistory();


  // function to delete item object
  const handleDelete = () => {
    // delteItem function and passing the item.id so only the item on the item card selected will be deleted.
    deleteItem(items.id)
      .then(() => {
        // using useHistory to push to new route
        history.push("/")
      })
  }

//  useEffect invoked--api call to getItemsById, passed itemId to get the value of the itemid 
  useEffect(() => {
    getItemById(itemId)
      .then((response) => {
        // setItems update function invoked to update state.
        setItems(response)
      })
  }, [])
  return (
    <section className="item">
      <h3 className="item__name">{items.itemName}</h3>
      <div className="item__description">Description: {items.description}</div>
      <div className="friend__name">Who Has My Stuff: {items.friend?.friendName}</div>
      <div className="item__note">Note: { items?.note }</div>
      <button onClick={() => { history.push(`/items/create/${items.id}`) }}>
        Add Note
          </button>
      <button onClick={() => {
        history.push(`/items/edit/${items.id}`)
      }}>Edit Item</button>
      <button onClick={handleDelete}>
        Delete Item
          </button>

    </section>
  )
}
