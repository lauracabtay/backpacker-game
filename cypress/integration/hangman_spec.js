describe("hangman", () => {
  beforeEach(() => cy.request("/debug/login"));

  it("user can see stats about the minigame", () => {
    cy.visit("/minigames/hangman");
    cy.get("#stats").should("contain", "Wrong guesses left");
    cy.get("#stats").should("contain", "Word Length");
  });

  it("buttons disable after clicking", () => {
    cy.visit("/minigames/hangman");
    cy.get("#A").click();
		cy.get("#A").should("be.disabled");
  });

});
