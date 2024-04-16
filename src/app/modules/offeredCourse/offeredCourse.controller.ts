import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import {
  createSemesterRegistrationIntoDB,
  updateOfferedCourseIntoDB,
} from './offeredCourse.service';

export const createOfferedCourse = catchAsync(async (req, res) => {
  const result = await createSemesterRegistrationIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered has beens Created successfully',
    data: result,
  });
});

export const updateOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await updateOfferedCourseIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OfferedCourse updated successfully',
    data: result,
  });
});

//   export const getSingleSemestarRagistration = catchAsync(async (req, res) => {
//     const result = await getSingleSemesterRegistrationsFromDB(req.params.id);

//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Semeter Ragistered retrieved is successfully',
//       data: result,
//     });
//   });

//   export const updateSemesterRegistration = catchAsync(async (req, res) => {
//     const result = await updateSemesterRegistrationIntoDB(
//       req.params.id,
//       req.body,
//     );
