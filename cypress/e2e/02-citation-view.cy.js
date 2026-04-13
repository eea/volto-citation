import { slateBeforeEach, slateAfterEach } from '../support/e2e';

describe('Citation Block: View Mode Tests', () => {
  beforeEach(slateBeforeEach);
  afterEach(slateAfterEach);

  it('Citation Block: Add and save', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Citation View Test');
    cy.get('.documentFirstHeading').contains('Citation View Test');

    // Add citation block via slash command
    cy.getSlate().click().type('/citation{enter}');

    // Save without editing
    cy.get('#toolbar-save').click();

    cy.contains('Citation View Test');
  });
});