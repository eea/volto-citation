import { slateBeforeEach, slateAfterEach } from '../support/e2e';

describe('Blocks Tests', () => {
  beforeEach(slateBeforeEach);
  afterEach(slateAfterEach);

  it('Citation Block', () => {
    // Change page title
    cy.clearSlateTitle();
    cy.getSlateTitle().type('My Citation Page');

    cy.get('.documentFirstHeading').contains('My Citation Page');

    cy.getSlate().click();

    // Add block

    cy.get('.ui.basic.icon.button.block-add-button')
      .first()
      .click()
      .type('citation');
    cy.get('.citation').click();

    cy.get('#field-url').click().type('www.eeacitation.com');
    cy.get('#blockform-fieldset-default #field-title').click().type('Citation');

    cy.get(' #field-year').click().type('2023');

    cy.get('.add-item-button-wrapper').click();
    cy.get('#field-author-0-authors-0').click().type('Developers E.');
    cy.get('blockquote').contains('(2023)');
    cy.get('blockquote').contains('Citation');
    cy.get('blockquote').contains('Developers E.');
    cy.get('blockquote').contains('http://www.eeacitation.com');
    cy.get('.citation-block a').first().next().click();
    cy.get('pre').contains(
      'Developers E. (2023). Citation. http://www.eeacitation.com',
    );
    cy.get('.citation-block a').first().next().next().click();
    cy.get('pre').contains('TY  - JOUR');
    cy.get('pre').contains('DA  - 2023///');
    cy.get('pre').contains('TI  - Citation');
    cy.get('pre').contains('UR  - http://www.eeacitation.com');
    cy.get('.citation-block a').first().next().next().next().click();
    cy.get('pre').contains('author = {{Developers E.}},');
    cy.get('pre').contains('year = {2023},');
    cy.get('pre').contains('title = {Citation},');
    cy.get('pre').contains('howpublished = {http://www.eeacitation.com},');
    cy.get('.citation-block a').first().click();

    // Save
    cy.get('#toolbar-save').click();
    cy.wait(5000);

    //test view
    cy.get('blockquote').contains('(2023)');
    cy.get('blockquote').contains('Citation');
    cy.get('blockquote').contains('Developers E.');
    cy.get('blockquote').contains('http://www.eeacitation.com');
    cy.get('.citation-block a').first().next().click();
    cy.get('pre').contains(
      'Developers E. (2023). Citation. http://www.eeacitation.com',
    );
    cy.get('.citation-block a').first().next().next().click();
    cy.get('pre').contains('TY  - JOUR');
    cy.get('pre').contains('DA  - 2023///');
    cy.get('pre').contains('TI  - Citation');
    cy.get('pre').contains('UR  - http://www.eeacitation.com');
    cy.get('.citation-block a').first().next().next().next().click();
    cy.get('pre').contains('author = {{Developers E.}},');
    cy.get('pre').contains('year = {2023},');
    cy.get('pre').contains('title = {Citation},');
    cy.get('pre').contains('howpublished = {http://www.eeacitation.com},');

    //test url
    cy.url().should('eq', Cypress.config().baseUrl + '/cypress/my-page');
  });
});
