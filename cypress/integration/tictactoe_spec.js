/// <reference types="cypress" />

describe("Tictactoe", () => {
  beforeEach(() => cy.request('/debug/login'))
  it("exists", () => {
      cy.visit("/minigames/tictactoe");
      cy.contains(`Uh uh! It looks like there is a diamond dust blockage...`).should("be.visible");
  });

  it("user has no tictactoe result until a game is won or lost", () => {
    cy.visit("/debug");
    cy.get("#user").should(it => {
      expect(JSON.parse(it.text()).currentGame.gameResults.tictactoe).not.to.be.oneOf(['WIN', 'LOSE'])
    })
  });
});