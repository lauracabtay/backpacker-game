describe("pathway", () => {
	beforeEach(() => cy.request('/debug/login'))

	it("user can navigate from the pathway back to the meadow", () => {
		cy.visit('/areas/pathway');
		cy.get("#to-meadow").click({ force: true });
		cy.url().should('contain', '/areas/meadow')
	});

	it("user can interact with a gnome", () => {
		cy.visit('/areas/pathway');
		cy.get('#gnome').click({ force: true });
		cy.url().should('contain', '/blockers/gnome');
	});

	it("user cannot navigate from the pathway to the ruins if not won minigame", () => {
		cy.visit('/areas/pathway');
		cy.get("#to-ruins").click({ force: true });
		cy.url().should('contain', '/blockers/gnome');
	});
})