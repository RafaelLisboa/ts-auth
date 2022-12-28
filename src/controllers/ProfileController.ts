import { NextFunction, Request, Response } from "express";
import { profileService } from "../services/ProfileService";
import ServiceException from "../common/errors/ServiceExcepiton";
import { ResponseStatusCode } from "../common/http/ResponseStatusCode";
import { Errors } from "../common/errors/ErrorsEnum";

export class ProfileController {

    async getProfile(req:Request, res:Response, next:NextFunction) {
        try {
            const token = req.headers.authorization;
            if (token === null || token === undefined) {
                throw new ServiceException(ResponseStatusCode.UNATHORIZED, Errors.UNATHORIZED_USER);
            }
           res.send(await profileService.getProfile(token));  
        } catch (error) {
            next(error);
        }
    }

}