import { DELAY_TIME, homePageActionsDeleteAndUpdateCase } from "../utils"

describe('Update a Post', () => {
  it('should update a note', () => {
    homePageActionsDeleteAndUpdateCase()

    cy.get('a[data-testid="redirect-link-edit"]').first().click()

    cy.url().should('include', '/edit-blog')

    cy.get('input[name="title"]')
      .clear()
      .type('Title edited by cypress automation', {
        delay: DELAY_TIME,
      })

    cy.get('textarea[name="note"]')
      .clear()
      .type(
        'Lorem ipsum apsdpasldka la ele 0000 asodkaoskd caosdoaksdokasokd muaa asd xingondosadas china',
        { delay: DELAY_TIME }
      )

    cy.intercept('PUT', '**/post/**').as('updatePost')

    cy.get('button[data-testid="send-button"]').click()

    cy.wait('@updatePost').its('response.statusCode').should('eq', 200)
  })
})
