import {Request, Response, Router} from 'express';
import * as express from 'express'
import { helloHandler } from './../controllers/nameController';

export class NameRoutes {

    public router: any = express.Router();

    constructor() {
        console.log("in names routes");
        this.router.get('/:name', helloHandler);
    }
}


