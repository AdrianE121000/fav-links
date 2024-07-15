export const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'root',
  database: 'fav_links_db',
};

export const { SECRET_JWT_KEY = 'SECRET_JWT_KEY' } = process.env;
