import { NextFunction, Request, Response } from 'express';

import { roleService } from '../services/RoleService';

export default class RoleController {

  constructor() { }

  async createRole(req: Request, response: Response, next: NextFunction) {
    try {
      response.send(await roleService.createRole(req.body.name));
    }
    catch (error) {
      next(error);
    }
  }

  async listRoles(req: Request, response: Response, next: NextFunction) {
    try {
      return response.send(await roleService.listRoles());
    }
    catch (error) {
      next(error);
    }
  }
}

