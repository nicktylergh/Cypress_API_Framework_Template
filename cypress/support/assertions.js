import chaiJsonSchemaAjv from "chai-json-schema-ajv";
chai.use(chaiJsonSchemaAjv);

export function validateSchema(response, schema) {
    expect(response.body).to.be.jsonSchema(schema);
}