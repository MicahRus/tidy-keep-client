import React from "react";
import { Redirect } from "react-router-dom";
import { Segment, Form, Button, Icon } from "semantic-ui-react";

class CreateAddress extends React.Component {
  state = {
    street_address: "",
    post_code: "",
    state: "VIC",
    redirect: null,
    data: this.props.location.state.data,
    addresses: [],
    userChoice: null,
    selectedAddress: "",
    primaryColour: "CornflowerBlue",
  };

  componentDidMount() {
    this.getAddressData();
  }

  // pulling from address index from rails
  getAddressData = async () => {
    const response = await fetch(`${process.env.REACT_APP_API}/addresses`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    this.setState({ addresses: data });

    // If a new address is created it will set the selected button to that new address
    if (this.state.newAddress) {
      this.setState({
        // Selects the most recent address(the one just created)
        userChoice: `${data[data.length -1].id}`,
        selectedAddress: `${data[data.length - 1].street_address} ${
          data[data.length - 1].post_code
        } ${data[data.length - 1].state}`,
      });
    }
  };

// window alert to confirm before deleting, returns boolean
   confirmDelete = (id) => {
    if (window.confirm("Click OK to delete this address")) {
      this.deleteAddress(id);
    }
  }
//deletes specified address id in db
  deleteAddress = async (id) => {
    await fetch(`${process.env.REACT_APP_API}/addresses/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    this.getAddressData();
  };

  // maps through current users addresses and sets them as buttons
  renderAddresses = () => {
    return this.state.addresses.map((address, index) => {
      return (
        <div key={index}>
          <form onClick={this.addressOnClick}>
            <button
              style={this.addressStyleSelect(address.id)}
              key={index}
              value={address.id}
              className="address"
            >
              {address.street_address} {address.post_code} {address.state}
            </button>
          </form>
          <div className="delete-container">
            <button class="ui negative basic button" onClick={() => this.confirmDelete(address.id)}>
              Delete
            </button>
          </div>
          <hr />
        </div>
      );
    });
  };

  // Event handler for selecting address
  addressOnClick = (event) => {
    event.preventDefault();

    // If the event target exists this code will run
    if (event.target.value) {
      this.setState({
        userChoice: event.target.value,
        selectedAddress: event.target.innerText,
      });
      // If the event target doesn't exist(Clicking on the form wrapper, not the button) this code will run which will set the state to the values of the buttons
    } else {
      this.setState({
        userChoice: event.target[0].value,
        selectedAddress: event.target[0].innerText,
      });
    }
  };

  // If the address is selected changes the colour of it
  addressStyleSelect = (position) => {
    if (this.state.userChoice?.includes(position)) {
      return {
        backgroundColor: this.state.primaryColour,
      };
    }
  };

  // The change handler for selecting the users street address and post code
  onInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  // The change handler for selecting users state, Vic etc
  handleChange = (event) => {
    this.setState({
      state: event.target.value,
    });
  };

  // Renders the primary form to the page
  form = () => {
    return (
      <>
        {/* <h1>Add a new address</h1> */}

        <Form
          onSubmit={this.onFormSubmit}
          className="address-form"
          size={"medium"}
        >
          <Form.Field>
            <p>Add a new Address</p>
            <label htmlFor="name">Street Address</label>
            <Form.Input
              type="text"
              name="street_address"
              id="street_address"
              onChange={this.onInputChange}
            />
          </Form.Field>
          <Form.Group widths="equal">
            <Form.Field>
              <label htmlFor="post_code">Post code</label>
              <Form.Input
                type="text"
                name="post_code"
                id="post_code"
                onChange={this.onInputChange}
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="state"> State</label>
              <select
                defaultValue={this.state.value}
                onChange={this.handleChange}
              >
                <option value="VIC">VIC</option>
                <option value="TAS">TAS</option>
                <option value="NSW">NSW</option>
                <option value="ACT">ACT</option>
                <option value="WA">WA</option>
              </select>
            </Form.Field>
          </Form.Group>
          <Button input type="submit" value="Submit" className="submit-button">
            Add New Address
          </Button>
        </Form>
      </>
    );
  };

  // to separate submission for redirect to confirmation from adding a new address. separation of concerns. next form submits for the redirect.
  nextForm = () => {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Button
            onSubmit={this.handleSubmit}
            className="next-button"
            icon
            labelPosition="right"
          >
            {" "}
            Next
            <Icon name="right arrow" />
          </Button>
        </Form>
      </div>
    );
  }; 


  // handle submit for next form redirect only re-direct if user selection has been made
  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.userChoice > 0) {
      this.setState({ redirect: "/Confirm" });
    }
    else {
              window.alert("select an address");
    }
  };

  // The submit handler for entering a new address
  onFormSubmit = async (event) => {
    event.preventDefault();

    await fetch(`${process.env.REACT_APP_API}/addresses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        address: {
          street_address: this.state.street_address,
          post_code: this.state.post_code,
          state: this.state.state,
        },
      }),
    });
    // This is set so that logic will be applied that will set the selected address to the newly created address
    this.setState({ newAddress: true });
    // Gets the address data again, as the most recent(Including the just posted address)
    this.getAddressData();
  };

  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          push
          to={{
            pathname: this.state.redirect,
            state: { data: this.state },
          }}
        />
      );
    }
    return (
      
      <>
        <div className="address-container">
          <Segment stacked>
            <h1>Let us know where to go</h1>
            <div>{this.renderAddresses()}</div>
            <div>{this.form()}</div>
          </Segment>
          <div>{this.nextForm()}</div>
        </div>
      </>
    );
  }
}
export default CreateAddress;
