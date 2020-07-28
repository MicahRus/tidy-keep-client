import React from "react";
import { Form, Segment } from 'semantic-ui-react'
import { Redirect, Switch, Route } from 'react-router-dom'


class Login extends React.Component {
  state = { email: "", password: "", errMessage: "", redirect: "" };

  onInputChange = (event) => {
    const key = event.target.id;
    this.setState({
      [key]: event.target.value,
    });
  };

  onFormSubmit = async (event) => {
    event.preventDefault();
    
    const { email, password } = this.state;
    const body = {
      auth: { email, password },
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (response.status >= 400) {
        throw new Error("incorrect credentials");
      } else {
        const { jwt } = await response.json();
        localStorage.setItem("token", jwt);
        this.setState({ redirect: "/" });
      }
    } catch (err) {
      this.setState({
        errMessage: err.message,
      });
    }
  };

  render() {
    const { email, password, errMessage } = this.state;
    if (this.state.redirect) {
      // Refreshes the page when moved back onto the next page (To show the logout button)
      setTimeout(function(){window.location.reload();},10)
      return (
        <Switch>
          <Redirect from='/Login' to='/' />
          <Route exact path='/' />
        </Switch>
      )
    }
    return (
      <div className="form-container">
        <Segment stacked>
        <h1 className="login">Login</h1>
        {errMessage && <span>{errMessage}</span>}
       <Form onSubmit={this.onFormSubmit}> 
          <Form.Field>
            <label>Email</label>
          <input
            type="email"
            className="email"
            id="email"
            value={email}
            onChange={this.onInputChange}
          />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
          <input
            type="password"
            className="password"
            id="password"
            value={password}
            onChange={this.onInputChange}
          />
          </Form.Field>
          <Form.Button className ="form-button" value= "Submit">Submit</Form.Button>
    </Form>
    </Segment>
   
      </div>
        
    );
  }
}

export default Login;