/// <reference types="cypress" />

describe("Codebreaker", () => {
  beforeEach(() => cy.request('/debug/login'))
  it("exists", () => {
      cy.visit("/minigames/codebreaker");
      cy.contains(`The gate between the farm and the river is locked!!`).should("be.visible");
  });
  
  it("takes the user input and stores it in the user's previous guesses", () => {
      cy.visit("/minigames/codebreaker");
      cy.get('#input').type('1234');
      cy.get('#user-guess').click();
      cy.get('#input').type('5678');
      cy.get('#user-guess').click();
      cy.get('#userguesses > p').should(($p) => {
          expect($p).to.have.length(2)
          expect($p.eq(0)).to.contain('5678')
          expect($p.eq(1)).to.contain('1234')
        })
  });

  it("user has no codebreaker result until a game is won or lost", () => {
    cy.visit("/debug");
    cy.get("#user").should(it => {
      expect(JSON.parse(it.text()).currentGame.gameResults.codebreaker).not.to.be.oneOf(['WIN', 'LOSE'])
    })
  });
});