import { NextFunction, Request, Response } from 'express';

import ServiceException from '../common/errors/ServiceExcepiton';

export const errorMiddleware = (error: Error, request: Request, response: Response, next: NextFunction) => {
  console.error(error);
  if (error instanceof ServiceException) {
    return response.status(error.statusCode)
      .json({
        message: error
      });
  }
  else {
    return response.status(500).send("Server Internal Error");
  }
};