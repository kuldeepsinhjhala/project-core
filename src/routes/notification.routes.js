import express from 'express';
import * as notificationController from '../controllers/notification.controller';
import * as authController from '../controllers/auth.controller';

const router = express.Router();

router.use(authController.protect);

/**
 * @method POST
 * @route /notifications
 * @returns All notifications for current user
 */
router.post('/', notificationController.createNotification);

/**
 * @method GET
 * @route /notifications
 * @returns All notifications for current user
 */
router.get(
  '/',
  notificationController.getUserNotifications,
  notificationController.getAllNotifications
);

/**
 * @method GET
 * @route /notifications/sent
 * @returns All notifications that a user sent
 */
router.get(
  '/sent',
  notificationController.getSentNotifications,
  notificationController.getAllNotifications
);

/**
 * @method PATCH
 * @route /notifications/:id
 * @returns Update a user's notification
 */
router.patch('/read-all', notificationController.readAll);

/**
 * @method PATCH
 * @route /notifications/:id
 * @returns Update a user's notification
 */
router.patch('/:id', notificationController.updateNotifcation);

// router
//   .route('/:id')
//   .get(notificationController.getNotification)
//   .patch(notificationController.updateNotifcation)
//   .delete(notificationController.deleteNotification);

export default router;
