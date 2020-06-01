import { Request, Response, NextFunction } from 'express'

class LoggingMiddleware {
    
    constructor() {
    //  this.init(); 
    }

    private init() {
        
    }

    logger = (req: Request, resp: Response, next: NextFunction) => {
        console.log('Request logged:', req.method, req.path);
        next();
    }
    
}

export default LoggingMiddleware;