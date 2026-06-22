import database from "infra/database.js";

export default async function status(request, response) {
  const result = await database.query("select 1 + 1 as soma;");
  console.log(result.rows);
  response.status(200);
  response.json({ chave: "top de mais essa api!" });
}
