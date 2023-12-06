import express from 'express';
import { createStudent } from './user.controller';
import { createStudentValidationSchema } from '../student/student.validation';
import validateRequest from '../../midddlewares/validatedRequest';
const router = express.Router();

router.post(
  '/create-student',
  validateRequest(createStudentValidationSchema),
  createStudent,
);

export const UserRoutes = router;
