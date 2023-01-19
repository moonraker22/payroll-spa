/// <reference types="cypress" />
//@ts-nocheck
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
// Cypress.Commands.add('login', (username, password) => {
//   cy.visit('/login')

//   cy.get('input[name=username]').type(username)

//   // {enter} causes the form to submit
//   cy.get('input[name=password]').type(`${password}{enter}`, { log: false })

//   // we should be redirected to /dashboard
//   cy.url().should('include', '/dashboard')

//   // our auth cookie should be present
//   cy.getCookie('your-session-cookie').should('exist')

//   // UI should reflect this user being logged in
//   cy.get('h1').should('contain', username)
// })
import '@testing-library/cypress/add-commands'

Cypress.Commands.add('clickLink', (label: string | number | RegExp) => {
  cy.get('a').contains(label).click()
})
