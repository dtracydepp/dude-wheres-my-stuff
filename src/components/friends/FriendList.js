import React, { useContext, useEffect } from "react"
import { FriendsContext } from "./FriendProvider.js"
import { FriendCard } from "./FriendCard.js"
import "./Friend.css"
import { useHistory } from "react-router-dom"

export const FriendList = () => {

  //  // The useHistory hook tells React which route to visit. Tells React to render the friend form component (not added yet)
  const history = useHistory()

  // This state changes when `getFriends()` is invoked below
  const { friends, getFriends } = useContext(FriendsContext)

  //useEffect - reach out to the world for something - API call for the friends; will only run one time at intial render because array is empty
  useEffect(() => {
    console.log("FriendList: useEffect - getFriends")
    getFriends()

  }, [])


  return (
    <div className="friends">
      <h3>My Friends</h3>
      {/* {console.log("FriendsList: Render", friends)} */}

  
    <select>
      <option value="0">Select a friend</option>
    {/* Not sure on getting date, need to add getFriendbyId */}
      </select>
    </div>
  )

  }