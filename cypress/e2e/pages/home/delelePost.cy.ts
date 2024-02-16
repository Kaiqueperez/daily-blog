import { homePageActionsDeleteAndUpdateCase } from "../utils"

describe('Delete a note', () => {
  it('should delete a note', () => {
    homePageActionsDeleteAndUpdateCase()

    cy.get('button[data-testid="delete-button"]').first().click()

    cy.intercept('DELETE', '**/blog/**').as('deletePost')

    cy.get('button[data-testid="button-delete-post"]').click()

    cy.wait('@deletePost').its('response.statusCode').should('eq', 200)
  })
})
