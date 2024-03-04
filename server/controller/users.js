import { validateUser } from '../schema/users.js';
import pkg from 'jsonwebtoken';

const { sign } = pkg;

export class UserControllers {
  constructor({ UserModel }) {
    this.UserModel = UserModel;
  }

  getUser = async (req, res) => {
    const { password } = req.body;
    const { username } = req.params;

    const [user] = await this.UserModel.getUser({ username });

    if (user === undefined) {
      return res.status(404).json({ message: 'User Not Found' });
    } else if (user.password !== password) {
      return res.status(401).json({ message: 'Wrong password' });
    }

    const token = sign({ username }, 'Stack', {
      expiresIn: '2m',
    });
    res.json({ user, token });
  };

  createUser = async (req, res) => {
    const result = validateUser(req.body);

    if (result.error)
      return res.status(400).json({ error: JSON.parse(result.error.message) });

    const newUser = await this.UserModel.createUser({ input: result.data });

    const { username } = result.data;

    if (newUser?.message)
      return res.status(400).json({ message: 'User Already Exist' });

    const token = sign({ username }, 'Stack', {
      expiresIn: '2m',
    });
    res.status(201).json({ newUser, token });
  };
}
