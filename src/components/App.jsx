import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import NavBar from './NavBar';
import Landing from './Landing';



class App extends React.Component {
  render() {
    return (
      <>
        <NavBar />
        <Switch>
          {/* <ProtectedRoute exact path="/secrets" component={Secrets} /> */}
\          <Route exact path="/" component={Landing} />
          {/* <Route component={NoMatch} /> */}
        </Switch>
      </>
    );
  }
}


export default App;
