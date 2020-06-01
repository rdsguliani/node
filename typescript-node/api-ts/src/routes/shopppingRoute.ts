import { Router, Response, Request } from "express";
import {shoppingItems} from './../data/shoppingItems';


class ShoppingRoute {
    
    public router: any

    constructor() {
        this.router = Router();
        this.init();
    }

    private init() {
        this.router.get('/list', this.getList);
    }

    private getList(req: Request, res: Response) {
        res.send({"data": shoppingItems()});
    }

}

export default ShoppingRoute;