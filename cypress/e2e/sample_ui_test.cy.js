describe("UI-001 Sample Homepage Test", () => {
    it("should load the homepage and display the title text", () => {
        cy.visit("https://example.com");

        cy.contains("Example Domain").should("be.visible");
        cy.title().should("include", "Example Domain");
    });
});
