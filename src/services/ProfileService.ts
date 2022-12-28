import jwt from 'jsonwebtoken';
import ServiceException from '../common/errors/ServiceExcepiton';
import { ResponseStatusCode } from '../common/http/ResponseStatusCode';
import { Errors } from '../common/errors/ErrorsEnum';
import { userService } from './UserService';

type JWT =  {
    id:string;
}

class ProfileService {

    async getProfile(token:string) {

        const bearerToken = token.split(" ")[1];

        let jwtPayload = null;
        try {
            jwtPayload = jwt.verify(bearerToken, process.env.JWT_SECRET ?? 'null' ) as JWT;
        } 
        catch(error) {
            throw new ServiceException(ResponseStatusCode.UNATHORIZED, Errors.UNATHORIZED_USER);
        }
        
        if (jwtPayload === null || jwtPayload === undefined) {
            throw new ServiceException(ResponseStatusCode.UNATHORIZED, Errors.UNATHORIZED_USER);
        }

        const user = userService.getUserById(jwtPayload.id);

        if (user === null || user === undefined) {
            throw new ServiceException(ResponseStatusCode.UNATHORIZED, Errors.UNATHORIZED_USER);
        }

        return user;
    }

}

export const profileService = new ProfileService();