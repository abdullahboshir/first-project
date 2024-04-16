import express from 'express';
import validateRequest from '../../midddlewares/validatedRequest';
import {
  createEnrolledCourseValidationZodSchema,
  updateEnrolledCourseMarksValidationZodSchema,
} from './enrolledCourse.validation';
import {
  createEnrolledCourse,
  updateEnrolledCourseMarks,
} from './enrolledCourse.controller';
import auth from '../../midddlewares/auth';

const router = express.Router();

router.post(
  '/create-enrolled-course',
  auth('student'),
  validateRequest(createEnrolledCourseValidationZodSchema),
  createEnrolledCourse,
);

router.patch(
  '/update-enrolled-course-marks',
  auth('faculty'),
  validateRequest(updateEnrolledCourseMarksValidationZodSchema),
  updateEnrolledCourseMarks,
);

export const EnrolledCourseRoutes = router;
