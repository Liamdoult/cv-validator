import { expect } from "chai";

import { obj } from "./data";

import { Validators } from "../src";

const { achievements } = Validators;

describe("achievementsObject", () => {
  describe("Should Fail", () => {
    it("Unknown fields", async () => {
      const badObj = obj.achievements.map((we) => {
        return { ...we, ...{ badField: {}, anotherBadField: {} } };
      });

      expect(achievements.bind(achievements, badObj)).to.throw(
        'Achievements Object:\n\tunknown field(s) ["badField", "anotherBadField"]'
      );
    });

    it("Missing required", async () => {
      const badObj = [{}];

      expect(achievements.bind(achievements, badObj)).to.throw(
        `Achievements Object:\n\tmissing required field(s) ["${[
          "name",
          "received",
        ].join('", "')}]"`
      );
    });

    it("Invalid field type", async () => {
      const badObj = obj.achievements.map((we) => {
        return { ...we, ...{ name: {} } };
      });

      expect(achievements.bind(achievements, badObj)).to.throw(
        `Achievements Object:\n\t\"name\" field has invalid type`
      );
    });
  });
});
