const request = require("supertest");
const app = require("../../app");
const fetchMock = require("jest-fetch-mock");
const nock = require("nock");

global.fetch = fetchMock;
const PAYMENT_API_KEY = process.env.PAYMENT_API_KEY;

describe("POST /payments", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    nock.cleanAll();
  });

  it("should respond with 400 if request body is missing fields", async () => {
    const response = await request(app)
      .post("/api/payments")
      .send({ name: "John Doe" }); // missing cardNumber, currency, and amount fields
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it("should respond with 400 if cardNumber is invalid", async () => {
    const response = await request(app).post("/api/payments").send({
      name: "John Doe",
      cardNumber: "invalid-card-number",
      currency: "USD",
      amount: 10.0,
    });
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it("should respond with 200 if request body is valid", async () => {
    const paymentApiResponse = {
      name: "John Doe",
      cardNumber: "4111111111111111", // a valid credit card number
      currency: "USD",
      amount: 10.0,
    };

    // Mock the Payment API response
    nock("http://localhost:3002")
      .post("/api/payments")
      .reply(200, paymentApiResponse);

    fetchMock.mockResponseOnce(JSON.stringify(paymentApiResponse));

    const response = await request(app).post("/api/payments").send({
      name: "John Doe",
      cardNumber: "4111111111111111", // a valid credit card number
      currency: "USD",
      amount: 10.0,
    });

    expect(response.body).toStrictEqual(paymentApiResponse);
    expect(response.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:3002/api/payments",
      {
        body: JSON.stringify(paymentApiResponse),
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": PAYMENT_API_KEY,
        },
        method: "POST",
      }
    );
  });
});
