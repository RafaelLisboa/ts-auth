import { NextFunction, Request, Response } from 'express';

import User from '../domain/User';
import { userService } from '../services/UserService';

export class UserController {

	async createUser(req: Request, resp: Response, next: NextFunction) {
		try {
			console.log("Creating a new user")

			const user: User = {
				username: req.body.name,
				email: req.body.email,
				password: req.body.password
			}

			return resp.send(await userService.createUser(user));
		}
		catch (error) {
			next(error);
		}
	}

	async listUsers(req: Request, resp: Response, next: NextFunction) {
		try {
			console.log("Listing users");

			return resp.send(await userService.listUsers());
		}
		catch (error) {
			next(error);
		}
	}

}