import React, {useContext, useEffect} from "react"
import {FriendsContext} from "./FriendProvider.js"
import {FriendCard} from "./FriendCard.js"
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
          {console.log("FriendsList: Render", friends)}

          {/* Return drop down with all friends and items they borrowed */}
          
            {
            friends.map((friend) => {
              //   key and friend become properties on the object passed in as in argument
              return <FriendCard key={friend.id} friend={friend} />
            })
        }
        </div>
      )
    } 
