describe("Blog", () => {
  it("should create a note", () => {
    cy.visit("/");
    cy.get('input[data-testid="input-field"]').type("Today was a special day");
    cy.get('input[data-testid="input-note"]').type(
      "asdiasjdiajsidjaisjdiasjdas casjdnasndasicnasc"
    );
  });
});
