import React from "react";
import { Header, Container, Image, Grid, Card } from "semantic-ui-react";
import myImage from "../assets/about-us-family.jpg";
import Housekeeper1 from "../assets/housekeeper1.jpeg";
import Housekeeper2 from "../assets/housekeeper2.jpeg";
import Housekeeper3 from "../assets/housekeeper3.jpeg";

class AboutUs extends React.Component {
  render() {
    return (
      <>
        <div className="about-us-wrapper">
          <Container text className="about-us-container">
             <Header as="h1">About Us </Header>
            <p>
              
              <Image src={myImage} size="medium" circular floated="right" />
              Tidy Keep is a small family business which started in 1993 based
              in Melbourne. It has since expanded its business to all over
              Australia, specialising in cleaning homes. Whether it's a standard
              clean or a move out clean, we've got you covered!
            </p>
            <p> - John Smith, Owner of Tidy Keep</p>
          </Container>
     
        
          <Container text className="mission statement">
            <Header as="h1">Our mission </Header>
            <p>
              We aim to provide excellent standard of cleaning through utilising
              eco-friendly products as well as following an intensive checklist
              of tasks to ensure that your property is maintained to a high
              standard.{" "}
            </p>
          </Container>

        <div className="Our-housekeepers">
          <Header as="h1">Our Housekeepers </Header>
        </div>
        <div className="Housekeeper-cards">
          <Grid>
            <Grid.Row columns={3}>
              <Grid.Column mobile={14} tablet={5} computer={5}>
                <Card>
                  <Image src={Housekeeper1} size="Medium" circular />
                  <Card.Content>
                    <Card.Header>SuSu</Card.Header>
                    <Card.Description>
                      Susu is an experienced worker with over 5 years of
                      experience in both commercial and personal properties. She
                      has shared her vast knowledge with the team. In her spare
                      time, she enjoys learning to code in Javascript and Ruby.
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column mobile={14} tablet={5} computer={5}>
                <Card>
                  <Image src={Housekeeper2} size="Medium" circular />
                  <Card.Content>
                    <Card.Header>Micah</Card.Header>
                    <Card.Description>
                      Micah is an experienced worker with over 3 years of
                      experience in both commercial and personal properties. He
                      has shared his vast knowledge with the team. In his spare
                      time, he spends time creating projects using React and
                      Ruby on Rails.
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column mobile={14} tablet={5} computer={5}>
                <Card>
                  <Image src={Housekeeper3} size="Medium" circular />
                  <Card.Content>
                    <Card.Header>Georgia</Card.Header>
                    <Card.Description>
                      Georgia is an experienced worker with over 4 years of
                      experience in both commercial and personal properties. She
                      has shared her vast knowledge with the team. In her spare
                      time, she enjoys spending her time creating elegant
                      projects using Ruby and Ruby on rails.
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
         </div>
         
      </>
    );
  }
}
export default AboutUs;
