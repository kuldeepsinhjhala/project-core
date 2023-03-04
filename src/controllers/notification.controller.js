import Notification from '../models/notification.model';
import { catchAsync } from '../utils';
import * as handlerFactory from './factory';

export const createNotification = handlerFactory.createOne(Notification);
export const getAllNotifications = handlerFactory.getAll(Notification, {
  path: 'receiver',
});
export const getNotification = handlerFactory.getOne(Notification);
export const updateNotifcation = handlerFactory.updateOne(Notification);
export const deleteNotification = handlerFactory.deleteOne(Notification);

export const getUserNotifications = (req, res, next) => {
  req.query.receiver = req.user.id;
  req.query.sort = 'read,-createdAt';
  next();
};

export const getSentNotifications = (req, res, next) => {
  req.query.sender = req.user.id;
  req.query.sort = 'read,-createdAt';
  next();
};

export const readAll = catchAsync(async (req, res) => {
  const updatedNotis = await Notification.updateMany(
    { read: false },
    { read: true }
  );
  res.formatter.ok(updatedNotis);
});
