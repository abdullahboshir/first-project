import {
  deleteSingleStudentFromDB,
  getSingleStudentFromDB,
  getStudentFromDB,
  updateStudentFromDB,
} from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

export const getAllSudents = catchAsync(async (req, res) => {
  const result = await getStudentFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students are retrieved successfully',
    data: result,
  });
});

export const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await getSingleStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students are retrieved successfully',
    data: result,
  });
});

export const deleteSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await deleteSingleStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is deleted successfully',
    data: result,
  });
});

export const updateStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const { student } = req.body;
  const result = await updateStudentFromDB(studentId, student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is updated successfully',
    data: result,
  });
});
