import { expect } from "chai";

import { validateRawJSON } from "../src";
import { validateRawYAML } from "../src";

describe("JSON", () => {
  describe("Should Fail", () => {
    it("Empty input", async () => {
      const raw = "";

      expect(validateRawJSON.bind(validateRawJSON, raw)).to.throw(
        "CVS Requires Content"
      );
    });
  });
});

describe("YAML", () => {
  describe("Should Fail", () => {
    it("Empty input", async () => {
      const raw = "";

      expect(validateRawYAML.bind(validateRawYAML, raw)).to.throw(
        "CVS Requires Content"
      );
    });
  });
});
