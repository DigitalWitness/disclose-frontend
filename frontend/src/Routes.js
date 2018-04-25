import React from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "./Auth"
import Admin from "./Admin"
import Login from "./Login"
import UserProfile from "./UserProfile"
import SubmissionFeed from "./SubmissionFeed";
import SubmissionDetail from "./SubmissionDetail";
import { withRouter } from "react-router-dom";

export function requireAuth(Component) {

  class AuthenticatedComponent extends React.Component {

    componentWillMount() {
      this.checkAuth();
    }

    checkAuth() {
      if ( ! Auth.isUserAuthenticated()) {
        console.log("User not authenticated");
      }
    }

    render() {
      return Auth.isUserAuthenticated()
        ? <Component { ...this.props } />
        : <h1> You cannot access this page. </h1>;
    }
  }
  return withRouter(AuthenticatedComponent);
}

export default () =>
  <Switch>
    <Route path="/login" exact component={Login}/>
    <Route path="/admin" exact component={requireAuth(Admin)}/>
    <Route path="/feed" exact component={requireAuth(SubmissionFeed)}/>
    <Route path="/detail" exact component={requireAuth(SubmissionDetail)}/>
    <Route path="/profile" exact component={requireAuth(UserProfile)}/>
    <Route path="/" exact component={Login} />
  </Switch>;
