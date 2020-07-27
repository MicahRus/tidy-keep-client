import React from "react";
import { Button, Form, Segment } from 'semantic-ui-react'




class Login extends React.Component {
  state = { email: "", password: "", errMessage: "" };

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
      const response = await fetch("http://localhost:3000/login", {
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
        this.props.history.push("");
      }
    } catch (err) {
      this.setState({
        errMessage: err.message,
      });
    }
  };

  render() {
    const { email, password, errMessage } = this.state;
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