import React, { useContext, useEffect, useState } from "react"
import { FriendsContext } from "./FriendProvider.js"
import {FriendCard} from "./FriendCard"
import "./Friend.css"
import { useParams, useHistory } from "react-router-dom"

export const FriendSelect = () => {
  const { getFriendById } = useContext(FriendsContext)

	const [friends, setFriends] = useState({})

	const {friendId} = useParams();
	const history = useHistory();

  useEffect(() => {
    console.log("useEffect", friendId)
    getFriendById (friendId)
    .then((response) => {
      setFriends(response)
    })
    }, [])


  return (
    <div className="friends">
      <h3>My Friends</h3>
      {/* {console.log("FriendsList: Render", friends)} */}

  
   
    </div>
  )

  }