import { validateLink, validatePartialLink } from "../schema/links.js";

export class LinkControllers {
  constructor({ LinkModel }) {
    this.LinkModel = LinkModel;
  }

  getLinks = async (req, res) => {
    const { id } = req.params;

    const link = await this.LinkModel.getLinks({ id });

    if (link) return res.json(link);

    res.status(404).json({ message: "Link Not Found" });
  };

  createLink = async (req, res) => {
    const result = validateLink(req.body);

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newLink = await this.LinkModel.createLink({ input: result.data });

    res.status(201).json(newLink);
  };

  deleteLink = async (req, res) => {
    const { id } = req.params;

    const result = await this.LinkModel.deleteLink({ id });

    if (result) return res.json({ message: "Link Deleted" });

    res.status(404).json({ message: "Link Not Found" });
  };

  updateLink = async (req, res) => {
    const result = validatePartialLink(req.body);

    if (result.error)
      return res.status(400).json({ error: JSON.parse(result.error.message) });

    const { id } = req.params;

    const updateLink = await this.LinkModel.updateLink({
      id,
      input: result.data,
    });

    if (updateLink) return res.json({ message: "Link updated" });

    res.status(404).json({ message: "Link Not Found" });
  };
}
