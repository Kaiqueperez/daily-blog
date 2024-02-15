describe('Create a Post', () => {
  const POST_TITLE = 'Today was a special day'
  const POST_TEXT =
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum'
  const DELAY_TIME = 50
  it('should create a note', () => {
    cy.visit('/')

    cy.get('input[name="title"]').should('be.visible')

    cy.get('textarea[name="note"]').should('be.visible')

    cy.intercept('GET', '**/dailyapi-deploy**').as('getPosts')

    cy.wait('@getPosts')

    cy.get('div[data-testid="posts"]').should('be.visible')

    cy.get('input[name="title"]').type(POST_TITLE, {
      delay: DELAY_TIME,
    })

    cy.get('textarea[name="note"]').type(POST_TEXT, {
      delay: DELAY_TIME,
    })

    cy.intercept('POST', '**/blogs').as('createPost')

    cy.get('button[data-testid="send-button"]').click()

    cy.wait('@createPost').its('response.statusCode').should('eq', 201)
  })
})
