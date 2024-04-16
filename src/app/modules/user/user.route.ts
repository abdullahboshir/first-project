import express, { NextFunction, Request, Response } from 'express';
import {
  changeStatus,
  createAdmin,
  createFaculty,
  createStudent,
  getMe,
} from './user.controller';
import { createStudentValidationSchema } from '../student/student.validation';
import validateRequest from '../../midddlewares/validatedRequest';
import { createAdminValidationSchema } from '../Admin/admin.validation';
import auth from '../../midddlewares/auth';
import { USER_ROLE } from './user.constant';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { changeStatusValidation } from './user.validation';
import { upload } from '../../utils/sendImageToCloudinary';
const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(createStudentValidationSchema),
  createStudent,
);

router.post(
  '/create-faculty',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(createFacultyValidationSchema),
  createFaculty,
);

router.post(
  '/create-admin',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(createAdminValidationSchema),
  createAdmin,
);

router.post(
  '/change-status/:id',
  validateRequest(changeStatusValidation),
  changeStatus,
);

router.get('/me', auth('student', 'faculty', 'admin'), getMe);
export const UserRoutes = router;
