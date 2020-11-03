import { expect } from "chai";

/**
 * https://stackoverflow.com/a/56104568/14135101
 */
export const expectThrowsAsync = async (
  method: () => {},
  errorMessage: String
) => {
  let error = null;
  try {
    await method();
  } catch (err) {
    error = err;
  }
  expect(error).to.be.an("Error");
  if (errorMessage) expect(error.message).to.equal(errorMessage);
};
