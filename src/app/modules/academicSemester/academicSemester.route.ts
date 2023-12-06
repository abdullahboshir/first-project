import express from 'express';
import { createAcademicSemester } from './academicSemester.controller';
import validateRequest from '../../midddlewares/validatedRequest';
import { createAcademicSemesterValidationSchema } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(createAcademicSemesterValidationSchema),
  createAcademicSemester,
);

// router.get('/', getAllSudents);
// router.get('/:studentId', getSingleStudent);
// router.delete('/:studentId', deleteSingleStudent);

export const academicSemesterRoutes = router;
