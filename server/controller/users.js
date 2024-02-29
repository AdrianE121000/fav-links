import { validateUser } from '../schema/users.js';

export class UserControllers {
  constructor({ UserModel }) {
    this.UserModel = UserModel;
  }

  getUser = async (req, res) => {
    const { username } = req.params;

    const user = await this.UserModel.getUser({ username });

    if (user.length === 0)
      return res.status(404).json({ message: 'User Not Found' });

    res.json(user);
  };

  createUser = async (req, res) => {
    const result = validateUser(req.body);

    if (result.error)
      return res.status(400).json({ error: JSON.parse(result.error.message) });

    const newUser = await this.UserModel.createUser({ input: result.data });

    if (newUser?.message)
      return res.status(400).json({ message: 'User Already Exist' });

    res.status(201).json(newUser);
  };
}
