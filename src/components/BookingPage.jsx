import React from "react";
import { Redirect } from "react-router-dom";

class BookingPage extends React.Component {
  state = { redirect: null, primaryColour: "CornflowerBlue", pressed: false, bathroom: 1, bedroom: 1, type: 'Standard', totalCost: 150 };

  setHeader = () => {
    return (
      <div>
        <h4>{this.state.bedroom} </h4>
        <p>Bedroom</p>
        <h4>{this.state.bathroom}</h4>
        <p>Bathroom</p>
        <h4>{this.state.type}</h4>
        <p>Clean Type</p>
        <h4>{this.state.totalCost}</h4>
        <p> Subtotal </p>
      </div>

    )
  }

  form = () => {
    return (
      <div>
        <div>
          {" "}
          <h3>Number of Bedrooms</h3>
          <form onClick={this.bedroomOnClick}>
            <button style={this.bedroomStyleSelect(1)}> 1 </button>
            <button style={this.bedroomStyleSelect(2)}> 2 </button>
            <button style={this.bedroomStyleSelect(3)}> 3 </button>
            <button style={this.bedroomStyleSelect(4)}> 4 </button>
            <button style={this.bedroomStyleSelect(5)}> 5 </button>
          </form>
        </div>

        <div>
          {" "}
          <h3>Number of Bathrooms</h3>
          <form onClick={this.bathroomOnClick}>
            <button style={this.bathroomStyleSelect(1)}> 1 </button>
            <button style={this.bathroomStyleSelect(2)}> 2 </button>
            <button style={this.bathroomStyleSelect(3)}> 3 </button>
            <button style={this.bathroomStyleSelect(4)}> 4 </button>
            <button style={this.bathroomStyleSelect(5)}> 5 </button>
          </form>
        </div>

        <div>
          <h3>Type of Clean</h3>
          <form onClick={this.typeOnClick}>
            <button style={this.typeStyleSelect("Standard")}> Standard </button>
            <button style={this.typeStyleSelect("Deluxe")}> Deluxe </button>
            <button style={this.typeStyleSelect("Deep Clean")}>
              {" "}
              Deep Clean{" "}
            </button>
            <button style={this.typeStyleSelect("Moving in/out")}>
              {" "}
              Moving in/out{" "}
            </button>
          </form>
        </div>

        <div>
          <h3> Add Ons </h3>
          <form onClick={this.addonsOnClick}>
            <button style={this.addonsStyleSelect("Extra Time")}>
              {" "}
              Extra Time
            </button>
            <button style={this.addonsStyleSelect("Inside Fridge")}>
              {" "}
              Inside Fridge
            </button>
            <button style={this.addonsStyleSelect("Inside Oven")}>
              {" "}
              Inside Oven
            </button>
            <button style={this.addonsStyleSelect("Inside Cabinets")}>
              {" "}
              Inside Cabinets
            </button>
          </form>
        </div>
        <form onSubmit={this.handleSubmit}>
          <button onSubmit={this.handleSubmit}> Next</button>
        </form>
      </div>
    );
  };

  // The handle for when the wanting to go to the next page
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ redirect: "/Calendar" });
  };

  // Click handler for bedrooms
  bedroomOnClick = (event, target) => {
    event.preventDefault();
    this.setState({ bedroom: event.target.innerText });
  };

  // Click handler for bathrooms
  bathroomOnClick = (event) => {
    event.preventDefault();
    this.setState({ bathroom: event.target.innerText });
  };

  typeOnClick = (event) => {
    event.preventDefault();
    this.setState({ type: event.target.innerText });
  };

  addonsOnClick = (event) => {
    event.preventDefault();
    this.setState({ addons: event.target.innerText });
    // If the button that is highlighted is pressed again, it will lose it's color
    if (this.state.addons === event.target.innerText) {
      this.setState({ addons: null });
    }
  };

  // Handles changing the style for the buttons depending if it is pressed or not
  bedroomStyleSelect = (position) => {
    if (parseInt(this.state.bedroom) === position)
      return { backgroundColor: this.state.primaryColour };
  };

  // Same as above
  bathroomStyleSelect = (position) => {
    if (parseInt(this.state.bathroom) === position)
      return { backgroundColor: this.state.primaryColour };
  };

  typeStyleSelect = (position) => {
    if (this.state.type === position)
      return {
        backgroundColor: this.state.primaryColour,
      };
  };

  addonsStyleSelect = (position) => {
    if (this.state.addons === position) {
      if (this.state.pressed === false) {
        return {
          backgroundColor: this.state.primaryColour,
        };
      }
    }
  };

  // Potential code to help dry,
  // Pass in an argument in the event handler 'bathroom', 'bedroom' etc. Saves repeating the code.
  // handleClick = param => event => {
  //   event.preventDefault
  //   console.log(event.value);
  //   console.log(param);
  //   this.setState({ bedroom: event.target.innerText });
  // }

  render() {
    // Logic for redirecting the page
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div>
        <div>
          <h1>Top bar/nav goes here</h1>
          <div>
            <img src='https://picsum.photos/100/100' alt='placeholder'/ >
              {this.setHeader()}



          </div>
        </div>
        <div>
          {" "}
          <h1>Book An Appointment</h1>
        </div>
        {this.form()}
      </div>
    );
  }
}

export default BookingPage;
