import React from "react"
import "./Friend.css"
import {ItemsContext} from "../items/ItemProvider.js"
import {useContext, useState} from "react"



export const FriendCard = ({friend}) => {
    const {items} = useContext(ItemsContext)
    const friendItem = items.find((friendItem => friendItem.friendId === friend.id))
    const [item, setItem] = useState({});
    
   <section className="friendItems">
        <h3 className="friend__name">{friend?.friendName}</h3>
        <p className="friend__item">{friendItem}</p>
    </section>
}