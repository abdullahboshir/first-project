import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { createAcademicFacultyIntoDB } from './academicFaculty.service';

export const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await createAcademicFacultyIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty is created successfully',
    data: result,
  });
});
