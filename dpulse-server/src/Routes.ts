import type { RequestHandler,Request, Response} from "express";
import {Router} from "express";

export type RouteDefinition = {
    path: string;
    route: Router;
    middleware?:Array<RequestHandler>;
}

const GLOBAL_PREFIX = '/api';

const router = Router();


const routes: RouteDefinition[] = [
    {
        path:"/",
        route: router.get('/',(_:Request, res:Response)=>{
            res.send('Hello World');
        })
    }
];

export default routes