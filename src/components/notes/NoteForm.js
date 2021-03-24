import React, { useContext, useEffect, useState } from "react"
import { ItemsContext } from "../items/ItemProvider.js"
import { useHistory, useParams } from 'react-router-dom';


export const NoteForm = () => {
  const {getItems, addNote } = useContext(ItemsContext)
  const userId = parseInt(sessionStorage.getItem("app_user_id"))
  const {itemId} = useParams()
  /*
With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.
Define the intial state of the form inputs with useState()
*/

  const [note, setNote] = useState({
    note: "" 
  });

  const history = useHistory();

  /*
  Reach out to the world and get items state on initialization.
  */
  useEffect(() => {
    getItems()
  }, [])

 //when a field changes, update state. The return will re-render and display based on the values in state
        
    //Controlled component
    const handleControlledInputChange = (event) => {
        /* When changing a state object or array,
        always create a copy, make changes, and then set state.*/
        const newNote = {...note}
        let selectedVal = event.target.value
        // forms always provide values as strings. But we want to save the ids as numbers. This will cover both item and friend ids
        if (event.target.id.includes("id")) {
          selectedVal = parseInt(selectedVal)
        }
        /* Item is an object with properties.
        Set the property to the new value
        using object bracket notation. */
        newNote[event.target.id] = selectedVal
        // update state
        setNote(newNote)
      }
  
      const handleClickSaveNewNote = (event) => {
        event.preventDefault() //Prevents the browser from submitting the form

          //invoke addNote passing note as an argument.
          //once complete, change the url and display the friend list
          addNote(note,itemId)
          .then(() => history.push("/"))
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