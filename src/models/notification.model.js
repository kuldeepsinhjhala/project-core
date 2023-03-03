import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, 'Notification must have a type'],
      enum: ['like', 'comment', 'follow', 'message'],
    },
    template: {
      type: String,
      required: [true, 'Notification must have a template'],
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

const User = mongoose.model('User', schema);
export default User;
