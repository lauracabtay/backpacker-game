describe("swamp", () => {
    beforeEach(() => cy.request('/debug/login'))
    it("page contains story", () => {
		cy.visit('/areas/swamp');
		cy.get('#swamp-story').should("contain", "Mind over matter is definitely needed now!");
	});

    it("user can navigate from the swamp to the river", () => {
		cy.visit('/areas/swamp');
		cy.get('.river').click();
		cy.url().should('contain', '/areas/river')
	});

    // needs test for meadow button once minigame implemented.
})