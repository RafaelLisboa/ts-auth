import cors from 'cors';
import express from 'express';

import appDataSource from './data-source';
import { errorMiddleware } from './middlewares/error';
import router from './routes';

appDataSource.initialize()
  .then(() => {
    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use(router);
    app.use(errorMiddleware)

    const server = app.listen(process.env.APP_PORT, () => {
      console.log('Server runnnig');
    })

    process.on('SIGTERM', shutDown);
    process.on('SIGINT', shutDown);


    function shutDown() {
      console.log('Received kill signal, shutting down gracefully');
      server.close(() => {
        console.log('Closed out remaining connections');
        process.exit(0);
      });

      setTimeout(() => {
        console.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
      }, 10000);
    }
  });
