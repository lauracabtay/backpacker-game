describe("Homepage", () => {
  it("has a login button", () => {
    cy.visit("/");
    cy.get("#home-log-in").should("contain", "LOGIN");
    cy.get("#home-log-in").click();
    cy.url().should('contain', '/users/login')
  });

  it("has a sign up button", () => {
    cy.visit("/");
    cy.get("#home-sign-up").should("contain", "SIGN UP");
    cy.get("#home-sign-up").click();
    cy.url().should('contain', '/users/signup')
  });
});