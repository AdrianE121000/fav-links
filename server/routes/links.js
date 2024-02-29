import { Router } from 'express';
import { LinkControllers } from '../controller/links.js';

export const createLinkRouter = ({ LinkModel }) => {
  const linkRouter = Router();

  const linksController = new LinkControllers({ LinkModel });

  linkRouter.get('/:id', linksController.getLinks);

  linkRouter.post('/', linksController.createLink);

  linkRouter.delete('/:id', linksController.deleteLink);

  linkRouter.patch('/:id', linksController.updateLink);

  return linkRouter;
};
