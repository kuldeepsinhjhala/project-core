import express from 'express';
import authRouter from './auth.routes';
import userRouter from './user.routes';
import notificationRouter from './notification.routes';

const mainRouter = express.Router();

mainRouter.get('/health', (req, res) =>
  res.json({
    status: 'success',
    message: 'Server is healthy, wealthy and sexy!',
  })
);

mainRouter
  .use('/auth', authRouter)
  .use('/users', userRouter)
  .use('/notifications', notificationRouter);

export default mainRouter;
