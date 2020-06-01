// import * as express from 'express'
import express, {Application} from 'express';

class App {

    public app: Application;
    public port: number;

    // constructor(config: {port: number, middleWares:any, controllers: any}) {
    constructor(appInit: { port: number; middleWares: any; routes: any; }) {
        this.app = express();
        this.port = appInit.port;

        this.initMiddleWares(appInit.middleWares);
        this.initRoutes(appInit.routes);

    }

    private initMiddleWares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare)
        })
    }

    private initRoutes(routes: { forEach: (arg0: (route: any) => void) => void; }) {
        routes.forEach(route => {
            this.app.use('/', route.router);
        })
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`)
        })
    }
}

export default App