import React from "react";
import { Header, Button, Grid, Image, Container } from "semantic-ui-react";
import Dishes from "../assets/dishes.png";
import Sponge from "../assets/sponge.png";
import Laundry from "../assets/laundry.png";
import Sparkle from "../assets/sparkle.png";
class Services extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: (
        <div className="services-container">
          <Grid divided="vertically">
            <Grid.Row columns={3}>
              <Grid.Column>
                <Header as="h4"> Kitchen</Header>
                <p>Dust and wipe all accessible surfaces</p>
                <p>Wipe exterior of kitchen cupboards, oven and fridge</p>
                <p>Clean microwave interior and exterior</p>
                <p>Wipe switches and handles</p>
                <p>Wipe countertops</p>
                <p>Wipe Stovetope</p>
                <p>Clean the sink</p>
                <p>Put away the dishes</p>
                <p>Take out rubbish and recycling</p>
                <p>Vacuum and mop floors</p>
                <p id="strike-through">Shelves</p>
                <p id="strike-through">Trash can inside/outside</p>
              </Grid.Column>
              <Grid.Column>
                <Header as="h4"> Bathroom</Header>
                <p>Clean the toilet</p>
                <p>Scrub shower, bath and sink</p>
                <p>Clean cabinet exteriors, mirrors and fixtures</p>
                <p>Wipe switches and handles</p>
                <p>Empty Rubbish bins</p>
                <p>Vacuum and mop floors</p>
                <p id="strike-through">Heavy scrub of bathtub/shower</p>
                <p id="strike-through">Heavy scrub of bathroom tiles</p>
                <p id="strike-through">Heavy scrub of sink </p>
                <p id="strike-through">Stain removal </p>
                <Header as="h4">Bedroom</Header>
                <p>Dust and wipe all accessible surfaces</p>
                <p>Wipe switches and handles</p>
                <p>Vacuum and mop floors</p>
                <p>
                  Make the bed(leave fresh linen out if you would like us to
                  change)
                </p>
                <p>Clean mirrors </p>
              </Grid.Column>
              <Grid.Column>
                <Header as="h4">Living Areas</Header>
                <p>Dust and wipe all accessible surfaces</p>
                <p>Wipe switches and handles</p>
                <p>Clean mirrors</p>
                <p>Empty rubbish bins</p>
                <p>Vacuum and mop floors</p>
                <p id="strike-through">Blinds</p>
                <p id="strike-through">Behind wall units</p>
                <Header as="h4">Add Ons</Header>
                <p id="strike-through">Dishes </p>
                <p id="strike-through">Laundry </p>
                <p id="strike-through">Inside Oven </p>
                <p id="strike-through">Inside Cabinets </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      ),
    };
  }

  standardClick = (event) => {
    this.setState({
      text: (
        <div className="services-container">
          <Grid divided="vertically">
            <Grid.Row columns={3}>
              <Grid.Column>
                <Header as="h4"> Kitchen</Header>
                <p>Dust and wipe all accessible surfaces</p>
                <p>Wipe exterior of kitchen cupboards, oven and fridge</p>
                <p>Clean microwave interior and exterior</p>
                <p>Wipe switches and handles</p>
                <p>Wipe countertops</p>
                <p>Wipe Stovetope</p>
                <p>Clean the sink</p>
                <p>Put away the dishes</p>
                <p>Take out rubbish and recycling</p>
                <p>Vacuum and mop floors</p>
                <p id="strike-through">Shelves</p>
                <p id="strike-through">Trash can inside/outside</p>
              </Grid.Column>
              <Grid.Column>
                <Header as="h4"> Bathroom</Header>
                <p>Clean the toilet</p>
                <p>Scrub shower, bath and sink</p>
                <p>Clean cabinet exteriors, mirrors and fixtures</p>
                <p>Wipe switches and handles</p>
                <p>Empty Rubbish bins</p>
                <p>Vacuum and mop floors</p>
                <p id="strike-through">Heavy scrub of bathtub/shower</p>
                <p id="strike-through">Heavy scrub of bathroom tiles</p>
                <p id="strike-through">Heavy scrub of sink </p>
                <p id="strike-through">Stain removal </p>
                <Header as="h4">Bedroom</Header>
                <p>Dust and wipe all accessible surfaces</p>
                <p>Wipe switches and handles</p>
                <p>Vacuum and mop floors</p>
                <p>
                  Make the bed(leave fresh linen out if you would like us to
                  change)
                </p>
                <p>Clean mirrors </p>
              </Grid.Column>
              <Grid.Column>
                <Header as="h4">Living Areas</Header>
                <p>Dust and wipe all accessible surfaces</p>
                <p>Wipe switches and handles</p>
                <p>Clean mirrors</p>
                <p>Empty rubbish bins</p>
                <p>Vacuum and mop floors</p>
                <p id="strike-through">Blinds</p>
                <p id="strike-through">Behind wall units</p>
                <Header as="h4">Add Ons</Header>
                <p id="strike-through">Dishes </p>
                <p id="strike-through">Laundry </p>
                <p id="strike-through">Inside Oven </p>
                <p id="strike-through">Inside Cabinets </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      ),
    });
  };

  deluxeClick = (event) => {
    this.setState({
      text: (
        <div className="services-container">
          <Grid divided="vertically">
            <Grid.Row columns={3}>
              <Grid.Column>
                <Header as="h4"> Kitchen</Header>
                <p>Dust and wipe all accessible surfaces</p>
                <p>Wipe exterior of kitchen cupboards, oven and fridge</p>
                <p>Clean microwave interior and exterior</p>
                <p>Wipe switches and handles</p>
                <p>Wipe countertops</p>
                <p>Wipe Stovetope</p>
                <p>Clean the sink</p>
                <p>Put away the dishes</p>
                <p>Take out rubbish and recycling</p>
                <p>Vacuum and mop floors</p>
                <p>Shelves</p>
                <p>Trash can inside/outside</p>
              </Grid.Column>
              <Grid.Column>
                <Header as="h4"> Bathroom</Header>
                <p>Clean the toilet</p>
                <p>Scrub shower, bath and sink</p>
                <p>Clean cabinet exteriors, mirrors and fixtures</p>
                <p>Wipe switches and handles</p>
                <p>Empty Rubbish bins</p>
                <p>Vacuum and mop floors</p>
                <p>Heavy scrub of bathtub/shower</p>
                <p>Heavy scrub of bathroom tiles</p>
                <p>Heavy scrub of sink </p>
                <p>Stain removal </p>
                <Header as="h4">Bedroom</Header>
                <p>Dust and wipe all accessible surfaces</p>
                <p>Wipe switches and handles</p>
                <p>Vacuum and mop floors</p>
                <p>
                  Make the bed(leave fresh linen out if you would like us to
                  change)
                </p>
                <p>Clean mirrors </p>
              </Grid.Column>
              <Grid.Column>
                <Header as="h4">Living Areas</Header>
                <p>Dust and wipe all accessible surfaces</p>
                <p>Wipe switches and handles</p>
                <p>Clean mirrors</p>
                <p>Empty rubbish bins</p>
                <p>Vacuum and mop floors</p>
                <p>Blinds</p>
                <p>Behind wall units</p>
                <Header as="h4">Add Ons</Header>
                <p id="strike-through">Dishes </p>
                <p id="strike-through">Laundry </p>
                <p id="strike-through">Inside Oven </p>
                <p id="strike-through">Inside Cabinets </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      ),
    });
  };

  deepCleanClick = (event) => {
    this.setState({
      text: (
        <div className="services-container">
          <Grid divided="vertically">
            <Grid.Row columns={3}>
              <Grid.Column>
                <Header as="h4"> Kitchen</Header>
                <p>Dust and wipe all accessible surfaces</p>
                <p>Wipe exterior of kitchen cupboards, oven and fridge</p>
                <p>Clean microwave interior and exterior</p>
                <p>Wipe switches and handles</p>
                <p>Wipe countertops</p>
                <p>Wipe Stovetope</p>
                <p>Clean the sink</p>
                <p>Put away the dishes</p>
                <p>Take out rubbish and recycling</p>
                <p>Vacuum and mop floors</p>
                <p>Shelves</p>
                <p>Trash can inside/outside</p>
              </Grid.Column>
              <Grid.Column>
                <Header as="h4"> Bathroom</Header>
                <p>Clean the toilet</p>
                <p>Scrub shower, bath and sink</p>
                <p>Clean cabinet exteriors, mirrors and fixtures</p>
                <p>Wipe switches and handles</p>
                <p>Empty Rubbish bins</p>
                <p>Vacuum and mop floors</p>
                <p>Heavy scrub of bathtub/shower</p>
                <p>Heavy scrub of bathroom tiles</p>
                <p>Heavy scrub of sink </p>
                <p>Stain removal </p>
                <Header as="h4">Bedroom</Header>
                <p>Dust and wipe all accessible surfaces</p>
                <p>Wipe switches and handles</p>
                <p>Vacuum and mop floors</p>
                <p>
                  Make the bed(leave fresh linen out if you would like us to
                  change)
                </p>
                <p>Clean mirrors </p>
              </Grid.Column>
              <Grid.Column>
                <Header as="h4">Living Areas</Header>
                <p>Dust and wipe all accessible surfaces</p>
                <p>Wipe switches and handles</p>
                <p>Clean mirrors</p>
                <p>Empty rubbish bins</p>
                <p>Vacuum and mop floors</p>
                <p>Blinds</p>
                <p>Behind wall units</p>
                <Header as="h4">Add Ons</Header>
                <p>Dishes </p>
                <p>Laundry </p>
                <p id="strike-through">Inside Oven </p>
                <p id="strike-through">Inside Cabinets </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      ),
    });
  };

  movingClick = (event) => {
    this.setState({
      text: (
        <div className="services-container">
          <Grid divided="vertically">
            <Grid.Row columns={3}>
              <Grid.Column>
                <Header as="h4"> Kitchen</Header>
                <p>Dust and wipe all accessible surfaces</p>
                <p>Wipe exterior of kitchen cupboards, oven and fridge</p>
                <p>Clean microwave interior and exterior</p>
                <p>Wipe switches and handles</p>
                <p>Wipe countertops</p>
                <p>Wipe Stovetope</p>
                <p>Clean the sink</p>
                <p>Put away the dishes</p>
                <p>Take out rubbish and recycling</p>
                <p>Vacuum and mop floors</p>
                <p>Shelves</p>
                <p>Trash can inside/outside</p>
              </Grid.Column>
              <Grid.Column>
                <Header as="h4"> Bathroom</Header>
                <p>Clean the toilet</p>
                <p>Scrub shower, bath and sink</p>
                <p>Clean cabinet exteriors, mirrors and fixtures</p>
                <p>Wipe switches and handles</p>
                <p>Empty Rubbish bins</p>
                <p>Vacuum and mop floors</p>
                <p>Heavy scrub of bathtub/shower</p>
                <p>Heavy scrub of bathroom tiles</p>
                <p>Heavy scrub of sink </p>
                <p>Stain removal </p>
                <Header as="h4">Bedroom</Header>
                <p>Dust and wipe all accessible surfaces</p>
                <p>Wipe switches and handles</p>
                <p>Vacuum and mop floors</p>
                <p>
                  Make the bed(leave fresh linen out if you would like us to
                  change)
                </p>
                <p>Clean mirrors </p>
              </Grid.Column>
              <Grid.Column>
                <Header as="h4">Living Areas</Header>
                <p>Dust and wipe all accessible surfaces</p>
                <p>Wipe switches and handles</p>
                <p>Clean mirrors</p>
                <p>Empty rubbish bins</p>
                <p>Vacuum and mop floors</p>
                <p>Blinds</p>
                <p>Behind wall units</p>
                <Header as="h4">Add Ons</Header>
                <p>Dishes </p>
                <p>Laundry </p>
                <p>Inside Oven </p>
                <p>Inside Cabinets </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      ),
    });
  };

