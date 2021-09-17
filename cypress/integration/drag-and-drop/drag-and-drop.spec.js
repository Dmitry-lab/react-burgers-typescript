describe("drag-and-drop works correctly", function () {
  before(function () {
    cy.visit("http://localhost:3000");
  });

  it("should drag and drop bun ingridient", function () {
    cy.get('[data-test="ingredients-list"]').as("ingredients-list");

    cy.get('[data-test="constructor-list"]').as("constructor-list");

    cy.get("@ingredients-list")
      .find("a")
      .contains("Краторная булка N-200i")
      .as("ingridient-card");

    cy.get("@ingridient-card").trigger("dragstart");

    cy.get("@constructor-list").trigger("drop");
  });

  it("should drag and drop sauce ingridient", function () {
    cy.get('[data-test="ingredients-list"]').as("ingredients-list");

    cy.get('[data-test="constructor-list"]').as("constructor-list");

    cy.get("@ingredients-list")
      .find("a")
      .contains("Соус Spicy-X")
      .as("ingridient-card");

    cy.get("@ingridient-card").trigger("dragstart");

    cy.get("@constructor-list").trigger("drop");
  });

});
