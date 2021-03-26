import React, { useContext, useEffect, useState } from "react"
import { useHistory } from 'react-router-dom';
import { FriendsContext } from "../friends/FriendProvider.js";

export const FriendForm = () => {
  // Need the (getFriends--not using it but don't want to remove before review) and addFriend data stored from fetch to use in this comp
  const { getFriends, addFriend } = useContext(FriendsContext)
  const userId = parseInt(sessionStorage.getItem("app_user_id"))

  /*EVERYTIME STATE IS UPDATED THE COMP WILL RE-RENDER
Define the intial state of the friend form inputs with useState(). "friend(object with properties) is state variable, setFriend is the update function.
*/
// useState will hold and set the state of the friend object. friend will hold the data, setFriend will modify the state of the friend object when invoked.
  const [friend, setFriend] = useState({
    id: 0,
    friendName: "",
    userId: userId

  });
// useHistory hook allows me to tell React which route
  const history = useHistory();

  /*
  Not using but scared to removed it before code review. Reach out to the world and get friends state
   on initialization, runs one time. dependency array is empty only runs first time the comp renders
  */
  // useEffect(() => {
  //   getFriends()
  // }, [])

  //when a field changes, update state. The return will re-render and display based on the values in state

  //Controlled component
  const handleControlledInputChange = (event) => {
    /* When changing a state object or array,
    always create a copy, make changes, and then set state.*/
    const newFriend = { ...friend }
    let selectedVal = event.target.value
    // forms always provide values as strings. But we want to save the ids as numbers. This will cover friend ids
    if (event.target.id.includes("id")) {
      selectedVal = parseInt(selectedVal)
    }
    /* Friend is an object with properties.
    Set the property to the new value
    using object bracket notation. */
    newFriend[event.target.id] = selectedVal
    // update state
    setFriend(newFriend)
  }

  const handleClickSaveNewFriend = (event) => {
    event.preventDefault() //Prevents the browser from submitting the form

    //invoke addFriend passing friend as an argument.
    //once complete, change the url and display the friend list
    addFriend(friend)
    // using useHistory to push to new route
      .then(() => history.push("/allfriends"))
  }

// returns a form to input new friend and save to database
  return (
    <form className="friendForm">
      <h2 className="friendForm__title">New Friend</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="friend">Friend Name:</label>
          <input type="text" id="friendName" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Friend name" value={friend.friendName} />
        </div>
      </fieldset>

      <button className="btn btn-primary"
        onClick={handleClickSaveNewFriend}>
        Save New Friend
            </button>
    </form>
  )
}