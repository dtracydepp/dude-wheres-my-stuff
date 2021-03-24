import React, { useContext, useEffect, useState } from "react"
import { ItemsContext } from "../items/ItemProvider.js"
import { useHistory } from 'react-router-dom';
import { FriendsContext } from "../friends/FriendProvider.js";

export const ItemForm = () => {
  const {items, getItems, addItem } = useContext(ItemsContext)
  const {friends, getFriends} = useContext(FriendsContext)
 
  /*
With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.
Define the intial state of the form inputs with useState()
*/

  const [item, setItem] = useState({
    itemName: "",
    description: "",
    note: "",
    id: 0,
    friendId: 0
  });

  const history = useHistory();

  /*
  Reach out to the world and get items state
  and friends state on initialization
  */
  useEffect(() => {
    getItems().then(getFriends)
  }, [])

 //when a field changes, update state. The return will re-render and display based on the values in state
        
    //Controlled component
    const handleControlledInputChange = (event) => {
        /* When changing a state object or array,
        always create a copy, make changes, and then set state.*/
        const newItem = { ...item }
        let selectedVal = event.target.value
        // forms always provide values as strings. But we want to save the ids as numbers. This will cover both item and friend ids
        if (event.target.id.includes("id")) {
          selectedVal = parseInt(selectedVal)
        }
        /* Item is an object with properties.
        Set the property to the new value
        using object bracket notation. */
        newItem[event.target.id] = selectedVal
        // update state
        setItem(newItem)
      }
  
      const handleClickSaveNewItem = (event) => {
        event.preventDefault() //Prevents the browser from submitting the form
        
        const friendId = item.friendId
        
  
        if (friendId === 0 ) {
          window.alert("Please select a friend")
        } else {
          //invoke addItem passing item as an argument.
          //once complete, change the url and display the item list
          addItem(item)
          .then(() => history.push("/"))
        }
      }
  
      return (
        <form className="itemForm">
            <h2 className="itemForm__title">New Item</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Item:</label>
                    <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Item name" value={item.itemName}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="desciption">Description:</label>
                    <input type="text" id="description" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="item description" value={item.description}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="note">Note:</label>
                    <input type="text" id="note" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="item note" value={item.note}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Assign to friend: </label>
                    <select value={item.friendId} name="friendId" id="friendId" onChange={handleControlledInputChange} className="form-control" >
                        <option value="0">Select a friend</option>
                        {friends.map(f => (
                            <option key={f.id} value={f.id}>
                                {f.friendName}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <button className="btn btn-primary"
              onClick={handleClickSaveNewItem}>
              Save New Item
            </button>
        </form>
      )
  }