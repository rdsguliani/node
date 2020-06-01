import {Request, Response} from 'express';


interface HelloResponse {
    hello: string;
  }
  
type HelloBuilder = (name: string) => HelloResponse;

const helloBuilder: HelloBuilder = name => ({ hello: name });

export const helloHandler = (req: Request, res: Response) => {
    const { params } = req;
    const { name = 'World' } = params;
    const response = helloBuilder(name);
  console.log(" in hellow owrld contorller ")
    return res.json(response);
  };