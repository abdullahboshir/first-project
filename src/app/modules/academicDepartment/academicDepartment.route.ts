import express from 'express';
import validateRequest from '../../midddlewares/validatedRequest';
import {
  createAcademicDepartment,
  getAllAcademicDepartments,
  upadateAcademicDepartment,
} from './academicDepartment.controller';
import {
  academicDeapartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
} from './academicDepartment.validation';

const router = express.Router();

router.post(
  '/create-academic-department',
  validateRequest(academicDeapartmentValidationSchema),
  createAcademicDepartment,
);

router.patch(
  '/:departmentId',
  validateRequest(updateAcademicDepartmentValidationSchema),
  upadateAcademicDepartment,
);

router.get('/', getAllAcademicDepartments);

export const AcademicDepartmentRoutes = router;
