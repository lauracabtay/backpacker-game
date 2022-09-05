describe("gnome", () => {
  beforeEach(() => cy.request('/debug/login'))

	it("user can play minigame", () => {
    cy.visit("/blockers/gnome");
    cy.get("#rps-minigame").click();
    cy.url().should("contain", "/minigames/rps");
  });

  it("user can go back to the pathway", () => {
    cy.visit("/blockers/gnome");
    cy.get("#pathway-from-gnome").click();
    cy.url().should("contain", "/areas/pathway");
  });
  
})