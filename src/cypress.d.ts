import { mount } from 'cypress/react'

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
    interface Chainable<Subject = any> {
      // let TS know we have a custom command cy.clickLink(...)
      clickLink(label: string | number | RegExp): void
    }
  }
}
