import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv'
import User from '../model/usermodel';

dotenv.config({ path: './config.env' });

declare global {
    namespace Express {
      interface Request {
        user?: any;
      }
    }
  }

  
  // Middleware to authenticate  user
  export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
  
      const decoded: any = jwt.verify(token, process.env.ACCESS_TOKEN!);
      const user = await User.findByPk(decoded.id);
      if (!user) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
  
      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Authentication failed' });
    }
  };
  
  
  // check if the user is an admin
  export const checkAdminRole = (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.user;
    const isAdmin = true; 
    if (!isAdmin) {
      return res.status(403).json({ message: 'Access denied. You are not an admin' });
    }
    next();
  };
  
  //check if the user is an editor 
  export const checkEditorRole = (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.user;
    const isEditor = true; 
    if (!isEditor) {
      return res.status(403).json({ message: 'Access denied. You are not an editor ' });
    }
    next();
  };

  //check if the user is an visitor
  export const checkVisitorRole = (Req:Request,res:Response,next:NextFunction)=>{
    const { userId }=Req.user;
    const isVisitor = true;
    if(!isVisitor){
      return res.status(403).json({ message:'Access denied. You are not an visitor' })
    }
    next();
  }

export default { authenticateUser, checkAdminRole,checkEditorRole,checkVisitorRole}