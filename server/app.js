import express, { json } from 'express';
import { corsMiddleware } from './middleware/cors.js';
import { createLinkRouter } from './routes/links.js';
import { createUserRouter } from './routes/users.js';
import { LinkModel } from './model/links.js';
import { UserModel } from './model/users.js';

const app = express();
app.disable('x-powered-by');
app.use(corsMiddleware());
app.use(json());

app.use('/links', createLinkRouter({ LinkModel }));

app.use('/users', createUserRouter({ UserModel }));

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
