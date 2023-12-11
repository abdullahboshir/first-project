import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentsFromDB,
  updateAcademicDepartmentIntoDB,
} from './academicDepartment.service';

export const createAcademicDepartment = catchAsync(async (req, res) => {
  const result = await createAcademicDepartmentIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department is created successfully',
    data: result,
  });
});

export const getAllAcademicDepartments = catchAsync(async (req, res) => {
  const result = await getAllAcademicDepartmentsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department get successfully',
    data: result,
  });
});

export const upadateAcademicDepartment = catchAsync(async (req, res) => {
  const result = await updateAcademicDepartmentIntoDB(
    req.params.departmentId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department is created successfully',
    data: result,
  });
});
