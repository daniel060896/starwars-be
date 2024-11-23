import request from "supertest";
import axios from "axios";
import planetsPage1Data from "../data/planetsPage1Data.json";
import { router } from "../../src/app";

jest.mock("axios");

describe("List Planets", () => {
  it("List planets", async () => {
    /*
     * Given a list of 10 planets
     * When a list of planets is requested with page 1
     * Then it should result a list of those 10 planets
     */

    // List of 10 planets
    // @ts-ignore
    axios.get.mockResolvedValueOnce({ data: planetsPage1Data, statusCode: 200 });

    // request
    const resp = await request(router).get("/api/planets").query({ page: 1 });

    expect(resp.statusCode).toBe(200);
    //list of 10 planets
    expect(resp.body.results).toHaveLength(10);
  });
  it("List empty list of planets", async () => {
    /*
     * Given a page with no planets in the request
     * When a list of planets is requested with page 11
     * Then it should result an empty list of planets
     */

    // No planets
    // @ts-ignore
    axios.get.mockRejectedValueOnce({
      response: {
        detail: "Not found",
      },
    });

    // request
    const resp = await request(router).get("/api/planets").query({ page: 11 });

    expect(resp.statusCode).toBe(200);
    //list of 0 planets
    expect(resp.body.results).toHaveLength(0);
  });
});
