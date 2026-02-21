import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import deptRoutes from './routes/deptRoutes';
import issueRoutes from './routes/issueRoutes';
import taskRoutes from "./routes/taskRoutes";
import notificationRoutes from './routes/notificationRoutes';
import rewardRoutes from './routes/rewardRoutes';


dotenv.config();

export const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/dept',deptRoutes);
app.use('/api/issues', issueRoutes);
app.use("/api/tasks" , taskRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/rewards", rewardRoutes);




