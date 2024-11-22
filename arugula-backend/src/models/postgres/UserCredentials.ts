import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BeforeCreate,
  BeforeUpdate
} from "sequelize-typescript";
import bcrypt from "bcrypt";
import User from "./User"; // Import the User model

@Table({
  tableName: "user_credentials",
  timestamps: true, // This will add createdAt and updatedAt for credentials
})
class UserCredentials extends Model {
  @ForeignKey(() => User) // Create a foreign key to the User table
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4, // Auto-generates UUID
    primaryKey: true,
  })
  userId!: string; // Link credentials to a specific user

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string; // Storing the password (hashed, preferably)

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  passwordSalt?: string; // Optional, for storing salt if using hashing

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW, // Automatically set the timestamp
  })
  createdAt!: Date; // Created timestamp for the credentials


  /**
   * Hook to hash the password before creating a new record
   */
  @BeforeCreate
  static async hashPasswordBeforeCreate(instance: UserCredentials): Promise<void> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    instance.password = await bcrypt.hash(instance.password, salt);
    instance.passwordSalt = salt; // Optional: storing the salt explicitly
  }

  /**
   * Hook to hash the password before updating a record
   */
  @BeforeUpdate
  static async hashPasswordBeforeUpdate(instance: UserCredentials): Promise<void> {
    if (instance.changed("password")) {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      instance.password = await bcrypt.hash(instance.password, salt);
      instance.passwordSalt = salt; // Optional: storing the salt explicitly
    }
  }

  /**
   * Method to verify a plain-text password against the hashed password
   */
  async verifyPassword(plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.password);
  }
}

export default UserCredentials;
