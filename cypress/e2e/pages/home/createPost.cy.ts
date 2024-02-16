import { DELAY_TIME } from "../utils"

describe('Create a note', () => {
  const POST_TITLE = 'Today was a special day'
  const POST_TEXT =
    'Ly of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentiLorem Ipsum'

  it('should create a note', () => {
    cy.visit('/')

    cy.get('input[name="title"]').should('be.visible')

    cy.get('textarea[name="note"]').should('be.visible')

    cy.intercept('GET', '**/dailyapi-deploy**').as('getPosts')

    cy.wait('@getPosts').its('response.statusCode').should('eq', 200)


    cy.get('input[name="title"]').type(POST_TITLE, {
      delay: DELAY_TIME,
    })

    cy.get('textarea[name="note"]').type(POST_TEXT, {
      delay: DELAY_TIME,
    })

    cy.intercept('POST', '**/blogs').as('createPost')

    cy.get('button[data-testid="send-button"]').click()

    cy.wait('@createPost').its('response.statusCode').should('eq', 201)

    cy.reload()

    cy.get('div[data-testid="posts"]').last().contains(POST_TITLE)
  })
})
