import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import NavBar from './NavBar';
import Landing from './Landing';
import Login from './Login'
import SignUp from './SignUp'



class App extends React.Component {
  render() {
    return (
      <>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Landing} />
<Route exact path="/Login" data-testid="login" component={Login} />
<Route exact path="/SignUp" data-testid="sign-up" component={SignUp} />
        </Switch>
      </>
    );
  }
}


export default App;
