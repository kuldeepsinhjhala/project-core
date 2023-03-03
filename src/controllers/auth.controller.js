import { promisify } from 'util';
import jwt from 'jsonwebtoken';

import * as googleService from '../services/google.service';
import User from '../models/user.model';
import { catchAsync, AppError } from '../utils';

export const getGoogleAuthScreen = (req, res) =>
  res.redirect(googleService.getGoogleAuthUri(req.query.sourceUri));

export const handleGoogleRedirect = catchAsync(async (req, res) => {
  const { code, state } = req.query;
  if (!code || !state)
    throw new AppError(
      'Either code or state parameter was missing in the request'
    );

  const tokens = await googleService.getCredentialsByCode(code);
  const googleUser = await googleService.getGoogleUser(tokens.access_token);
  if (!googleUser.verified_email)
    throw new AppError('Your google email address has not been verified');

  const user = await User.findOneAndUpdate(
    { email: googleUser.email },
    googleUser,
    { upsert: true, new: true, runValidators: true }
  );

  const token = await promisify(jwt.sign)(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.cookie('jwt', token, {
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'development' ? 'Lax' : 'None',
    maxAge:
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
  });

  res.redirect(JSON.parse(state).sourceUri);
});

export const protect = catchAsync(async (req, res, next) => {
  const { jwt: token } = req.cookies;
  if (!token)
    throw new AppError('Please login to get access to this route', 401);

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  if (!decoded) throw new AppError('Invalid token', 403);

  const user = await User.findById(decoded.id);
  if (!user)
    throw new AppError('The user belonging to this token does not exist', 403);

  req.user = user;

  next();
});

export const restrictTo =
  (...roles) =>
  (req, res, next) => {
    next(
      roles.includes(req.user.role)
        ? null
        : new AppError('You are not allowed to access this route', 403)
    );
  };
