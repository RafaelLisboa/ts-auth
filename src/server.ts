import express, { ErrorRequestHandler, NextFunction, Request, Response, request, response } from 'express';
import appDataSource from './data-source';
import cors from 'cors';
import router from './routes';
import {errorMiddleware} from './middlewares/error';

appDataSource.initialize()
  .then(() => {
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(router);
    app.use(errorMiddleware)
    app.listen(process.env.APP_PORT, () => {
      console.log('Server runnnig');
    })
  })
