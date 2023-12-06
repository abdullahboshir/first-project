import express from 'express';
import {
  deleteSingleStudent,
  getAllSudents,
  getSingleStudent,
} from './student.controller';

const router = express.Router();

router.get('/', getAllSudents);
router.get('/:studentId', getSingleStudent);
router.delete('/:studentId', deleteSingleStudent);

export const StudentRoutes = router;
