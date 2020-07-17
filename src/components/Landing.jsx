import React, { Component } from "react";

class Landing extends Component {
  // A method that will return the value of the calculated cost.
  showValue = () => {
    return (
      <div> Test </div>
    )
  }
  // This will handle refreshing the dom when the select buttons are changed
  handleChange = (event) => {
    console.log('test');
    console.log(event.target.value);
  }

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
          <option value="">Deep clean </option>
          <option value="Deep">Moving in/out </option>
        </select>

        <input type='submit' name='submit' />

        {this.showValue()}
      </form>
    );
  };
  render() {
    return (
      <>
        <h1>On Landing</h1>
        <div>{this.form()}</div>
      </>
    );
  }
}
export default Landing;
