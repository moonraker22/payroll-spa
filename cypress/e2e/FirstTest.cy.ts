/* global window */
//@ts-nocheck

describe('template spec', () => {
  it('passes', () => {
    cy.visit('/')
    cy.get('button').contains('Register').click()
    cy.url().should('include', '/register')
    cy.get('[id="google-button"]').click()
    cy.get('h1').contains('Sign-in with Google.com').should('be.visible')
  })
})

describe('', () => {})

// cy.findByRole('button', { name: /Jackie Chan/i }).click()
// cy.findByRole('button', { name: /Button Text/i }).should('exist')
// cy.findByRole('button', { name: /Non-existing Button Text/i }).should(
//   'not.exist'
// )
// cy.findByLabelText(/Label text/i, { timeout: 7000 }).should('exist')

// // findByRole _inside_ a form element
// cy.get('form')
//   .findByRole('button', { name: /Button Text/i })
//   .should('exist')
// cy.findByRole('dialog').within(() => {
//   cy.findByRole('button', { name: /confirm/i })
// })
