import React, { useContext, useEffect, useState } from "react"
import { FriendsContext } from "./FriendProvider.js"
import { FriendCard } from "./FriendCard"
import "./Friend.css"


export const FriendSelect = () => {
  const { friends, getFriends } = useContext(FriendsContext)
  const [friend, setFriend] = useState({})

  useEffect(() => {
    getFriends()

  }, [])


  const handleInputChange = (event) => {
    const selectedFriend = { ...friend }
    let selectedVal = event.target.value
    if (event.target.id.includes("id")) {
      selectedVal = parseInt(selectedVal)
    }
    selectedFriend[event.target.id] = selectedVal
    setFriend(selectedFriend)
    // console.log(selectedFriend)
  }



  return (
    <>
      <div className="friends">
        <h3>My Friends</h3>
        <select value="0" id="friendId" className="form-control" onChange={handleInputChange} >
          <option value="0">Select a friend</option>
          {friends.map((fr) =>
          <option key={fr.id} value={fr.id}>{fr.friendName}</option>)
        } 
        <FriendCard key={friend.id} friend={friend}/>
       
         
        </select>

      </div>
    </>
  )

}