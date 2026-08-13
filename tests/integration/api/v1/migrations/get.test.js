import database from "infra/database";

beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

test("GET to api/v1/migrations should return pending migrations and status code 200 ", async () => {
  // obtém as migrations pela primeira vez, sem rodar
  const firstResponse = await fetchGetMigrations();
  const firstResponseBody = await firstResponse.json();

  // deve retornar status code 200
  expect(firstResponse.status).toBe(200);

  // o retorno deve ser um array
  expect(Array.isArray(firstResponseBody)).toBe(true);

  // deve retornar mais do que uma migration
  expect(firstResponseBody.length).toBeGreaterThan(0);

  // a quantidade de migrations rodada deve ser zero
  const migrationCount = await getMigrationCount();
  expect(migrationCount).toBe(0);

  // obtém as migrations novamente
  const secondResponse = await fetchGetMigrations();
  const secondResponseBody = await secondResponse.json();

  // deve retornar status code 200 novamente
  expect(secondResponse.status).toBe(200);

  // o retorno deve ser um array
  expect(Array.isArray(secondResponseBody)).toBe(true);

  // o segundo retorno deve ser igual ao primeiro retorno
  expect(isArrayEquals(firstResponseBody, secondResponseBody)).toBe(true);
});

async function fetchGetMigrations() {
  return await fetch("http://localhost:3000/api/v1/migrations", {
    method: "GET",
  });
}

function isArrayEquals(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  return JSON.stringify(arr1) === JSON.stringify(arr2);
}

async function getMigrationCount() {
  const result = await database.query("select count(*)::int from pgmigrations");
  return result.rows[0].count;
}
