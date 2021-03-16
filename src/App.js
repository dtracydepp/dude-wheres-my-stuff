import { Route, Redirect } from "react-router-dom"
import { Login } from "./components/auth/Login.js"
import { Register } from "./components/auth/Register.js"
import { userStorageKey } from "./components/auth/authSettings.js"
import {ApplicationViews} from "./components/ApplicationViews.js"
import {NavBar} from "./components/nav/NavBar.js"
import './App.css';

export const App = () => (
  <>

<Route render={() => {
        if (sessionStorage.getItem(userStorageKey)) {
          return (
            <>
            <h3>dude, where's my stuff?</h3>
           <NavBar />
          <ApplicationViews />
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