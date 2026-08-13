const nextJest = require("next/jest");
const dotenv = require("dotenv");

const createJestConfig = nextJest();
const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
});

dotenv.config({ path: "./.env.development" });

module.exports = jestConfig;
