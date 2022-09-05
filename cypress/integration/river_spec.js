describe("river", () => {
    beforeEach(() => cy.request('/debug/login'));

    it("page exists", () => {
        cy.visit("/areas/river");
        cy.get('#story').should('contain', 'You walk along the river');
    });

    it("has button to bridge", () => {
        cy.visit("/areas/river");
        cy.get('.bridge').should('contain', 'Bridge');
    });

    it("has a Troll blocker", () => {
        cy.visit("/areas/river");
        cy.get('.troll').should('contain', 'Troll');
    });

    it("has button to Farmer's Gate", () => {
        cy.visit("/areas/river");
        cy.get('.farm').should('contain', 'Farmer\'s Gate');
    });

    it("has button to swamp", () => {
        cy.visit("/areas/river");
        cy.get('.swamp').should('contain', 'Swamp');
    });

    it("has a butterfly", () => {
        cy.visit("/areas/river");
        cy.get('.butterfly').should('contain', 'Butterfly');
    });

})
