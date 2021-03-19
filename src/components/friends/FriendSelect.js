import React, { useContext, useEffect, useState } from "react"
import { FriendsContext } from "./FriendProvider.js"
import { FriendCard } from "./FriendCard"
import "./Friend.css"
import { useParams, useHistory } from "react-router-dom"

export const FriendSelect = () => {
  const { friends, getFriends, getFriendById } = useContext(FriendsContext)


  const { friendId } = useParams();
  const history = useHistory();

  useEffect(() => {
    getFriends()

}, [])

 
  // useEffect(() => {

  //   console.log("useEffect", friendId)
  //   getFriendById(friendId)
  //     .then((response) => {
  //       setFriends(response)
  //     })
  // }, [])


  return (
    <>
    <div className="friends">
      <h3>My Friends</h3>
      {/* {console.log("FriendsList: Render", friends)} */}
      <select>
      <option value="0">Select a friend</option>
                {friends.map((friend) =>
        <option key={friend.id}>{friend.friendName}</option>

    )}
             </select>

    </div>
    </>
  )

}