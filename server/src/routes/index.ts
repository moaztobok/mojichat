import { Express } from 'express';
import path from 'path';
import userRoutes from './userRoutes';
import authRotues from './auth';
export const registeredRoutes = (app: Express) => {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });
  app.use('/api/users', userRoutes);
  app.use('/api/auth', authRotues);
}