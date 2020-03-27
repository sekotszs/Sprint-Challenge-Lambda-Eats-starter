describe("Testing our volunteer form", function() {
  beforeEach(function() {
    cy.visit("http://localhost:3000/");
  });
  it("Add test to inputs and submit form", function() {
    cy.get('input[name="name"]')
      .type("Zoe")
      .should("have.value", "Zoe");
      cy.get('[type="checkbox"]')
      .check();
    cy.get('input[name="instructions"]')
    .type("Pizzaaa")
    .should("have.value", "Pizzaaa");
      cy.get("button").click();
  });
});
