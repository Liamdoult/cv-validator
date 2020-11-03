import { expect } from "chai";

import { obj } from "./data";

import { Validators } from "../src";

const { cvs } = Validators;

describe("cvsObject", () => {
  it("Should Pass", async () => {
    expect(cvs(obj));
  });

  describe("Should Fail", () => {
    it("Unknown fields", async () => {
      const badObj = { ...{ badField: {}, anotherBadField: {} }, ...obj };

      expect(cvs.bind(cvs, badObj)).to.throw(
        'CVS Object:\n\tunknown field(s) ["badField", "anotherBadField"]'
      );
    });

    it("Missing required", async () => {
      const badObj = {};

      expect(cvs.bind(cvs, badObj)).to.throw(
        `CVS Object:\n\tmissing required field(s) ["${[
          "cvs",
          "info",
          "person",
          "contact",
        ].join('", "')}]"`
      );
    });
  });
});
