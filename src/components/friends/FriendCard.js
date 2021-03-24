import React from "react"
import "./Friend.css"


export const FriendCard = ({friend}) => {
    
   return (
   <div className="friendItems">
        <h3 className="friend__name">{friend?.friendName}</h3>
        <p className="friend__item">{friendItem?.itemName}</p>
    </div>
   )
}