import React, { useContext, useEffect, useState } from "react"
import { ItemsContext } from "../items/ItemProvider.js"
import { useHistory, useParams } from 'react-router-dom';


export const NoteForm = () => {
  const {getItems, addNote } = useContext(ItemsContext)
  const userId = parseInt(sessionStorage.getItem("app_user_id"))
  const {itemId} = useParams()
  /*
EVERYTIME STATE IS UPDATED THE COMP WILL RE-RENDER
Define the intial state of the note form inputs with useState(). note(object) is the state variable, setNote is the update function that holds the state of note. 
*/

  const [note, setNote] = useState({
    note: "" 
  });

  const history = useHistory();

  /*
  Reach out to the world and get items state on initialization,runs one time. Passing userId so data will be specific to user logged in
  */
  useEffect(() => {
    getItems(userId)
  }, [])

 //when a field changes, update state. The return will re-render and display based on the values in state
        
    //Controlled component --what the user is typing is being saved as it is typed and updating state.
    const handleControlledInputChange = (event) => {
        /* When changing a state object or array,
        always create a copy, make changes, and then set state.*/
        const newNote = {...note}
        let selectedVal = event.target.value
        // forms always provide values as strings. But we want to save the ids as numbers. This will cover both item and friend ids
        if (event.target.id.includes("id")) {
          selectedVal = parseInt(selectedVal)
        }
        /* note is an object with properties.
        Set the property to the new value
        using object bracket notation. */
        newNote[event.target.id] = selectedVal
        // update state with setNote and passing newNote
        setNote(newNote)
      }
  
      const handleClickSaveNewNote = (event) => {
        event.preventDefault() //Prevents the browser from submitting the form

          //invoke addNote passing note and itemId arguments. So the new note added will be specific to the item selected
          //once complete, change the url and display the friend list
          addNote(note,itemId)
          .then(() => history.push(`/items/detail/${itemId}`))
        }
      
      return (
        <form className="itemForm">
            <fieldset>
                <div className="form-group">
                    <label htmlFor="itemNote">Note:</label>
                    <input type="text" id="note" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="item note" value={note.note}/>
                </div>
            </fieldset>
            
            <button className="btn btn-primary"
              onClick={handleClickSaveNewNote}>
              Save New Note
            </button>
        </form>
      )
  }