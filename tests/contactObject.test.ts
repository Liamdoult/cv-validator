import { expect } from "chai";

import { obj } from "./data";

import { Validators } from "../src";

const { contact } = Validators;

describe("contactObject", () => {
  describe("Should Fail", () => {
    it("Unknown fields", async () => {
      const badObj = {
        ...obj.contact,
        ...{ badField: {}, anotherBadField: {} },
      };

      expect(contact.bind(contact, badObj)).to.throw(
        'Contact Object:\n\tunknown field(s) ["badField", "anotherBadField"]'
      );
    });

    it("Missing required", async () => {
      const badObj = {};

      expect(contact.bind(contact, badObj)).to.throw(
        `Contact Object:\n\tmissing required field(s) ["${["email"].join(
          '", "'
        )}]"`
      );
    });

    it("Invalid field type", async () => {
      const badObj = { ...obj.contact, ...{ email: {} } };

      expect(contact.bind(contact, badObj)).to.throw(
        `Contact Object:\n\t\"email\" field has invalid type`
      );
    });
  });
});
