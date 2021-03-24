import React, { useContext, useEffect, useState } from "react"
import { FriendsContext } from "./FriendProvider.js"
import { ItemCard } from "../items/ItemCard.js"
import "./Friend.css"
import { ItemsContext } from "../items/ItemProvider.js"


export const FriendSelect = () => {
  const { friends, getFriends, } = useContext(FriendsContext)
  const [selectedFriend, setSelectedFriend] = useState({})
  const {getItemsByUser, friendItems} = useContext(ItemsContext)

  useEffect(() => {
    getFriends()

  }, [])

  useEffect(() => {
    getItemsByUser(selectedFriend)

  }, [selectedFriend])


  const handleInputChange = (event) => {
<<<<<<< HEAD
    const selectedFriend = { ...friend }
    let selectedVal = event.target.value
    if (event.target.id.includes("id")) {
      selectedVal = parseInt(selectedVal)
    }
    selectedFriend[event.target.id] = selectedVal
    setFriend(selectedFriend)
    // console.log(selectedFriend)
=======
    setSelectedFriend(event.target.value)
    
>>>>>>> main
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
        </select>
        { 
            friendItems.map((item) => {
              //   key and item become properties on the object passed in as in argument
              return <ItemCard key={item.id} item={item} />
            })
        } 
         

      </div>
    </>
  )

}