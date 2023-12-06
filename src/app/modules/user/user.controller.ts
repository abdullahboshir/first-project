import { RequestHandler } from 'express';
import { createStudentIntoDB } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

export const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  const result = await createStudentIntoDB(studentData, password);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student created is successfully',
    data: result,
  });
});
