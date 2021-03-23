import React, { useContext, useEffect, useState } from "react"
import { FriendsContext } from "./FriendProvider.js"
import { FriendCard } from "./FriendCard"
import { ItemsContext } from "../items/ItemProvider.js"
import "./Friend.css"
import {useHistory } from "react-router-dom"

export const FriendSelect = () => {
  const { friends, getFriends} = useContext(FriendsContext)
  const { items, getItems } = useContext(ItemsContext)
  const history = useHistory();


  const [friend, setFriend] = useState({})
  useEffect(() => {
    getFriends()
      .then(getItems())

  }, [])


  const handleInputChange = (event) => {
    const selectedFriend = { ...friend }
    let selectedVal = event.target.value
    if (event.target.id.includes("id")) {
      selectedVal = parseInt(selectedVal)
    }
    selectedFriend[event.target.id] = selectedVal
    setFriend(selectedFriend)
    console.log(selectedFriend)
  }



  return (
    <>
      <div className="friends">
        <h3>My Friends</h3>
        <select value={friend.id} id="friendId" className="form-control" onChange={handleInputChange} >
          <option value="0">Select a friend</option>
          {friends.map((friend) =>
            <option key={friend.id} value={friend.id}>{friend.friendName}</option>)}
        </select>
             {/* return <FriendCard key={friend.id} item ={items}/> */}

      </div>
    </>
  )

}