import React, { Component, useReducer } from "react";
import { Redirect } from "react-router-dom";
import { Container, Header, Grid, Button, Image, Form } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Calendar from "../assets/calendar.png";
import Sparkle from "../assets/sparkle.png";
import Glasses from "../assets/glasses.png";

class Landing extends Component {
  state = {
    bedrooms: 1,
    bathrooms: 1,
    choice: "Standard",
    services: [],
    redirect: null,
    totalCost: 0,
  };


  componentDidMount() {
    // Runs the methods to get data from the rails api
    // this.getBookingsData();
    this.getServicesData();
  }

  // This function fetches the services data from the rails api
  getServicesData = async () => {
    const response = await fetch(`${process.env.REACT_APP_API}/services`);
    const data = await response.json();
    this.setState({ services: data.reverse() });
  };

  // A method to calculate the cost of the currently selected cleaning items
  calculateCost = () => {
    // This will help to maintain the dryness of the code
    const services = this.state.services;

    let bathroomCost = services[0]?.price * this.state.bathrooms;
    let bedroomCost = services[1]?.price * this.state.bedrooms;

    // Logic that will decide what the cost multiplier will be
    let costMultiplier = services[2]?.price;
    if (this.state.choice === "Deluxe") {
      costMultiplier = services[3]?.price;
    } else if (this.state.choice === "Deep Clean") {
      costMultiplier = services[4]?.price;
    } else if (this.state.choice === "Moving in/out") {
      costMultiplier = services[5]?.price;
    }
    // Sets the total cost
    let totalCost = Math.round(
      (bedroomCost + bathroomCost) * (costMultiplier / 100)
    );
    // Checks to see if the totalCost is NaN
    if (!isNaN(totalCost)) {
      // If the state isn't the same as totalCost it will set the state to totalCost
      if (this.state.totalCost !== totalCost) {
        this.setState({ totalCost: totalCost, costMultiplier: costMultiplier });
      }
    }
  };

  // This will handle setting the state when button choices are changed
  handleChange = (event) => {
    let value = event.target.value;

    if (value.includes("bedroom")) {
      this.setState({ bedrooms: value[0] });
    } else if (value.includes("bathroom")) {
      this.setState({ bathrooms: value[0] });
    } else {
      this.setState({ choice: value });
    }

    // When the form is changed it will update the value
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:3000/status", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status >= 400) {
      console.log(response.status);
      this.setState({ redirect: "/SignUp" });
    } else {
      this.setState({ redirect: "/BookingPage" });
    }
  };

  // A form containing the select buttons on the homepage.
  form = () => {
    return (
      <div>
          <Form className="dropdown-form" size={"mini"} key={"mini"} onChange={this.handleChange} onSubmit={this.handleSubmit}>
            <Form.Group widths='4'>
          <Form.Field control='select'>
            <option value="1 bedroom">1 bedroom</option>
            <option value="2 bedroom">2 bedroom</option>
            <option value="3 bedroom">3 bedroom</option>
            <option value="4 bedroom">4 bedroom</option>
            <option value="5 bedroom">5 bedroom</option>
          </Form.Field>

          <Form.Field  control='select'>
            <option value="1 bathroom">1 bathroom</option>
            <option value="2 bathroom">2 bathroom</option>
            <option value="3 bathroom">3 bathroom</option>
            <option value="4 bathroom">4 bathroom</option>
         </Form.Field>

          <Form.Field  control='select'>
            <option value="Standard">Standard </option>
            <option value="Deluxe">Deluxe </option>
            <option value="Deep Clean">Deep Clean </option>
            <option value="Moving in/out">Moving in/out </option>
          </Form.Field>

          <Button
            type="submit"
            name="submit"
            // value={`Get a quote from $${this.state.totalCost} =>`}
          >{`Booking from $${this.state.totalCost}`}</Button>
          {this.calculateCost()}
          </Form.Group>
        </Form> 
      </div>
    );
  };
  render() {
    // If the redirect state isn't null it will redirect the user
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
        <Container className="landingSegment">
          <Container className="LandingForm-container">
            <Container className="LandingPage-content">
            <Header className="landingpage-header">
              Keeping your home tidy.
            </Header>

            <div>{this.form()}</div>
            <Grid divided="vertically" className="taglines" stackable>
              <Grid.Row columns={3}>
                <Grid.Column>Peace of mind</Grid.Column>
                <Grid.Column>Cleaning Checklist</Grid.Column>
                <Grid.Column>Eco-friendly products</Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
       </Container>
        <Container>
          <Grid container stackable verticalAlign='middle' divided="vertically">
            <Grid.Row columns={2}>
              <Grid.Column>
                <Header>Why Choose TidyKeep?</Header>
              </Grid.Column>
              <Grid.Column>
                We are Melbourne's leading family owned cleaning business.
                Trusted by lcoals for 30 years.
                <div class="learn-more">
                <Button className="learn-more-button">
                  <Link to="/AboutUs"> Learn more</Link>
                </Button>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
       <Container className="landingpage-cards">
<Grid divided='vertically'>
  <Grid.Row columns={3} className="cards">
    <Grid.Column>
       <p><Image src={Calendar} size="mini" /></p>
       <Header as='h5'>Book</Header>
       <p>Select a time and date for our housekeeper to come in</p>
    </Grid.Column>
        <Grid.Column>
       <p><Image src={Sparkle} size="mini" /></p> 
       <Header as='h5'>Clean</Header>
       <p>Our housekeepers follow a 50point checklist</p>
    </Grid.Column>
        <Grid.Column>
       <p><Image src={Glasses} size="mini" /></p>
       <Header as='h5'>Relax</Header>
       <p>Sit back and relax </p>
    </Grid.Column>
  </Grid.Row>
</Grid>
       </Container>
        </Container>
      </>
    );
  }
}

export default Landing;
