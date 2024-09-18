import { validateGroup } from "../schema/groups.js";

export class GroupControllers {
  constructor({ GroupModel }) {
    this.GroupModel = GroupModel;
  }

  getGroups = async (req, res) => {
    const { id } = req.params;

    const groups = await this.GroupModel.getGroups({ id });

    res.json(groups);
  };

  getGroupName = async (req, res) => {
    const { id } = req.params;

    const groupName = await this.GroupModel.getGroupName({ id });

    res.json(groupName);
  };

  createGroup = async (req, res) => {
    const result = validateGroup(req.body);
    const { user_id } = req.params;

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newGroup = await this.GroupModel.createGroup({
      input: result.data,
      user_id,
    });

    res.status(201).json(newGroup);
  };

  addLinkToGroup = async (req, res) => {
    const { group_name, link_id, user_id } = req.body;

    const insertedLink = await this.GroupModel.addLinkToGroup({
      group_name,
      link_id,
      user_id,
    });

    if (insertedLink) {
      return res.status(201).json({ message: "Link added succesful" });
    }

    res.status(400).json({ error: "Error to add link to group" });
  };

  getLinksFromGroup = async (req, res) => {
    const { group_name, userId } = req.body;

    const result = await this.GroupModel.getLinksFromGroup({
      group_name,
      userId,
    });

    if (result) return res.status(201).json(result);
  };
}
