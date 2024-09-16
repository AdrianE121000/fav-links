import mysql from "mysql2/promise";
import { config } from "../config.js";

const connection = await mysql.createConnection(config);

export class UserModel {
  static async getUser({ username }) {
    const [user] = await connection.query(
      "SELECT * FROM users WHERE username = ?;",
      [username]
    );

    return user;
  }

  static async createUser({ input }) {
    const { username, password, fullname } = input;

    const [userExist] = await connection.query(
      "SELECT username, password, fullname FROM users WHERE username = ?;",
      [username]
    );

    if (userExist.length !== 0) return { message: "User already exist" };

    await connection.query(
      "INSERT INTO users (username, password, fullname) VALUES (?, ?, ?);",
      [username, password, fullname]
    );

    const [user] = await connection.query(
      "SELECT * FROM users WHERE username = ?;",
      [username]
    );

    return user;
  }

  static async deleteUser({ id }) {
    try {
      await connection.query("DELETE FROM links WHERE user_id = ?;", [id]);
      await connection.query("DELETE FROM categories WHERE user_id = ?;", [id]);

      const [user] = await connection.query("DELETE FROM users WHERE id = ?;", [
        id,
      ]);

      return user.affectedRows === 1;
    } catch (error) {
      console.log("Se produjo un error!");
    }
  }

  static async updateUser({ id, input }) {
    const { username, password, fullname } = input;

    const [user] = await connection.query("SELECT * FROM users WHERE id = ?;", [
      id,
    ]);

    const [userExist] = await connection.query(
      "SELECT * FROM users WHERE username = ?;",
      [username]
    );

    if (userExist[0]) {
      return false;
    }

    const [result] = await connection.query(
      "UPDATE users SET username = ?, password = ?, fullname = ? WHERE id = ?;",
      [
        username === undefined ? user[0].username : username,
        password === "" ? user[0].password : password,
        fullname === undefined ? user[0].fullname : fullname,
        id,
      ]
    );

    const [updatedUser] = await connection.query(
      "SELECT id, username, fullname FROM users WHERE id = ?;",
      [id]
    );

    return updatedUser;
  }
}
