import React from "react"
import "./Friend.css"
import {ItemsContext} from "../items/ItemProvider.js"
import {useContext, useEffect} from "react"



export const FriendCard = ({friend}) => {
    const { items, getItems } = useContext(ItemsContext)
    useEffect(() => {
        getItems()
    
      }, [])
    
      
      const friendItem = items.find(it =>it.friendId === friend.id)
    //   debugger
   return (
   <section className="friendItems">
        <h3 className="friend__name">{friend?.friendName}</h3>
        <p className="friend__item">{friendItem?.itemName}</p>
    </section>
   )
}