import { expect } from "chai";

import { obj } from "./data";

import { Validators } from "../src";

const { links } = Validators;

describe("linksObject", () => {
  describe("Should Pass", () => {
    it("No keys", async () => {
      const newObj = {};

      expect(links(newObj)).to.be.undefined;
    });
  });

  describe("Should Fail", () => {
    it("Unknown fields", async () => {
      const badObj = {
        ...obj.links,
        ...{ badField: {}, anotherBadField: {} },
      };

      expect(links.bind(links, badObj)).to.throw(
        'Links Object:\n\tunknown field(s) ["badField", "anotherBadField"]'
      );
    });

    it("Invalid field type", async () => {
      const badObj = { ...obj.links, ...{ youtube: {} } };

      expect(links.bind(links, badObj)).to.throw(
        `Links Object:\n\t"youtube" field has invalid type`
      );
    });
  });
});
