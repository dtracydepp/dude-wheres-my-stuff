import React from "react"
import "./Friend.css"


export const FriendCard = ({friend}) => (
    <section className="friend">
        <h3 className="friend__name">{friend.friendName}</h3>
    </section>
) 