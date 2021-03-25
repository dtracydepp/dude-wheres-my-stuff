import React, { useContext, useEffect, useState } from "react"
import { FriendsContext } from "./FriendProvider.js"
import { ItemCard } from "../items/ItemCard.js"
import "./Friend.css"
import { ItemsContext } from "../items/ItemProvider.js"


export const FriendSelect = () => {
  const { friends, getFriends, } = useContext(FriendsContext)
  // EVERYTIME STATE IS UPDATED THE COMP WILL RE-RENDER
  // useState will hold and set the state of the selectedFriend object. SelectedFriend will hold the data, setSelectedFriend will modify the state of the selectedFriend object when invoked.
  const [selectedFriend, setSelectedFriend] = useState({})
    // Need the getItemByFriendId and friendItems data stored from fetch to use in this comp
    
  const { getItemsByFriendId, friendItems } = useContext(ItemsContext)
  const userId = parseInt(sessionStorage.getItem("app_user_id"))

  // intial load--api call to getFriends, runs only one time.Passing userId so data will be specific to user logged in, dependency array is empty, will only run the first time the comp renders.
  useEffect(() => {
    getFriends(userId)

  }, [])

  // when changes(friendselected), useEffect invoked--api call to getItemsByFriendID, passed selectedFriend state variable.
  useEffect(() => {
    getItemsByFriendId(selectedFriend)

// will run anytime the data changes, friend selected
  }, [selectedFriend])

  // when a friend is selected, I'm getting the value (friendId) of the selected friend
  const handleInputChange = (event) => {
    // invoked setSelectedFriend update function when friend is selected from dropdown, value is id of the friend
    setSelectedFriend(event.target.value)

  }


// returning dropdown box with friends, adding friendID to objects in array and when selected ItemCard is returned 
  return (
    <>
      <div className="friends">
        <h3>My Friends</h3>
        <select value="0" id="friendId" className="form-control" onChange={handleInputChange} >
          <option value="0">Select a friend</option>
          {/*  */}
          {/* map method on friends array, each time I map through grab the id of the friend from the object. */}
          {friends.map((fr) =>
          // 
            <option key={fr.id} value={fr.id}>{fr.friendName}</option>)
          }
        </select>
        {
          // map method on friendItems array to add key value pair to item object
          friendItems.map((item) => {

            //  returning ItemCard and passing the item oject to the comp 
            return <ItemCard key={item.id} item={item} />
          })
        }


      </div>
    </>
  )

}