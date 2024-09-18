import mysql from "mysql2/promise";
import { config } from "../config.js";

const connection = await mysql.createConnection(config);

export class GroupModel {
  static async getGroups({ id }) {
    const [groups] = await connection.query(
      "SELECT * FROM categories WHERE user_id = ?;",
      [id]
    );

    return groups;
  }

  static async getGroupName({ id }) {
    const [groupName] = await connection.query(
      "SELECT name FROM categories WHERE id = ?;",
      [id]
    );

    return groupName;
  }

  static async createGroup({ input, user_id }) {
    const { name } = input;

    try {
      const [newGroup] = await connection.query(
        "INSERT INTO categories (user_id, name) VALUES (?, ?);",
        [user_id, name]
      );

      return newGroup.affectedRows === 1;
    } catch (error) {
      console.log("se produjo un error");
    }
  }

  static async addLinkToGroup({ group_name, link_id, user_id }) {
    try {
      const [group] = await connection.query(
        "SELECT * FROM categories WHERE name = ? AND user_id = ?;",
        [group_name, user_id]
      );

      const category_id = group[0].id;

      const [result] = await connection.query(
        "UPDATE links SET category_id = ? WHERE id = ?;",
        [category_id, link_id]
      );

      return result.affectedRows === 1;
    } catch (error) {
      console.log("se produjo un error");
    }
  }

  static async getLinksFromGroup({ group_name, userId }) {
    try {
      const [groupLinks] = await connection.query(
        "SELECT L.id, L.title, L.url, L.description, L.user_id, L.category_id, L.created_at FROM links L JOIN categories C ON L.category_id = C.id WHERE C.name = ? AND C.user_id = ?;",
        [group_name, userId]
      );

      return groupLinks;
    } catch (error) {
      console.log("se produjo un error");
    }
  }
}
