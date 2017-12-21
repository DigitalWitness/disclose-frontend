import React from "react";
import { Route, Switch } from "react-router-dom";
import Admin from "./Admin"
import Login from "./Login"
import UserProfile from "./UserProfile"
import Home from "./Home";

export default () =>
  <Switch>
    <Route path="/login" exact component={Login}/>
    <Route path="/admin" exact component={Admin}/>
    <Route path="/home" exact component={Home}/>
    <Route path="/profile" exact component={UserProfile}/>
    <Route path="/" exact component={Login} />
  </Switch>;
