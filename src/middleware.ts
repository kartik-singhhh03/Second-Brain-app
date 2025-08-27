import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_PASSWORD } from './config.js'; // adjust path to your config file

export const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers["authorization"];
  const decoded = jwt.verify(header as string, JWT_PASSWORD);
  
  if (decoded) {

    //@ts-ignore
    req.userId = decoded.id; // Assuming the token contains user ID
    next();
  }

    else {
        return res.status(401).json({ message: 'you are not logged in' });
    }
};


export const contentMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { title, link } = req.body;

  if (!title || !link) {
    return res.status(400).json({ message: 'Title and link are required' });
  }

  next();
};