import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticate = (req: any, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
    req.user = decoded; // Token ka data request mein save kar liya
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

export const checkRole = (roles: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: Access Denied" });
    }
    next();
  };
};

export const protect = async (req: any, res: any, next: any) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Not authorized" });

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    // Yahan check kijiye ki 'userId' ya 'id' kya bhej rahe hain aap payload mein
    req.user = { id: decoded.userId || decoded.id }; 
    next();
  } catch (error) {
    res.status(401).json({ error: "Token failed" });
  }
};