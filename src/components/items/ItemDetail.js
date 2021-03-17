import React, { useContext, useEffect, useState } from "react"
import { ItemsContext } from "./ItemProvider.js"
import "./Item.css"
import { useParams, useHistory } from "react-router-dom"

export const ItemDetail = () => {
  const { getItemById } = useContext(ItemsContext)

	const [items, setItems] = useState({})

	const {itemId} = useParams();
	const history = useHistory();

  useEffect(() => {
    console.log("useEffect", itemId)
    getItemById (itemId)
    .then((response) => {
      setItems(response)
    })
    }, [])

  return (
    <section className="item">
      <h3 className="item__name">{items.itemName}</h3>
      {console.log(items.itemName)}
      <div className="item__description">{items.description}</div>
      {/* friends is  an arrays so use .map to get name */}
      <div className="friend__name">Who Has My Stuff: {items.friendId}</div> 
    </section>
  )
}
