import { expect } from "chai";

import { obj } from "./data";

import { Validators } from "../src";

const { workExperience } = Validators;

const objErrorDescription = "Work Experience Object:\n\t";

describe("workExperienceObject", () => {
  describe("Should Fail", () => {
    it("Unknown fields", async () => {
      const badObj = obj.workExperience.map((we) => {
        return { ...we, ...{ badField: {}, anotherBadField: {} } };
      });
      expect(workExperience.bind(workExperience, badObj)).to.throw(
        objErrorDescription + 'unknown field(s) ["badField", "anotherBadField"]'
      );
    });

    it("Missing required", async () => {
      const badObj = [{}];
      expect(workExperience.bind(workExperience, badObj)).to.throw(
        objErrorDescription +
          `missing required field(s) ["${["company", "position", "epoch"].join(
            '", "'
          )}]"`
      );
    });

    it("Invalid field type", async () => {
      const badObj = obj.workExperience.map((we) => {
        return { ...we, ...{ company: {} } };
      });
      expect(workExperience.bind(workExperience, badObj)).to.throw(
        objErrorDescription + '"company" field has invalid type'
      );
    });

    it("Not an Array", async () => {
      // Force type to bypass typescript at compile time. Since normally data
      // is not know at runtime.
      const badObj = {} as Array<{ [key: string]: any }>;
      expect(workExperience.bind(workExperience, badObj)).to.throw(
        objErrorDescription + "Should be of type Array"
      );
    });
  });
});
