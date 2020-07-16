describe("when clicking on login from the homepage user", () => {
   beforeEach(() => {
     cy.visit("/");
     cy.findByTestId(/login/).click();
   });

   it("should go to the login page", () => {
     cy.url().should("include", "/Login"); 
   });
  //  the above is text based still which is ok for our purposes

   it("should see email and password inputs", () => {
     cy.findByLabelText(/email/i).should("exist");
     cy.findByLabelText(/password/i).should("exist");
   });
 });
// independent tests, these can be run as stand alone even if one element fails
import { userBuilder } from "../support/generate";

describe("when clicking on login from the homepage user", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.findByTestId(/login/).click();
  });

  it("should be able to type into email and password inputs", () => {
    const { email, password } = userBuilder()
    cy.findByLabelText(/email/i).type(email).should("contain.value", email)
    cy.findByLabelText(/password/i).type(password).should("contain.value", password)
  })
});
describe("with the correct login credentials user", () => {
  before(() => {
    cy.fixture("user.json").then((user) => {
      cy.visit("/login")
      cy.findByLabelText(/email/i).type(user.email)
      cy.findByLabelText(/password/i).type(user.password)
    })
  });
      
  it("should be able to click on submit and be navigated to /", () => {
    cy.get("form").submit()
    cy.url().should('eql', "http://localhost:8080")
  });
      
  after(() => {
    // we need to clean up after we run the tests
    window.localStorage.removeItem("token")
    window.sessionStorage.removeItem("auth")
  })
});
