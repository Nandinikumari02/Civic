import { Request, Response } from 'express';
import  {registerUser , loginUser} from '../services/authService';

export const handleRegister = async (req: Request, res: Response) => {
  try {
    const result = await registerUser(req.body);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const handleLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};