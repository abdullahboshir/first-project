import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import {
  assignFacultiesWithCourseIntoDB,
  createCourseIntoDB,
  deleteCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  updateCourseIntoDB,
} from './course.service';

export const createCourse = catchAsync(async (req, res) => {
  const result = await createCourseIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is created successfully',
    data: result,
  });
});

export const getAllCourses = catchAsync(async (req, res) => {
  const result = await getAllCoursesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Courses are retrieved successfully',
    data: result,
  });
});

export const getSingleCurse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await getSingleCourseFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is retrieved successfully',
    data: result,
  });
});

export const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await deleteCourseIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course deleted is successfully',
    data: result,
  });
});

export const assignFaculties = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await assignFacultiesWithCourseIntoDB(courseId, faculties);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course updated is successful',
    data: result,
  });
});

export const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await updateCourseIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course updated is successful',
    data: result,
  });
});
