import { expect } from "chai";

import { obj } from "./data";

import { Validators } from "../src";

const { person } = Validators;

describe("personObject", () => {
  describe("Should Fail", () => {
    it("Unknown fields", async () => {
      const badObj = {
        ...obj.person,
        ...{ badField: {}, anotherBadField: {} },
      };

      expect(person.bind(person, badObj)).to.throw(
        'Person Object:\n\tunknown field(s) ["badField", "anotherBadField"]'
      );
    });

    it("Missing required", async () => {
      const badObj = {};

      expect(person.bind(person, badObj)).to.throw(
        `Person Object:\n\tmissing required field(s) ["${[
          "firstname",
          "surname",
        ].join('", "')}]"`
      );
    });

    it("Invalid field type", async () => {
      const badObj = {
        ...obj.person,
        ...{ firstname: {} },
      };

      expect(person.bind(person, badObj)).to.throw(
        `Person Object:\n\t"firstname" field has invalid type`
      );
    });
  });
});
