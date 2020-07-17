import React, { Component } from "react";

class Landing extends Component {
  state = { bedrooms: 1, bathrooms: 1, choice: "Standard" };
  // A method to calculate the cost of the currently selected cleaning items
  calculateCost = () => {
    let bedroomCost = this.state?.bedrooms * 35;
    let bathroomCost = this.state?.bathrooms * 35;
    let costMultiplier = 1
    // Potential logic for editing price based on pack
    if (this.state.choice === "Deluxe") {
       costMultiplier = 2;
    } else if (this.state.choice === "Deep clean") {
       costMultiplier = 3;
    } else if (this.state.choice === "Moving in/out") {
       costMultiplier = 4;
    }

    let totalCost = ((bedroomCost + bathroomCost) * costMultiplier)

    return <div> {totalCost} </div>;
  };

  // A method that will return the value of the calculated cost.
  showValue = () => {
    return (
      <div>
        test
        {this.calculateCost()}
      </div>
    );
  };
  // This will handle setting the state when button choices are changed
  handleChange = (event) => {
    if (event.target.value.includes("bedroom")) {
      this.setState({ bedrooms: event.target.value[0] });
    } else if (event.target.value.includes("bathroom")) {
      this.setState({ bathrooms: event.target.value[0] });
    } else {
      this.setState({ choice: event.target.value });
    }
  };

  // A form containing the select buttons on the homepage.
  form = () => {
    return (
      <form onChange={this.handleChange}>
        <select>
          <option value="1 bedroom">1 bedroom</option>
          <option value="2 bedroom">2 bedroom</option>
          <option value="3 bedroom">3 bedroom</option>
          <option value="4 bedroom">4 bedroom</option>
          <option value="5 bedroom">5 bedroom</option>
        </select>

        <select>
          <option value="1 bathroom">1 bathroom</option>
          <option value="2 bathroom">2 bathroom</option>
          <option value="3 bathroom">3 bathroom</option>
          <option value="4 bathroom">4 bathroom</option>
        </select>

        <select>
          <option value="Standard">Standard </option>
          <option value="Deluxe">Deluxe </option>
          <option value="Deep clean">Deep clean </option>
          <option value="Moving in/out">Moving in/out </option>
        </select>

        <input type="submit" name="submit" />

        {this.showValue()}
      </form>
    );
  };
  render() {
    console.log(this.state);
    return (
      <>
        <h1>On Landing</h1>
        <div>{this.form()}</div>
      </>
    );
  }
}
export default Landing;
