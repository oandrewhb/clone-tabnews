import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database.js";

const OK = 200;
const CREATED = 201;
const METHOD_NOT_ALLOWED = 405;
const INTERNAL_SERVER_ERROR = 500;

export default async function migrations(request, response) {
  try {
    if (request.method === "GET") {
      const pendingMigrations = await dryRunMigrations();
      return response.status(OK).json(pendingMigrations);
    }

    if (request.method === "POST") {
      const executedMigrations = await liveRunMigrations();
      const statusCode = executedMigrations.length ? CREATED : OK;
      return response.status(statusCode).json(executedMigrations);
    }

    return response
      .status(METHOD_NOT_ALLOWED)
      .json({ error: `Method ${request.method} not allowed` });
  } catch (e) {
    return response
      .status(INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
}

async function dryRunMigrations() {
  return await runMigrations({ dryRun: true });
}

async function liveRunMigrations() {
  return await runMigrations({ dryRun: false });
}

async function runMigrations(options = {}) {
  let dbClient;

  try {
    dbClient = database.getNewConnectedClient();

    const defaultMigrationOptions = {
      dbClient: dbClient,
      dryRun: true,
      dir: join("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    };

    return await migrationRunner({
      ...defaultMigrationOptions,
      ...options,
    });
  } catch (e) {
    console.error(e);
    throw e;
  } finally {
    if (dbClient) {
      await dbClient.end();
    }
  }
}
