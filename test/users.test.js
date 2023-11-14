import chai from "chai";
import supertest from "supertest";
import { faker } from "@faker-js/faker";
const expect = chai.expect;
const requester = supertest("http://localhost:8080");

const generateRandomUser = () => {
  const randomUser = {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    dni: faker.datatype.number().toString(),
    birthDate: faker.date.past().toISOString().split("T")[0],
  };
  return randomUser;
};

describe("Test de practica integradora", () => {
  describe("Test de users", () => {
    const randomUser = generateRandomUser();
    let tempUserCreatede = {};
    let newUpdatedUser = {};
    console.log(randomUser);

    it("Tenemos conexion a la base de datos al hacer un get all", async () => {
      const { statusCode, ok, _body } = await requester
        .get("/api/users")
        .send();
      expect(_body.payload).to.be.an("array");
      expect(_body.payload[0]).to.have.property("_id");
    });
    it("Creamos un usuario random", async () => {
      const { statusCode, ok, _body } = await requester
        .post("/api/users")
        .send(randomUser);
      tempUserCreatede = _body.payload;

      expect(statusCode).to.be.equal(200);
      expect(ok).to.be.true;
      expect(_body.status).equal("success");
      expect(_body.payload).to.have.property("_id");
    });
    it("Actualizamos los datos del usuario temporal", async () => {
      newUpdatedUser = generateRandomUser();
      const { statusCode, ok, _body } = await requester
        .put("/api/users/" + tempUserCreatede._id)
        .send(newUpdatedUser);
      expect(statusCode).to.be.equal(200);
      expect(ok).to.be.true;
      expect(_body.status).equal("success");
    });

    it("Borramos el temporal usuario creado ", async () => {
      const { statusCode, ok, _body } = await requester
        .delete("/api/users/" + tempUserCreatede._id)
        .send();
      console.log("First data user", tempUserCreatede);
      console.log("Updated data user", newUpdatedUser);
      expect(_body.message).to.be.equal("User deleted");
    });
  });
});
