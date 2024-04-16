import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationsFromDB,
  updateSemesterRegistrationIntoDB,
} from './semseterRagistration.service';

export const createSemestarRagistration = catchAsync(async (req, res) => {
  const result = await createSemesterRegistrationIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semeter Created is successfully',
    data: result,
  });
});

export const getAllSemestarRagistrations = catchAsync(async (req, res) => {
  const result = await getAllSemesterRegistrationsFromDB(req.params);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semeter Ragistered retrieved is successfully',
    data: result,
  });
});

export const getSingleSemestarRagistration = catchAsync(async (req, res) => {
  const result = await getSingleSemesterRegistrationsFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semeter Ragistered retrieved is successfully',
    data: result,
  });
});

export const updateSemesterRegistration = catchAsync(async (req, res) => {
  const result = await updateSemesterRegistrationIntoDB(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semeter Ragistered has been updated successfully',
    data: result,
  });
});
