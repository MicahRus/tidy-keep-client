import React from "react";
import { Redirect } from "react-router-dom";
import { Button, Form, Grid, Header, Icon } from "semantic-ui-react";

class BookingPage extends React.Component {
  state = {
    redirect: null,
    addons: [],
    primaryColour: "CornflowerBlue",
    bathrooms: 1,
    bedrooms: 1,
    type: "Standard",
    totalCost: 117,
    costMultiplier: 120,
  };

  // Hits the api to get all the services data(To be used in pricing)
  getServicesData = async () => {
    const response = await fetch(`${process.env.REACT_APP_API}/services`);
    const data = await response.json();
    this.setState({ services: data.reverse() });
  };

  // This will check if props have been passed down (from the landing page) if they are it will set the state to reflect these props
  checkProps = () => {
    if (this.props.location.state?.data !== undefined) {
      this.setState({
        bathrooms: this.props.location.state.data.bathrooms,
        bedrooms: this.props.location.state.data.bedrooms,
        type: this.props.location.state.data.choice,
        totalCost: this.props.location.state.data.totalCost,
        costMultiplier: this.props.location.state.data.costMultiplier,
      });
    }
  };

  // On initial set up, will get the services data then check if props have been passed
  componentDidMount() {
    this.getServicesData();
    this.checkProps();
  }
  // Renders the the items the user has selected / can select (bathrooms, bedrooms, etc)
  setHeader = () => {
    // Ensures that the api has been hit to get the services data
    if (this.state.services !== undefined) {
      this.calculateCost();
    }
    // This is what will be displayed on the page
    return (
      <div className="booking-page-container">
        <Grid columns={4} divided>
          <Grid.Row>
            <Grid.Column>
              <Header as="h4" className="bookingpage-header">
                {this.state.bedrooms}{" "}
              </Header>
              <p>Bedroom</p>
            </Grid.Column>
            <Grid.Column>
              <Header as="h4" className="bookingpage-header">
                {this.state.bathrooms}
              </Header>
              <p>Bathroom</p>
            </Grid.Column>
            <Grid.Column>
              <Header as="h4" className="bookingpage-header">
                {this.state.type}
              </Header>
              <p>Clean Type</p>
            </Grid.Column>
            <Grid.Column>
              <Header as="h4" className="bookingpage-header">
                ${this.state.totalCost}
              </Header>
              <p> Subtotal </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  };

  // Renders the primary form to the page
  form = () => {
    return (
      <div>
        <div>
          {" "}
          <Header as="h4" className="bookingpage-header">
            Number of Bedrooms
          </Header>
          <Form onClick={this.bathBedOnClick} className="booking-form">
            <Button
              style={this.bedroomStyleSelect(1)}
              size={"large"}
              className="booking-button"
              value="bedrooms"
            >
              {" "}
              1{" "}
            </Button>
            <Button
              style={this.bedroomStyleSelect(2)}
              size={"large"}
              className="booking-button"
              value="bedrooms"
            >
              {" "}
              2{" "}
            </Button>
            <Button
              style={this.bedroomStyleSelect(3)}
              size={"large"}
              className="booking-button"
              value="bedrooms"
            >
              {" "}
              3{" "}
            </Button>
            <Button
              style={this.bedroomStyleSelect(4)}
              size={"large"}
              className="booking-button"
              value="bedrooms"
            >
              {" "}
              4{" "}
            </Button>
            <Button
              style={this.bedroomStyleSelect(5)}
              size={"large"}
              className="booking-button"
              value="bedrooms"
            >
              {" "}
              5{" "}
            </Button>
          </Form>
        </div>

        <div>
          {" "}
          <Header as="h4" className="bookingpage-header">
            Number of Bathrooms
          </Header>
          <Form onClick={this.bathBedOnClick} className="booking-form">
            <Button
              style={this.bathroomStyleSelect(1)}
              size={"large"}
              className="booking-button"
              value="bathrooms"
            >
              {" "}
              1{" "}
            </Button>
            <Button
              style={this.bathroomStyleSelect(2)}
              size={"large"}
              className="booking-button"
              value="bathrooms"
            >
              {" "}
              2{" "}
            </Button>
            <Button
              style={this.bathroomStyleSelect(3)}
              size={"large"}
              className="booking-button"
              value="bathrooms"
            >
              {" "}
              3{" "}
            </Button>
            <Button
              style={this.bathroomStyleSelect(4)}
              size={"large"}
              className="booking-button"
              value="bathrooms"
            >
              {" "}
              4{" "}
            </Button>
            <Button
              style={this.bathroomStyleSelect(5)}
              size={"large"}
              className="booking-button"
              value="bathrooms"
            >
              {" "}
              5{" "}
            </Button>
          </Form>
        </div>

        <div>
          <Header as="h4" className="bookingpage-header">
            Type of Clean
          </Header>
          <Form onClick={this.typeOnClick} className="booking-form">
            <Button
              style={this.typeStyleSelect("Standard")}
              size={"large"}
              className="booking-button"
            >
              {" "}
              Standard{" "}
            </Button>
            <Button
              style={this.typeStyleSelect("Deluxe")}
              size={"large"}
              className="booking-button"
            >
              {" "}
              Deluxe{" "}
            </Button>
            <Button
              style={this.typeStyleSelect("Deep Clean")}
              size={"large"}
              className="booking-button"
            >
              {" "}
              Deep Clean{" "}
            </Button>
            <Button
              style={this.typeStyleSelect("Moving in/out")}
              size={"large"}
              className="booking-button"
            >
              {" "}
              Moving in/out{" "}
            </Button>
          </Form>
        </div>

        <div>
          <Header as="h4" className="bookingpage-header">
            {" "}
            Add Ons{" "}
          </Header>
          <Form onClick={this.addonsOnClick} className="booking-form">
            <Button
              style={this.addonsStyleSelect("Dishes")}
              size={"large"}
              className="booking-button"
            >
              {" "}
              Dishes
            </Button>
            <Button
              style={this.addonsStyleSelect("Laundry")}
              size={"large"}
              className="booking-button"
            >
              {" "}
              Laundry
            </Button>
            <Button
              style={this.addonsStyleSelect("Inside Oven")}
              size={"large"}
              className="booking-button"
            >
              {" "}
              Inside Oven
            </Button>
            <Button
              style={this.addonsStyleSelect("Inside Cabinets")}
              size={"large"}
              className="booking-button"
            >
              {" "}
              Inside Cabinets
            </Button>
          </Form>
        </div>
        <Form onSubmit={this.handleSubmit}>
          <Button
            onSubmit={this.handleSubmit}
            className="bookingpage-next-button"
            icon
            labelPosition="right"
            size={"medium"}
          >
            {" "}
            Next
            <Icon name="right arrow" />
          </Button>
        </Form>
      </div>
    );
  };

  // A function that will use the information from state to render the prices to the page
  calculateCost = () => {
    let bathroomCost = this.state.bathrooms * this.state.services[0].price;

    let bedroomCost = this.state.bedrooms * this.state.services[1].price;

    let addonCost = this.state.addons.length * 25;

    let totalCost = Math.round(
      ((bathroomCost + bedroomCost + addonCost) * this.state.costMultiplier) /
        100
    );
    // Checks to make sure the total cost getting passed isn't the same as the totalCost set to state(Otherwise we get infinite loops)
    if (this.state.totalCost !== totalCost) {
      this.setState({ totalCost: totalCost });
    }
  };

  // The handle for when the wanting to go to the next page
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ redirect: "/Calendar" });
  };

  // Click handler for bedrooms and bathrooms
  bathBedOnClick = (event) => {
    event.preventDefault();
    // Prevents the user from selecting the entire row when clicking buttons
    if (event.target.innerText.length === 1) {
      this.setState({ [event.target.value]: event.target.innerText });
    }
  };

  typeOnClick = (event) => {
    event.preventDefault();
    // Loops through each of the services
    this.state.services.forEach((service) => {
      // Compares the name of the button clicked to the services name
      if (service.title === event.target.innerText.toLowerCase()) {
        // If they match, sets the cost multiplier to the services price
        this.setState({
          type: event.target.innerText,
          costMultiplier: service.price,
        });
      }
    });
  };

  addonsOnClick = (event) => {
    event.preventDefault();
    // Prevents the user from selecting the entire row when clicking
    if (event.target.innerText.length < 40) {
      // To avoid mutating state directly, we will add the button pressed to the array of addons stored in state
      this.setState({ addons: [...this.state.addons, event.target.innerText] });
      // If the button that is highlighted is pressed again, it will lose it's color

      if (this.state.addons.includes(event.target.innerText)) {
        // To avoid mutating state directly we will create a new array based off state
        let addonsArray = this.state.addons;
        // If the clicked button is already in the array it will be filtered out
        addonsArray = addonsArray.filter((e) => e !== event.target.innerText);
        // Sets to state to the filtered addonsArray
        this.setState({ addons: addonsArray });
      }
    }
  };

  // Handles changing the style for the buttons depending if it is pressed or not
  bedroomStyleSelect = (position) => {
    // checks to see if the state matches the position(Note we ensure they're both integers with the parse method)
    if (parseInt(this.state.bedrooms) === position)
      return { backgroundColor: this.state.primaryColour };
  };

  // Same as bedroomStyleSelect
  bathroomStyleSelect = (position) => {
    if (parseInt(this.state.bathrooms) === position)
      return { backgroundColor: this.state.primaryColour };
  };

  typeStyleSelect = (position) => {
    if (this.state.type === position)
      return {
        backgroundColor: this.state.primaryColour,
      };
  };

  addonsStyleSelect = (position) => {
    // Checks the addons array for any clicked buttons, if they match it will turn their colour blue
    if (this.state.addons.includes(position)) {
      return {
        backgroundColor: this.state.primaryColour,
      };
    }
  };

  render() {
    // Logic for redirecting the page
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
      <div>
        <div>
          {/* Renders the header, I know it doesn't like calling functions that setState inside of render. But I have applied logic to stop this from looping (Same as on line 410) */}
          <div>{this.setHeader()}</div>
        </div>
        <div> </div>
        <Header as="h1" className="appointment-header">
          Book An Appointment
        </Header>
        {this.form()}
      </div>
    );
  }
}

export default BookingPage;
