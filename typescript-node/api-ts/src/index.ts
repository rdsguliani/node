import App from "./app";
import * as bodyParser from 'body-parser';
import ShoppingRoute from "./routes/shopppingRoute";
import LoggingMiddleware from "./middlewares/logging";

var app = new App({
    port: 3000,
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({extended: true}),   
        new LoggingMiddleware().logger
    ],
    routes: [
        new ShoppingRoute()
    ]
});

app.listen();