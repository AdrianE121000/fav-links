import { validateUser } from '../schema/users.js';
import pkg from 'jsonwebtoken';
import { EncryptPassword } from '../utils.js';

const { sign } = pkg;

export class UserControllers {
  constructor({ UserModel }) {
    this.UserModel = UserModel;
  }

  getUser = async (req, res) => {
    const { password } = req.body;
    const { username } = req.params;

    const encryptedPassword = EncryptPassword(password);

    const [user] = await this.UserModel.getUser({ username });

    if (user === undefined) {
      return res.status(404).json({ message: 'User Not Found' });
    } else if (user.password !== encryptedPassword) {
      return res.status(401).json({ message: 'Wrong password' });
    }

    const token = sign({ username }, 'Stack', {
      expiresIn: '150d',
    });
    res.json({ user, token });
  };

  createUser = async (req, res) => {
    const result = validateUser(req.body);

    if (result.error)
      return res.status(400).json({ error: JSON.parse(result.error.message) });

    const encryptedPassword = EncryptPassword(result.data.password);
    const user = { ...result.data, password: encryptedPassword };

    const newUser = await this.UserModel.createUser({ input: user });

    const { username } = result.data;

    if (newUser?.message)
      return res.status(400).json({ message: 'User Already Exist' });

    const token = sign({ username }, 'Stack', {
      expiresIn: '150d',
    });
    res.status(201).json({ newUser, token });
  };
}
