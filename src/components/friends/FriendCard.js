import React from "react"
import "./Friend.css"
import {ItemsContext} from "../items/ItemProvider.js"
import {useContext, useEffect} from "react"



export const FriendCard = ({friend}) => {
    
   return (
   <div className="friendItems">
        <h3 className="friend__name">{friend?.friendName}</h3>
        <p className="friend__item">{friendItem?.itemName}</p>
    </div>
   )
}