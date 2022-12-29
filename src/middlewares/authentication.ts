import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { Errors } from '../common/errors/ErrorsEnum';
import ServiceException from '../common/errors/ServiceExcepiton';
import { ResponseStatusCode } from '../common/http/ResponseStatusCode';
import { profileService } from '../services/ProfileService';



export const authMiddleware = async (error:Error, request:Request, response:Response, next:NextFunction) => {
    try {
        const token = request.headers.authorization;
        if (token === null || token === undefined) {
            throw new ServiceException(ResponseStatusCode.UNATHORIZED, Errors.UNATHORIZED_USER);
        }

        verify(token, process.env.JWT_SECRET);

    } catch (error) {
        next(error);
    }
}