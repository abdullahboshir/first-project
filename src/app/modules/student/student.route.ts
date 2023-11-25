import express from 'express';
import {
  createStudent,
  getAllSudents,
  getSingleStudent,
} from './student.controller';

const router = express.Router();

router.post('/create-student', createStudent);
router.get('/', getAllSudents);
router.get('/:studentId', getSingleStudent);

export const StudentRoutes = router;