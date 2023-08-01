import { cleanEnv, num, port, str, url } from "envalid";
import { config } from "dotenv";

config();

export default cleanEnv(process.env, {
  DB_URI: str(),
  PORT: port(),
  ALLOWED_ROUTE: url(),
  SALT: num(),
});
