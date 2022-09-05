describe("mountains", () => {
    beforeEach(() => cy.request('/debug/login'))
    it("page contains story", () => {
		cy.visit('/areas/mountains');
		cy.get('#mountains-story').should("contain", "It's soo cold up here!");
	});
    
    it("user can navigate from the mountains to the forest", () => {
		cy.visit('/areas/mountains');
		cy.get('.forest').click();
		cy.url().should('contain', '/areas/forest')
	});

	it("user can navigate from the mountains to the cave tunnel", () => {
		cy.visit('/areas/mountains');
		cy.get('.cavetunnel').click();
		cy.url().should('contain', '/areas/cavetunnel')
	});

    // needs a test for sucessfully picking up matches once implemented.
})