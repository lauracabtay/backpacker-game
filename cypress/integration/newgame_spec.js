describe("New Game Page", () => {
  beforeEach(() => cy.request('/debug/login'))
  it("has a form", () => {
    cy.visit("/start");
    cy.get("form").should("contain", "What item have you lost recently?");
    cy.get("form").should("contain", "Start Game");
  });
});
