
import successSchema from "../fixtures/schemas/200success.schema.json";
import { validateSchema } from "../support/assertions";


describe("API-001 Sample Health Check", () => {
    it("should return 200 and healthy status", () => {
        cy.allure().issue("API-001");

        cy.request({
            method: "GET",
            url: `${Cypress.env("BASE_URL")}/health`,
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("status", "healthy");
        });
    });

    it("should successfully create a new user", () => {
        cy.allure().issue("API-002");

        const body = {
            name: "John Doe",
            email: `user${Date.now()}@example.com`,
            password: "P@ssword123!"
        };

        cy.request({
            method: "POST",
            url: `${Cypress.env("BASE_URL")}/users`,
            headers: {
                "Content-Type": "application/json"
            },
            body: body
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property("id").and.to.be.a("string");
            expect(response.body).to.have.property("email", body.email);
        });
    });

    it("API-003 should validate schema for create user success", () => {
        cy.request("POST", `${Cypress.env("BASE_URL")}/users`, {
            name: "John Doe",
            email: `user${Date.now()}@example.com`,
            password: "P@ssword123!"
        }).then((response) => {
            expect(response.status).to.eq(201);
            validateSchema(response, successSchema);
        });
    });
});
