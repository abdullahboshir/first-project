import { RequestHandler } from 'express';
import {
  changeStatusIntoDB,
  createAdminIntoDB,
  createFacultyIntoDB,
  createStudentIntoDB,
  getMeIntoDB,
} from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { JwtPayload } from 'jsonwebtoken';

export const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  const result = await createStudentIntoDB(req?.file, studentData, password);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student created is successfully',
    data: result,
  });
});

export const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;
  const result = await createFacultyIntoDB(req.file, password, facultyData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty has beens Created successfully',
    data: result,
  });
});

export const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  });
});

export const getMe = catchAsync(async (req, res) => {
  const { userId, role } = req.user as JwtPayload;

  const result = await getMeIntoDB(userId, role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  });
});

export const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await changeStatusIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  });
});
