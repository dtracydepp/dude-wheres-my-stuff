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

  // when changes(friendselected), useEffect invoked--api call to getItemsByFriendID, passed selectedFriend object as a variable to get the friendId of the selected friend??
  useEffect(() => {
    getItemsByFriendId(selectedFriend)

// not sure why here?
  }, [selectedFriend])

  // when a friend is selected, I'm getting the value (friendId) of the selected friend
  const handleInputChange = (event) => {
    // invoked setSelectedFriend update function when friend is selected from dropdown
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
          {/* map method on friends array, friend object passed to add key value pair to of friend id to object. */}
          {friends.map((fr) =>
          // 
            <option key={fr.id} value={fr.id}>{fr.friendName}</option>)
          }
        </select>
        {
          // map method on friendItems array to add key value pair to item object
          friendItems.map((item) => {

            //   key and item become properties on the object passed in as in argument
            return <ItemCard key={item.id} item={item} />
          })
        }


      </div>
    </>
  )

}