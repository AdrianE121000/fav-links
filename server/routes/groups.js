import { Router } from "express";
import { GroupControllers } from "../controller/groups.js";

export const createGroupsRouter = ({ GroupModel }) => {
  const groupRouter = Router();

  const groupsController = new GroupControllers({ GroupModel });

  groupRouter.get("/:id", groupsController.getGroups);

  groupRouter.get("/goupname/:id", groupsController.getGroupName);

  groupRouter.post("/:user_id", groupsController.createGroup);

  groupRouter.patch("/", groupsController.addLinkToGroup);

  groupRouter.post("/", groupsController.getLinksFromGroup);

  groupRouter.delete("/:id", groupsController.deleteLinkFromGroup);

  return groupRouter;
};
