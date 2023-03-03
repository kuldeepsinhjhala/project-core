import express from 'express';
import * as notificationController from '../controllers/notification.controller';

const router = express.Router();

router
  .route('/')
  .get(notificationController.getAllNotifications)
  .post(notificationController.createNotification);

router
  .route('/:id')
  .get(notificationController.getNotification)
  .patch(notificationController.updateNotifcation)
  .delete(notificationController.deleteNotification);

export default router;
