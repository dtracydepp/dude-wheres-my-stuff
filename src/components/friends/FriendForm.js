import React, { useContext, useEffect, useState } from "react"
import { useHistory } from 'react-router-dom';
import { FriendsContext } from "../friends/FriendProvider.js";

export const FriendForm = () => {
  const {getFriends, addFriend } = useContext(FriendsContext)
  const userId = parseInt(sessionStorage.getItem("app_user_id"))
 
  /*
With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.
Define the intial state of the form inputs with useState()
*/

  const [friend, setFriend] = useState({
    id: 0,
    friendName: "",
    userId: userId
   
  });

  const history = useHistory();

  /*
  Reach out to the world and get friends state
   on initialization
  */
  useEffect(() => {
    getFriends()
  }, [])

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
          .then(() => history.push("/allfriends"))
        }
      
  
      return (
        <form className="friendForm">
            <h2 className="friendForm__title">New Friend</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="friend">Friend Name:</label>
                    <input type="text" id="friendName" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Friend name" value={friend.friendName}/>
                </div>
            </fieldset>
           
            <button className="btn btn-primary"
              onClick={handleClickSaveNewFriend}>
              Save New Friend
            </button>
        </form>
      )
  }