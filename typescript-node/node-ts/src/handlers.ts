import { Request, Response } from 'express';

export const rootHandler = (_req: Request, res: Response) => {
    console.log("in api wokring ")
  return res.send('API is working 🤓');
};

