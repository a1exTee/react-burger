import { checkResponse } from "./data";

describe("Response checker", () => {
  it("Should be OK when get response SUCCSS", () => {
    const mockResponse = { ok: true, json: () => 200 };
    expect(checkResponse(mockResponse)).toEqual(200);
  });
});