describe('Create a Post', () => {
  it('should create a note', () => {
    cy.visit(Cypress.env('local'))

    cy.get('input[name="title"]').should('be.visible')

    cy.get('textarea[name="note"]').should('be.visible')

    cy.intercept('GET', '**/dailyapi-deploy**').as('getPosts')

    cy.wait('@getPosts')

    cy.get('div[data-testid="posts"]').should('be.visible')

    cy.get('button[id="post-5"]').click()
  })
})
