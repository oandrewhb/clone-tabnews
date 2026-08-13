import database from "infra/database";

beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

test("POST to api/v1/migrations should live run migrations, return executed migrations and status code 200", async () => {
  // roda as migrations pela primeira vez
  const firstResponse = await fetchPostMigrations();
  const firstResponseBody = await firstResponse.json();

  // deve retornar status code 201, porque foi aplicado alteração no banco
  expect(firstResponse.status).toBe(201);

  // o retorno deve ser um array
  expect(Array.isArray(firstResponseBody)).toBe(true);

  // deve retornar mais do que uma migration
  expect(firstResponseBody.length).toBeGreaterThan(0);

  // o tamanho do retorno deve ser igual a quantidade de migrations rodada
  const migrationCount = await getMigrationCount();
  expect(firstResponseBody.length).toBe(migrationCount);

  // roda as migrations novamente
  const secondResponse = await fetchPostMigrations();
  const secondResponseBody = await secondResponse.json();

  // deve retornar status code 200, porque dessa vez não houve alteração no banco
  expect(secondResponse.status).toBe(200);

  // o retorno deve ser um array
  expect(Array.isArray(secondResponseBody)).toBe(true);

  // deve retornar um array vazio
  expect(secondResponseBody.length).toBe(0);
});

async function fetchPostMigrations() {
  return await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
}

async function getMigrationCount() {
  const result = await database.query("select count(*)::int from pgmigrations");
  return result.rows[0].count;
}
