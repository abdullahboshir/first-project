import express from 'express';
import validateRequest from '../../midddlewares/validatedRequest';
import { OfferedCourseValidations } from './offeredCourse.validation';
import {
  createOfferedCourse,
  updateOfferedCourse,
} from './offeredCourse.controller';

const router = express.Router();

router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  createOfferedCourse,
);

router.patch(
  '/:id',
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  updateOfferedCourse,
);

export const offeredCourseRoutes = router;
