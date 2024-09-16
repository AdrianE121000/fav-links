import { validateUser, validatePartialUser } from "../schema/users.js";
import jwt from "jsonwebtoken";
import { EncryptPassword } from "../utils.js";
import { SECRET_JWT_KEY } from "../config.js";

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
      return res.status(404).json({ message: "User Not Found" });
    } else if (user.password !== encryptedPassword) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const token = jwt.sign({ username }, SECRET_JWT_KEY, {
      expiresIn: "150d",
    });
    res.send({ user, token });
  };

  verify = (req, res) => {
    const { token } = req.params;

    try {
      jwt.verify(token, SECRET_JWT_KEY);

      res.status(201).send({ message: "Token is Valid" });
    } catch (error) {
      res.status(401).send({ message: "access unauthorized" });
    }
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
      return res.status(400).json({ message: "User Already Exist" });

    const token = jwt.sign({ username }, SECRET_JWT_KEY, {
      expiresIn: "150d",
    });
    res.status(201).send({ newUser, token });
  };

  deleteUser = async (req, res) => {
    const { id } = req.params;

    const result = await this.UserModel.deleteUser({ id });

    if (result) return res.json({ message: "User Deleted" });

    res.status(404).json({ message: "User Not Found" });
  };

  updateUser = async (req, res) => {
    const result = validatePartialUser(req.body);

    if (result.error)
      return res.status(400).json({ error: JSON.parse(result.error.message) });

    const { id } = req.params;

    let encryptedPassword = "";

    if (result.data.password) {
      encryptedPassword = EncryptPassword(result.data?.password);
    }

    const user = { ...result.data, password: encryptedPassword };

    const updatedUser = await this.UserModel.updateUser({
      id,
      input: user,
    });

    if (!updatedUser) {
      return res.json({ message: "User Already Exist" });
    } else {
      return res.json(updatedUser);
    }
  };
}
