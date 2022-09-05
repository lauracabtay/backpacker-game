describe("meadow", () => {
  beforeEach(() => cy.request('/debug/login'))

  it("user navigate from the meadow to the town", () => {
    cy.visit("/areas/meadow");
    cy.get("#to-town").click({ force: true });
    cy.url().should("contain", "areas/town");
  });

  it("user navigate from the meadow to the pathway", () => {
    cy.visit("/areas/meadow");
    cy.get("#to-path").click({ force: true });
    cy.url().should("contain", "areas/pathway");
  });

  it("displays story introduction and instructions", () => {
    cy.visit("/areas/meadow");
    cy.get(".meadow-story").should(
      "contain",
      "You stumble upon a meadow that looks oddly familiar"
    );
  });
});
