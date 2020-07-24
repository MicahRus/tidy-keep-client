import React from "react";
import { Redirect } from 'react-router-dom'

class CreateAddress extends React.Component {
  state = {
    street_address: "",
    post_code: "",
    state: "VIC",
    redirect: null,
    data: this.props.location.state.data,
    addresses: [],
    userChoice: 0
   
  };


    componentDidMount() {
      this.getAddressData()
    }

  getAddressData = async () => {
    console.log('hit');
    const response = await fetch(`${process.env.REACT_APP_API}/addresses`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    const data = await response.json()
    this.setState({ addresses: data })
    // this.setState({ userChoice: 3 })
  }


    deleteAddress = async (id) => {
    await fetch(`http://localhost:3000/addresses/${id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    this.getAddressData()
  }

 renderAddresses = () => {
    return this.state.addresses.map((address, index) => {
      return (
<div key={index}>
          <form onClick={this.addressOnClick}>
            <button key={index} value = {address.id} className ="address">  <h3>{address.street_address} {address.post_code} {address.state}  </h3> 
          </button>
           </form>
          <div className="delete-container">
            <span onClick={() => this.deleteAddress(address.id)}>Delete</span>
          </div>
          <hr />
        </div>
      );
    });
  };


  addressOnClick = (event) => {
    event.preventDefault();
    this.setState(
      { userChoice: event.target.value },
      () => {
      console.log("address on click " + this.state.userChoice);
      console.log(JSON.stringify(this.state.data));
      console.log("what is this object " + this.state.data);

    }
    );
    
  };


  

  onInputChange = (event) => {

    this.setState({
      [event.target.id]: event.target.value,
    });
    console.log("onInput change  " + this.state.userChoce)
  };

  handleChange = (event) => {
    this.setState({ 
      state: event.target.value,
    });
    console.log('on handle change ' + this.state.userChoice)
  };


  form = () => {
    return (
     <div className="container">
        <h1>Add a new address</h1>
        <form onSubmit={this.onFormSubmit}>
          <label htmlFor="name">Street Address</label>
          <input
            type="text"
            name="street_address"
            id="street_address"
            onChange={this.onInputChange}
          />

          <label htmlFor="post_code">Post code</label>
          <textarea
            name="post_code"
            id="post_code"
            onChange={this.onInputChange}
          ></textarea>
          <label htmlFor="state"> State</label>
          <select defaultValue={this.state.value} onChange={this.handleChange}>
            <option value="VIC">VIC</option>
            <option value="TAS">Tasmania</option>
            <option value="NSW">NSW</option>
            <option value="ACT">ACT</option>
            <option value="WA">WA</option>
          </select>
          <input type="submit" value="Submit" />
        </form>
      </div>

    );
  };

  onFormSubmit = async (event) => {
    event.preventDefault();

    await fetch(`${process.env.REACT_APP_API}/addresses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ address: this.state }),
    });
    this.setState({ redirect: "/Confirm" });
  };

  // why is there a commar after state

  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: this.state.redirect,
            state: { data: this.state },
          }}
        />
      );
    }
    return (
      <>
      <h1>Select your address or add a new address!</h1>
<div>
  {this.renderAddresses()}
  </div>
               <div>{this.form()}</div>

</>

    );
  }
}
export default CreateAddress;
