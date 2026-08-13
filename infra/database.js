import { Client } from "pg";

async function query(queryObject) {
  let client;

  try {
    client = getNewConnectedClient();
    const result = await client.query(queryObject);
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  } finally {
    await client.end();
  }
}

function getNewConnectedClient() {
  const credentials = {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSSLValues(),
  };
  const client = new Client(credentials);
  client.connect();
  return client;
}

function getSSLValues() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }

  const noSslEnvironments = ["development", "test"];
  return noSslEnvironments.includes(process.env.NODE_ENV) ? false : true;
}

export default {
  query,
  getNewConnectedClient,
};
