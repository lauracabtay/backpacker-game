/// <reference types="cypress" />

describe("User signup", () => {
  beforeEach(() => cy.visit('/users/signup'))

  it("rejects signup when passwords don't match", function () {
    cy.get('#name').type('Example user')
    cy.get('#email').type('example@site.com')
    cy.get('#password').type('123')
    cy.get('#password_confirm').type('321')
    cy.get("form").submit()

    cy.contains("Passwords don't match").should("be.visible");
  });

  it("accepts signup when passwords do match", function () {
    cy.get('#name').type('AutomatedTestUser')
    cy.get('#email').type('example@site.com')
    cy.get('#password').type('123')
    cy.get('#password_confirm').type('123')
    cy.get("form").submit()

    cy.contains("What item have you lost recently?").should("be.visible");
  });
});

describe("User login", () => {

  let user;
  before(() => {
    cy.visit('/users/signup')
    cy.get('#name').type('AutomatedTestUser')
    cy.get('#email').type('example@site.com')
    cy.get('#password').type('123')
    cy.get('#password_confirm').type('123')
    cy.get("form").submit()
  })

  after(async () => user?.delete())
  beforeEach(() => {
    cy.visit('/users/logout')
    cy.visit('/users/login')
  })

  it("rejects login for an invalid username", function () {
    cy.get('#username').type('not a real username')
    cy.get('#password').type('123')
    cy.get("form").submit()

    cy.contains("Unknown user").should('be.visible')
  });

  it("rejects login for an invalid password", function () {
    cy.get('#username').type('AutomatedTestUser')
    cy.get('#password').type('the wrong password')
    cy.get("form").submit()

    cy.contains("Incorrect password").should('be.visible')
  });

  it("accepts login for correct credentials", function () {
    cy.get('#username').type('AutomatedTestUser')
    cy.get('#password').type('123')
    cy.get("form").submit()

    cy.visit('/debug')
    cy.contains("AutomatedTestUser").should('be.visible')
  });
});

describe("User logout", () => {
  beforeEach(() => cy.request('/debug/login'))

  it("logs the user out", () => {
      cy.visit("/users/logout");
      cy.visit("/debug");
      cy.get('#user').should('contain', 'Not logged in')
  })
})