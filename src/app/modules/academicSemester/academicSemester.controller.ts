import { RequestHandler } from 'express';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { createAcademicSemesterIntoDB } from './academicSemester.service';

export const createAcademicSemester: RequestHandler = catchAsync(
  async (req, res) => {
    const result = await createAcademicSemesterIntoDB(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester is created successfully',
      data: result,
    });
  },
);
