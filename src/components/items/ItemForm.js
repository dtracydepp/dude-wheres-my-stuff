// used to save, add or edit item

import React, { useContext, useEffect, useState } from "react"
import { ItemsContext } from "../items/ItemProvider.js"
import { useHistory, useParams } from 'react-router-dom';
import { FriendsContext } from "../friends/FriendProvider.js";

export const ItemForm = () => {
    // Need data stored from fetch to use in this comp
  const { getItems, addItem, updateItem, getItemById } = useContext(ItemsContext)
  const { friends, getFriends } = useContext(FriendsContext)
  
  const userId = parseInt(sessionStorage.getItem("app_user_id"))

  /*EVERYTIME STATE IS UPDATED THE COMP WILL RE-RENDER
Define the intial state of the Item form inputs with useState(). item is state variable, setItem is the update function.
*/
// useState will hold and set the state of the item object. item will hold the data, setItem will modify the state of the item object when invoked.
  const [item, setItem] = useState({
    id: 0,
    itemName: "",
    description: "",
    note: "",
    friendId: 0,
    userId: userId

  });
  //isLoading starts as true when page loads
  const [isLoading, setIsLoading] = useState(true);

 // useParams hook that allows me to extract value of the parameter from the URL, here I need the value of itemId
  const { itemId } = useParams();

  // useHistory hook allows me to tell React which route
  const history = useHistory();

  /*
  Reach out to the world and get items state
  and friends state on initialization
  */


  // api call to getItems and then getFriends (userId passed to get only loggin in user data), If itemId is in the URL, invoke getItemById
  useEffect(() => {
    getItems(userId).then(getFriends(userId)).then(() => {
      if (itemId) {
        getItemById(itemId)
        // giving whatever I grabbed from the database
          .then(item => {
            setItem(item)
            // isLoading state variable set to false so button can't be clicked
            setIsLoading(false)
          })
      } else {
        setIsLoading(false)
      }
    })
  }, [])

  //when a field changes, update state. The return will re-render and display based on the values in state

  //Controlled component ---anytime input is changed, create an item based on previous state
  const handleControlledInputChange = (event) => {
    /* When changing a state object or array,
    always create a copy, make changes, and then set state.*/
    const newItem = { ...item }
    // input being typed is grabbing the value 
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

    const friendId = item.friendId


    if (friendId === 0) {
      window.alert("Please select a friend")
    } else {
      //disable the button - no extra clicks
      setIsLoading(true);
      // This is how we check for whether the form is being used for editing or creating. If the URL that got us here has an id number in it, we know we want to update an existing record of an item
      if (itemId) {
        //PUT - update ---more comments
        updateItem({
          id: item.id,
          itemName: item.itemName,
          description: item.description,
          note: item.note,
          friendId: parseInt(item.friendId),
          userId: parseInt(sessionStorage.getItem("app_user_id"))
        })
             // using useHistory to push to new route
          .then(() => history.push(`/items/detail/${item.id}`))
      } else {
        //POST - add
        //invoke addItem passing item as an argument.
        //once complete, change the url and display the item list
        addItem(item)
             // using useHistory to push to new route
          .then(() => history.push("/"))
      }

    }
  }

  // returns a item form to input item info an save or add new item
  return (
    <form className="itemForm">
      <h2 className="itemForm__title">New Item</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="item">Item:</label>
          <input type="text" id="itemName" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Item Name" value={item.itemName} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="desciption">Description:</label>
          <input type="text" id="description" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Item Description" value={item.description} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="note">Note:</label>
          <input type="text" id="note" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Item Note" value={item.note} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="location">Assign to friend: </label>
          <select value={item.friendId} name="friendId" id="friendId" onChange={handleControlledInputChange} className="form-control" >
            <option value="0">Select a friend</option>
            {/*map method on friends array, each time I map through grab the id of the friend from the object.*/}
            {friends.map(f => (
              <option key={f.id} value={f.id}>
                {f.friendName}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <button className="btn btn-primary"
    
        disabled={isLoading}
        onClick={event => {
          event.preventDefault() // Prevent browser from submitting the form and refreshing the page
          handleClickSaveNewItem()
        }}>
        {itemId ? "Save New Item" : "Add New Item"}</button>

    </form>
  )
}
