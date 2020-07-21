import React from "react";

class CreateAddress extends React.Component {
   state = {
    address: "",
    post_code: "",
    // suburb: "",
    state: "VIC",
  };
  
  onInputChange = (event) => {
    console.log("on input change");
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleChange= (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  onFormSubmit = async (event) => {
    event.preventDefault();
  

    await fetch("http://localhost:3000/addresses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state)
    });
    this.props.history.push("/addresses");
  };
  
// {address: this.state.address, post_code: this.state.post_code, state: this.state.value}

  render() {
    return (
      <div className="container">
        <h1>Add a address</h1>
        <form onSubmit={this.onFormSubmit}>
          <label htmlFor="name">Street Address</label>
          <input
            type="text"
            name="address"
            id="address"
            onChange={this.onInputChange}
          />
                    {/* <label htmlFor="name">Suburb</label>
          <input
            type="text"
            name="suburb"
            id="suburb"
            onChange={this.onInputChange}
          /> */}
          <label htmlFor="post_code">Post code</label>
          <textarea
            name="post_code"
            id="post_code"
            onChange={this.onInputChange}
          ></textarea>
          <label htmlFor="state"> State</label>
          <select value={this.state.value} onChange={this.handleChange}>
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
  }
}

export default CreateAddress;
