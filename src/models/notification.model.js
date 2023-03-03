import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, 'Notification must have a type'],
      enum: ['like', 'comment', 'follow', 'message'],
    },
    content: {
      type: String,
      required: [true, 'Notification must have its content'],
    },
    sender: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'a notification must have a sender'],
    },
    receiver: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'a notification must have a receiver'],
    },
    read: {
      type: Boolean,
      default: false,
    },
    readAt: {
      type: Date,
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true,
  }
);

const Notification = mongoose.model('Notification', schema);
export default Notification;
