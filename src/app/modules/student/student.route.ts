import express from 'express';
import {
  createStudent,
  deleteSingleStudent,
  getAllSudents,
  getSingleStudent,
} from './student.controller';

const router = express.Router();

router.post('/create-student', createStudent);
router.get('/', getAllSudents);
router.get('/:studentId', getSingleStudent);
router.delete('/:studentId', deleteSingleStudent);

export const StudentRoutes = router;
