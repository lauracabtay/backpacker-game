/// <reference types="cypress" />

describe("Rock-Paper-Scissors", () => {
  beforeEach(() => cy.request('/debug/login'))
  it("exists", function () {
    for (const name of ["Rock", "Paper", "Scissors"]) {
      cy.visit("/minigames/rps");
      cy.contains(name).click();
      cy.contains(`You chose ${name.toLowerCase()}`).should("be.visible");
    }
  });

  it("user has a RPS result", () => {
    cy.visit("/minigames/rps");
    cy.get("#Rock").click();
    cy.visit("/debug");
    cy.get("#user").should(it => {
      expect(JSON.parse(it.text()).currentGame.gameResults.RPS).to.be.oneOf(['WIN', 'LOSE'])
    })
  });
});