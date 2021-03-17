import React from "react"
import "./Item.css"
import {Link} from "react-router-dom"

export const ItemCard = ({item}) => (
    <section className="items">
          <h3 className="item__name">
        <Link to={`/items/detail/${item.id}`}>
          { item.itemName }
        </Link>
    </h3>
    <div className="item__description">{item.description}</div>
    </section>
) 