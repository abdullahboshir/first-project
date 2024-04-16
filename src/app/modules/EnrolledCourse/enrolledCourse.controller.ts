import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import {
  createEnrolledCourseIntoDB,
  updateEnrolledCourseMarksIntoDB,
} from './enrolledCourse.service';

export const createEnrolledCourse = catchAsync(async (req, res) => {
  const result = await createEnrolledCourseIntoDB(req?.user?.userId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course has been Created successfully',
    data: result,
  });
});

export const updateEnrolledCourseMarks = catchAsync(async (req, res) => {
  const result = await updateEnrolledCourseMarksIntoDB(
    req?.user?.userId,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course has been Created successfully',
    data: result,
  });
});
