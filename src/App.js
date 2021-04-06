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
            <img className="logo" src="DWMS_LOGO.png" alt="DWMS-Logo"/>
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