import database from "infra/database";

beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

test("DELETE to api/v1/migrations should return status code 405 with error body and no opened connections", async () => {
  const response = await fetchMigrationsWithMethod("DELETE");
  expect(response.status).toBe(405);

  const responseBody = await response.json();
  expect(JSON.stringify(responseBody)).toBe(
    JSON.stringify({ error: "Method DELETE not allowed" }),
  );

  const openedConections = await getOpenedConnections();
  expect(openedConections).toBe(1);
});

test("PUT to api/v1/migrations should return status code 405 with error body and no opened connections", async () => {
  const response = await fetchMigrationsWithMethod("PUT");
  expect(response.status).toBe(405);

  const responseBody = await response.json();
  expect(JSON.stringify(responseBody)).toBe(
    JSON.stringify({ error: "Method PUT not allowed" }),
  );

  const openedConections = await getOpenedConnections();
  expect(openedConections).toBe(1);
});

async function fetchMigrationsWithMethod(method) {
  return await fetch("http://localhost:3000/api/v1/migrations", {
    method: method,
  });
}

async function getOpenedConnections() {
  const databaseName = process.env.POSTGRES_DB;
  const result = await database.query({
    text: "select count(*)::int from pg_stat_activity where datname = $1;",
    values: [databaseName],
  });
  return result.rows[0].count;
}
