import React from "react"
import "./Item.css"
// import {Link} from "react-router-dom"

export const ItemCard = ({item}) => (
    <section className="item">
        <h3 className="item__name">{item.itemName}</h3>
        <div className="item__description">{item.description}</div>
    </section>
) 