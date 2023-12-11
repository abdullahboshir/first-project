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
router.get('/:studentId', getSingleStudent);
router.delete('/:studentId', deleteSingleStudent);
router.patch(
  '/:studentId',
  validateRequest(updateStudentValidationSchema),
  updateStudent,
);

export const StudentRoutes = router;
