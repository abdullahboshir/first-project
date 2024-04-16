import express from 'express';
// import auth from '../../middlewares/auth';
// import { USER_ROLE } from '../user/user.constant';

import validateRequest from '../../midddlewares/validatedRequest';
import { updateFacultyValidationSchema } from './faculty.validation';
import {
  deleteFaculty,
  getSingleFaculty,
  updateFaculty,
} from './faculty.controller';

const router = express.Router();

router.get('/:id', getSingleFaculty);

router.patch(
  '/:id',
  validateRequest(updateFacultyValidationSchema),
  updateFaculty,
);

router.delete('/:id', deleteFaculty);

// router.get(
//   '/',
//   auth(USER_ROLE.admin, USER_ROLE.faculty),
//   FacultyControllers.getAllFaculties,
// );

export const FacultyRoutes = router;
