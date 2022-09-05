describe("farm", () => {
    beforeEach(() => cy.request('/debug/login'));

    it("page exists", () => {
        cy.visit("/areas/farm");
        cy.get('#farm-story').should('contain', 'small farm');
    });

    it("has button to river", () => {
        cy.visit("/areas/farm");
        cy.get('.river').should('contain', 'Gate to River');
    });

    it("has button to meadow", () => {
        cy.visit("/areas/farm");
        cy.get('.meadow').should('contain', 'Meadow');
    });

    it("has button to town", () => {
        cy.visit("/areas/farm");
        cy.get('.town').should('contain', 'Town');
    });

    it("has button to farmer", () => {
        cy.visit("/areas/farm");
        cy.get('.farmer').should('contain', 'Farmer');
    });

})
