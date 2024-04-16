import express from 'express';
import {
  deleteSingleStudent,
  getAllSudents,
  getSingleStudent,
  updateStudent,
} from './student.controller';
import validateRequest from '../../midddlewares/validatedRequest';
import { updateStudentValidationSchema } from './student.validation';

const router = express.Router();

router.get('/', getAllSudents);
router.get('/:id', getSingleStudent);
router.delete('/:id', deleteSingleStudent);
router.patch(
  '/:id',
  validateRequest(updateStudentValidationSchema),
  updateStudent,
);

export const StudentRoutes = router;
