import { DataSource } from "typeorm";
import dbConfig from "../config/database.config";

export const AppDataSource = new DataSource({ type: "postgres", ...dbConfig });
AppDataSource.initialize()
  .then(() => {
    console.log("Data source has been initialized!");
  })
  .catch((err) =>
    console.error("Error during Data Source initialization", err)
  );
export { Pill } from "./pill.entity";
export { User } from "./user.entity";
