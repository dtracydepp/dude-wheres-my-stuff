import { Route, Redirect } from "react-router-dom"
import { Login } from "./components/auth/Login.js"
import { Register } from "./components/auth/Register.js"
import { userStorageKey } from "./components/auth/authSettings.js"
import './App.css';

export const App = () => (
  
  <>

<Route render={() => {
        if (sessionStorage.getItem(userStorageKey)) {
          return (
            <>
              <h3>dude, where's my stuff?</h3>
            </>
          )
        } else {
          return <Redirect to="/login" />;
        }
    }} />

    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>

</>
);