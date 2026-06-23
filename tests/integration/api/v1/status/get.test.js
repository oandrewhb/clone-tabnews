const url = "http://localhost:3000/api/v1/status";

test("GET to api/v1/status should return 200", async () => {
  const response = await fetch(url);
  expect(response.status).toBe(200);
});

test("GET to api/v1/status should return updated_at", async () => {
  const response = await fetch(url);
  const responseBody = await response.json();

  expect(responseBody.updated_at).toBeDefined();
  expect(responseBody.updated_at).toBeTruthy();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);
});

test("GET to api/v1/status should return database version", async () => {
  const response = await fetch(url);
  const responseBody = await response.json();

  expect(responseBody.dependencies.database.version).toBeDefined();
  expect(responseBody.dependencies.database.version).toBeTruthy();
  expect(responseBody.dependencies.database.version).toEqual("16.0");
});

test("GET to api/v1/status should return database max_connections", async () => {
  const response = await fetch(url);
  const responseBody = await response.json();

  expect(responseBody.dependencies.database.max_connections).toBeDefined();
  expect(responseBody.dependencies.database.max_connections).toBeTruthy();
  expect(responseBody.dependencies.database.max_connections).toEqual(100);
});

test("GET to api/v1/status should return database opened_connections", async () => {
  const response = await fetch(url);
  const responseBody = await response.json();

  expect(responseBody.dependencies.database.opened_connections).toBeDefined();
  expect(responseBody.dependencies.database.opened_connections).toBeTruthy();
  expect(responseBody.dependencies.database.opened_connections).toEqual(1);
});
