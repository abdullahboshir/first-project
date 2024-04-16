import express from 'express';
import validateRequest from '../../midddlewares/validatedRequest';
import {
  createSemestarRagistration,
  getAllSemestarRagistrations,
  getSingleSemestarRagistration,
  updateSemesterRegistration,
} from './semesterRagistration.controller';
import { SemesterRagisterValidations } from './semesterRagistration.validation';

const router = express.Router();

router.post(
  '/create-semester-registration',
  validateRequest(
    SemesterRagisterValidations.createSemesterRagistratonValidationSchema,
  ),
  createSemestarRagistration,
);

router.get('/', getAllSemestarRagistrations);
router.get('/:id', getSingleSemestarRagistration);
router.patch(
  '/:id',
  validateRequest(
    SemesterRagisterValidations.updateSemesterRagistratonValidationSchema,
  ),
  updateSemesterRegistration,
);

export const semesterRagistrationRoutes = router;
