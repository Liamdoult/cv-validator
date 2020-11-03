import { expect } from "chai";

import { obj } from "./data";

import { Validators } from "../src";

const { info } = Validators;

describe("infoObject", () => {
  describe("Should Fail", () => {
    it("Unknown fields", async () => {
      const badObj = {
        ...obj.info,
        ...{ badField: {}, anotherBadField: {} },
      };

      expect(info.bind(info, badObj)).to.throw(
        'Info Object:\n\tunknown field(s) ["badField", "anotherBadField"]'
      );
    });

    it("Missing required", async () => {
      const badObj = {};

      expect(info.bind(info, badObj)).to.throw(
        `Info Object:\n\tmissing required field(s) ["${["version"].join(
          '", "'
        )}]"`
      );
    });

    it("Invalid field type", async () => {
      const badObj = { ...obj.info, ...{ version: {} } };

      expect(info.bind(info, badObj)).to.throw(
        `Info Object:\n\t"version" field has invalid type`
      );
    });
  });
});
