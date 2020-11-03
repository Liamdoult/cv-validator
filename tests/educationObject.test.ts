import { expect } from "chai";

import { obj } from "./data";

import { Validators } from "../src";

const { education } = Validators;

describe("educationObject", () => {
  describe("Should Fail", () => {
    it("Unknown fields", async () => {
      const badObj = obj.education.map((we) => {
        return { ...we, ...{ badField: {}, anotherBadField: {} } };
      });

      expect(education.bind(education, badObj)).to.throw(
        'Education Object:\n\tunknown field(s) ["badField", "anotherBadField"]'
      );
    });

    it("Missing required", async () => {
      const badObj = [{}];

      expect(education.bind(education, badObj)).to.throw(
        `Education Object:\n\tmissing required field(s) ["${[
          "school",
          "type",
          "epoch",
          "complete",
        ].join('", "')}]"`
      );
    });

    it("Invalid field type", async () => {
      const badObj = obj.education.map((we) => {
        return { ...we, ...{ school: {} } };
      });

      expect(education.bind(education, badObj)).to.throw(
        `Education Object:\n\t\"school\" field has invalid type`
      );
    });
  });
});
