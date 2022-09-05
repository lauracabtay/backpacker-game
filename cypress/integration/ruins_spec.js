describe("Ruins", () => {
  beforeEach(() => cy.request('/debug/login'))
  it("tells a story", () => {
    cy.visit('/areas/ruins');
    cy.url().should('contain', '/ruins');
    cy.get("#story").should("contain", "Well done");
    cy.get("#story").should("contain", "🍄");
  });
})