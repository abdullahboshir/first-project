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
  const data = await getStudentFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students are retrieved successfully',
    data,
  });
});

export const getSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await getSingleStudentFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students are retrieved successfully',
    data: result,
  });
});

export const deleteSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await deleteSingleStudentFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is deleted successfully',
    data: result,
  });
});

export const updateStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { student } = req.body;
  const result = await updateStudentFromDB(id, student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is updated successfully',
    data: result,
  });
});
