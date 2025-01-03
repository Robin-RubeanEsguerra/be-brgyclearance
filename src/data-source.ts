import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "redriot1016",
  database: "brgyclearance",
  synchronize: true,
  logging: false,
  entities: ["build/entity/*.js", "build/entity/**/*.js"],
  migrations: [],
  subscribers: [],
});
