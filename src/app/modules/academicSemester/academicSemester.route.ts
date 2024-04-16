import express from 'express';
import {
  createAcademicSemester,
  getAllAcademicSemesters,
} from './academicSemester.controller';
import validateRequest from '../../midddlewares/validatedRequest';
import { createAcademicSemesterValidationSchema } from './academicSemester.validation';
import auth from '../../midddlewares/auth';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(createAcademicSemesterValidationSchema),
  createAcademicSemester,
);

router.get('/', auth('student', 'faculty', 'admin'), getAllAcademicSemesters);
// router.get('/:studentId', getSingleStudent);
// router.delete('/:studentId', deleteSingleStudent);

export const academicSemesterRoutes = router;
