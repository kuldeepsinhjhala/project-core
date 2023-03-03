import Notification from '../models/notification.model';
import * as handlerFactory from './factory';

export const createNotification = handlerFactory.createOne(Notification);
export const getAllNotifications = handlerFactory.getAll(Notification);
export const getNotification = handlerFactory.getOne(Notification);
export const updateNotifcation = handlerFactory.updateOne(Notification);
export const deleteNotification = handlerFactory.deleteOne(Notification);
