import httpStatus from 'http-status';
// import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import {
  changePasswordIntoDB,
  forgetPasswordIntoDB,
  loginUserIntoDB,
  refreshTokenIntoDB,
  resetPasswordIntoDB,
} from './auth.service';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';

export const loginUser = catchAsync(async (req, res) => {
  const result = await loginUserIntoDB(req.body);
  const { refreshToken, accessToken, needsPasswordChange } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in succesfully!',
    data: {
      accessToken,
      needsPasswordChange,
    },
  });
});

export const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;

  const result = await changePasswordIntoDB(
    req.user as JwtPayload,
    passwordData,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password is updated succesfully!',
    data: result,
  });
});

export const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await refreshTokenIntoDB(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved succesfully!',
    data: result,
  });
});

export const forgetPassword = catchAsync(async (req, res) => {
  const userId = req.body.id;
  const result = await forgetPasswordIntoDB(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reset link is generated succesfully!',
    data: result,
  });
});

export const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  const result = await resetPasswordIntoDB(req.body, token as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset succesful!',
    data: result,
  });
});
