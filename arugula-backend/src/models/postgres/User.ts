"use strict";
import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
  tableName: "users",
  timestamps: true, // Automatically adds `createdAt` and `updatedAt` columns
})
class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  username!: string; // Changed name to username

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.TEXT, // To store HTML content for profile
    allowNull: true,
  })
  profile?: string; // Storing MySpace-type HTML code

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW, // Automatically sets the current timestamp
  })
  createdAt!: Date; // Sequelize automatically handles this due to timestamps
}

export default User;
