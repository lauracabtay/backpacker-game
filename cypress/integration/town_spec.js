describe("town", () => {
  beforeEach(() => cy.request('/debug/login'))
  it("user navigate to the meadow", () => {
    cy.visit('/areas/town');
    cy.get("#to-meadow").click({ force: true });
    cy.url().should('contain', '/areas/meadow')
  });

  it("displays story introduction and instructions", () => {
    cy.visit("/areas/town");
    cy.get("#story").should("contain", "Good luck!");
  });
})