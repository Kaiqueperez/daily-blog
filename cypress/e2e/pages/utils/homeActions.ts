export function homePageActionsDeleteAndUpdateCase() {
  cy.visit(Cypress.env('local'))

  cy.get('input[name="title"]').should('be.visible')

  cy.get('textarea[name="note"]').should('be.visible')

  cy.intercept('GET', '**/dailyapi-deploy**').as('getPosts')

  cy.wait('@getPosts')

  cy.get('div[data-testid="posts"]').should('be.visible')
}

export const DELAY_TIME = 50
