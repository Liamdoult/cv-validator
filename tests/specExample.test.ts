import { expect } from "chai";
import fetch from "node-fetch";

import { validateRawJSON } from "../src";
import { validateRawYAML } from "../src";

describe("Validate Specification Examples", () => {
  it("json", async () => {
    const jsonFile = await fetch(
      "https://raw.githubusercontent.com/Liamdoult/curriculum-vitae-specification/main/Versions/1.0.0.json"
    );
    const rawJSON = await jsonFile.text();

    const result = validateRawJSON(rawJSON);
    expect(result).to.be.undefined;
  });

  it("yaml", async () => {
    const yamlFile = await fetch(
      "https://raw.githubusercontent.com/Liamdoult/curriculum-vitae-specification/main/Versions/1.0.0.yml"
    );
    const rawYAML = await yamlFile.text();

    const result = validateRawYAML(rawYAML);
    expect(result).to.be.undefined;
  });
});
