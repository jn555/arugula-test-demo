import { Sequelize } from "sequelize-typescript";
import ComputeResource from "./ComputeResource.model";
import User from "./postgres/User";
import UserCredentials from "./postgres/UserCredentials";

const sequelize = new Sequelize({
  username: process.env.DB_USERNAME || "your_username",
  password: process.env.DB_PASSWORD || "your_password",
  database: process.env.DB_DATABASE || "compute_connect_dev",
  host: process.env.DB_HOST || "127.0.0.1",
  dialect: "postgres",
  models: [Provider, UserCredentials] // Load all models in the models folder
});

export default sequelize;