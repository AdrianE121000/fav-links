import mysql from 'mysql2/promise';
import { config } from '../config.js';

const connection = await mysql.createConnection(config);
export class LinkModel {
  static async getLinks({ id }) {
    const [links] = await connection.query(
      'SELECT * FROM links WHERE user_id = ?;',
      [id]
    );

    return links;
  }

  static async createLink({ input }) {
    const { title, url, description, user_id } = input;

    try {
      const [newLink] = await connection.query(
        'INSERT INTO links (title, url, description, user_id) VALUES (?, ?, ?, ?) ;',
        [title, url, description, user_id]
      );

      const { insertId } = newLink;

      const [link] = await connection.query(
        'SELECT title, url, description FROM links WHERE id = ?;',
        [insertId]
      );

      return link[0];
    } catch (err) {
      console.log('Se produjo un error!');
    }
  }

  static async deleteLink({ id }) {
    try {
      const [link] = await connection.query('DELETE FROM links WHERE id = ?;', [
        id,
      ]);

      return link.affectedRows === 1;
    } catch (err) {
      console.log('Se produjo un error!');
    }
  }

  static async updateLink({ id, input }) {
    const { title, url, description } = input;

    const [link] = await connection.query(
      'SELECT title, url, description FROM links WHERE id = ?;',
      [id]
    );

    try {
      const [result] = await connection.query(
        'UPDATE links SET title = ?, url = ?, description = ? WHERE id = ?;',
        [
          title === undefined ? link[0].title : title,
          url === undefined ? link[0].url : url,
          description === undefined ? link[0].description : description,
          id,
        ]
      );

      return result.affectedRows === 1;
    } catch (err) {
      console.log('Se produjo un error');
    }
  }
}
