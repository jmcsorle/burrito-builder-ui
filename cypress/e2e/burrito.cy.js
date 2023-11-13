describe('Should show order page with existing orders and a form for creating new orders', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      statusCode: 200,
      fixture: 'burrito',
    })
      .as('getOrders')
      .visit('http://localhost:3000/');
    cy.wait('@getOrders');
  });
  it('Should show a heading, a form, and some existing orders when the user first visits the page', () => {
    cy.get('h1')
      .should('contain', 'Burrito Builder')
      .get('.order-form')
      .children()
      .should('have.length', 4)
      .get('#name')
      .invoke('attr', 'placeholder')
      .should('eq', 'Name')
      .get('[data-testid="ingredient-buttons"] button')
      .first()
      .should('contain', 'beans')
      .get('[data-testid="ingredient-buttons"] button')
      .last()
      .should('contain', 'sour cream')
      .get('.default-message')
      .should('contain', 'New Order: Nothing is selected yet.')
      .get('.submit-button')
      .should('contain', 'Submit Order')
      .get('.current-orders')
      .first()
      .contains('h3', 'Pat')
      .get(':nth-child(1) > .ingredient-list > :nth-child(1)')
      .should('contain', 'beans')
      .get(':nth-child(1) > .ingredient-list > :nth-child(2)')
      .should('contain', 'lettuce')
      .get(':nth-child(1) > .ingredient-list > :nth-child(3)')
      .should('contain', 'carnitas')
      .get(':nth-child(1) > .ingredient-list > :nth-child(4)')
      .should('contain', 'queso fresco')
      .get(':nth-child(1) > .ingredient-list > :nth-child(5)')
      .should('contain', 'jalapeno')
      .get('.current-orders')
      .last()
      .contains('h3', 'Alex')
      .get(':nth-child(3) > .ingredient-list > :nth-child(1)')
      .should('contain', 'sofritas')
      .get(':nth-child(3) > .ingredient-list > :nth-child(2)')
      .should('contain', 'beans')
      .get(':nth-child(3) > .ingredient-list > :nth-child(3)')
      .should('contain', 'sour cream')
      .get(':nth-child(3) > .ingredient-list > :nth-child(4)')
      .should('contain', 'carnitas')
      .get(':nth-child(3) > .ingredient-list > :nth-child(5)')
      .should('contain', 'queso fresco');
  });
  it('Should allow a user to add an order', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
      statusCode: 201,
      body: {
        id: 4,
        name: 'turtle',
        ingredients: ['carnitas', 'jalapenos'],
      },
    });
    cy.get('#name')
      .type('turtle')
      .should('have.value', 'turtle')
      .get('[name="carnitas"]')
      .click()
      .get('[name="jalapenos"]')
      .click()
      .get('.submit-button')
      .click()
      .get('.current-orders')
      .last()
      .contains('h3', 'turtle')
      .get(':nth-child(4) > .ingredient-list > :nth-child(1)')
      .should('contain', 'carnitas')
      .get(':nth-child(4) > .ingredient-list > :nth-child(2)')
      .should('contain', 'jalapenos');
  });
  it('Should not allow an order to be submitted without both a name and ingredients', () => {
    cy.get('#name')
      .type('turtle')
      .should('have.value', 'turtle')
      .get('.submit-button')
      .click()
      .get('.error')
      .should(
        'contain',
        "We're sorry. Your order is incomplete. Please provide both a name and ingredients to complete your order."
      );
  });
});
