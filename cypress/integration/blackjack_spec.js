describe("blackjack", () => {
    beforeEach(() => {
        cy.request('/debug/login')
        cy.request('debug/backpack/add/SPADE')
    });

    it("user can play a game of blackjack", () => {
        cy.visit("/blockers/farmer");
        cy.get('#blackjack-minigame').click();
        cy.url().should("contain", "/minigames/blackjack");
    });

    it("user can choose to 'stick' and see the outcome", () => {
        cy.visit("/minigames/blackjack");
        cy.get('#stick').click();
        cy.get('#your-score').should("contain", "Your Score:")
    });
})