// cards for the add on options with image and header 
  addOnCards = () => {
    return (
      <div>
        <Container className="landingpage-cards">
          <Header className="services-header">Add On Services</Header>
          <Grid divided="vertically">
            <Grid.Row columns={4} className="addon-cards">
              <Grid.Column>
                <p className="image-card">
                  <Image src={Dishes} size="mini" />
                </p>
                <Header as="h5">Dishes</Header>
              </Grid.Column>
              <Grid.Column>
                <p className="image-card">
                  <Image src={Laundry} size="mini" />
                </p>
                <Header as="h5">Laundry</Header>
              </Grid.Column>
              <Grid.Column>
                <p className="image-card">
                  <Image src={Sparkle} size="mini" />
                </p>
                <Header as="h5">Inside Oven</Header>
              </Grid.Column>
              <Grid.Column>
                <p className="image-card">
                  <Image src={Sponge} size="mini" />
                </p>
                <Header as="h5">Inside Cabinets</Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  };

// buttons which allow the user to view different cleaning options and what they entail
  cleaningButtons = () => {
    return (
      <div className="services-buttons">
        <Button onClick={this.standardClick} value="standard">
          Standard
        </Button>
        <Button onClick={this.deluxeClick} value="deluxe">
          Deluxe
        </Button>
        <Button onClick={this.deepCleanClick} value="deepclean">
          Deep clean
        </Button>
        <Button onClick={this.movingClick} value="moving">
          Moving in/out
        </Button>
      </div>
    );
  };

  render() {
    return (
        <div className="services-wrapper">
          <div className="services-header">
            <Header>What's included in your clean?</Header>
            {this.cleaningButtons}
          </div>
          {this.cleaningButtons()}
          <p>{this.state.text}</p>
          <div className="addon-cards-wrapper">{this.addOnCards()}</div>
        </div>
    );
  }
}

export default Services;
