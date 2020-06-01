import express, { NextFunction, Request, Response } from 'express';
import { rootHandler } from './handlers';
import {NameRoutes} from './routes/nameRoutes';
import { eventNames } from 'cluster';

class Index {

    app = express();
    port = process.env.PORT || '8000';
    namesRoute: NameRoutes;

    constructor () {
        this.app = express();
        this.namesRoute    = new NameRoutes();

        this.mapRoutes();
    }

    private mapRoutes() {

        this.app.use((req: Request, res: Response, next: NextFunction) => {
            // console.log(req);
            next();
        })

        this.app.get('/', rootHandler);
        this.app.use('/hello', this.namesRoute.router);
        
        this.app.listen(this.port, err => {
          if (err) return console.error(err);
          return console.log(`Server is listening on ${this.port}`);
        });
    }

}

exports = new Index();


