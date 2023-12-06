import express from 'express';
import { createAcademicFaculty } from './academicFaculty.controller';
import { academicFacultyValidationSchema } from './academicFaculty.validation';
import validateRequest from '../../midddlewares/validatedRequest';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(academicFacultyValidationSchema),
  createAcademicFaculty,
);

export const AcademicFacultyRoutes = router;
