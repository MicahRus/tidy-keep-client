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
    type: 'Standard',
    totalCost: 117,
    costMultiplier: 120
    
  };

  getServicesData = async () => {
    const response = await fetch(`${process.env.REACT_APP_API}/services`);
    const data = await response.json();
    this.setState({ services: data.reverse() });
  };

  checkProps = () => {
    if (this.props.location.state?.data !== undefined){
      this.setState({ 
        bathrooms: this.props.location.state.data.bathrooms,
    bedrooms: this.props.location.state.data.bedrooms,
    type: this.props.location.state.data.choice,
    totalCost: this.props.location.state.data.totalCost,
    costMultiplier: this.props.location.state.data.costMultiplier,
      })
    }
  }

  componentDidMount() {
    this.getServicesData();
    this.checkProps();
  }

  setHeader = () => {
    if (this.state.services !== undefined){
      this.calculateCost();
    }


    return (
      <div class="booking-page-container">
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

  form = () => {
    return (
      <div>
        <div>
          {" "}
          <Header as="h4" className="bookingpage-header">
            Number of Bedrooms
          </Header>
          <Form onClick={this.bedroomOnClick} className="booking-form">
            <Button
              style={this.bedroomStyleSelect(1)}
              size={"large"}
              className="booking-button"
            >
              {" "}
              1{" "}
            </Button>
            <Button
              style={this.bedroomStyleSelect(2)}
              size={"large"}
              className="booking-button"
            >
              {" "}
              2{" "}
            </Button>
            <Button
              style={this.bedroomStyleSelect(3)}
              size={"large"}
              className="booking-button"
            >
              {" "}
              3{" "}
            </Button>
            <Button
              style={this.bedroomStyleSelect(4)}
              size={"large"}
              className="booking-button"
            >
              {" "}
              4{" "}
            </Button>
            <Button
              style={this.bedroomStyleSelect(5)}
              size={"large"}
              className="booking-button"
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
          <Form onClick={this.bathroomOnClick} className="booking-form">
            <Button
              style={this.bathroomStyleSelect(1)}
              size={"large"}
              className="booking-button"
            >
              {" "}
              1{" "}
            </Button>
            <Button
              style={this.bathroomStyleSelect(2)}
              size={"large"}
              className="booking-button"
            >
              {" "}
              2{" "}
            </Button>
            <Button
              style={this.bathroomStyleSelect(3)}
              size={"large"}
              className="booking-button"
            >
              {" "}
              3{" "}
            </Button>
            <Button
              style={this.bathroomStyleSelect(4)}
              size={"large"}
              className="booking-button"
            >
              {" "}
              4{" "}
            </Button>
            <Button
              style={this.bathroomStyleSelect(5)}
              size={"large"}
              className="booking-button"
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

  calculateCost = () => {
    let bathroomCost =
      this.state.bathrooms * this.state.services[0].price;

    let bedroomCost =
      this.state.bedrooms * this.state.services[1].price;

    let addonCost = this.state.addons.length * 25;

    let totalCost = Math.round(
      ((bathroomCost + bedroomCost + addonCost) * this.state.costMultiplier) /
        100
    );

    if (this.state.totalCost !== totalCost) {
      this.setState({ totalCost: totalCost });
    }
  };

  // The handle for when the wanting to go to the next page
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ redirect: "/Calendar" });
  };

  // Click handler for bedrooms
  bedroomOnClick = (event) => {
    event.preventDefault();
    // Prevents the user from selecting the entire row
    if (event.target.innerText.length === 1) {
      this.setState({ bedrooms: event.target.innerText });
    }
  };

  // Click handler for bathrooms
  bathroomOnClick = (event) => {
    event.preventDefault();
    // Prevents the user from selecting the entire row
    if (event.target.innerText.length === 1) {
      this.setState({ bathrooms: event.target.innerText });
    }
  };

  typeOnClick = (event) => {
    event.preventDefault();
    // Loops through each of the services
    this.state.services.forEach((service) => {
      // Compares the name of the button clicked to the services name
      if (service.title === event.target.innerText.toLowerCase()) {
        // If they match, sets the price multiplier to the services price
        this.setState({
          type: event.target.innerText,
          costMultiplier: service.price,
        });
      }
    });
  };

  addonsOnClick = (event) => {
    event.preventDefault();
    // Prevents the user from selecting the entire row
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
    if (parseInt(this.state.bedrooms) === position)
      return { backgroundColor: this.state.primaryColour };
  };

  // Same as above
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
          {/* <h1>Top bar/nav goes here</h1> */}
          <div>{this.setHeader()}</div>
        </div>
        <div> </div>
        {/* <Segment> */}
        <Header as="h1" className="appointment-header">
          Book An Appointment
        </Header>
        {this.form()}
        {/* </Segment> */}
      </div>
    );
  }
}

export default BookingPage;
