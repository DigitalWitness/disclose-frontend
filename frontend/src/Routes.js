import React from "react";
import { Route, Switch } from "react-router-dom";
import Admin from "./Admin"
import Login from "./Login"
import Home from "./Home";

export default () =>
  <Switch>
    <Route path="/login" exact component={Login}/>
    <Route path="/admin" exact component={Admin}/>
    <Route path="/" exact component={Home} />
  </Switch>;
