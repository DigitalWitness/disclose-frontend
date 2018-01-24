import React from "react";
import { Route, Switch } from "react-router-dom";
import Admin from "./Admin"
import Login from "./Login"
import UserProfile from "./UserProfile"
import Home from "./Home";
import SubmissionFeed from "./SubmissionFeed";
import SubmissionDetail from "./SubmissionDetail";

export default () =>
  <Switch>
    <Route path="/login" exact component={Login}/>
    <Route path="/admin" exact component={Admin}/>
    <Route path="/feed" exact component={SubmissionFeed}/>
    <Route path="/detail" exact component={SubmissionDetail}/>
    <Route path="/profile" exact component={UserProfile}/>
    <Route path="/" exact component={Login} />
  </Switch>;
