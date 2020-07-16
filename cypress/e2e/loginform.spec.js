describe("login form", () => {
  it("renders email and password inputs", () => {
    cy.visit("/login")
    // using a regular expressing to query
    // label text is also more reliable to target, classes and ids change but labelText generally stays the same
    cy.findByLabelText(/email/i).should("be.visible")
  })
})
