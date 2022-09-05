describe("higherlower", () => {
    beforeEach(() => cy.request('/debug/login'));

    it("user can play the minigame", () => {
        cy.visit("/minigames/higherlower");
        cy.get('#story').should('contain', 'fairy');
    });

})
