import express from 'express';
import {
  assignFaculties,
  createCourse,
  deleteCourse,
  getAllCourses,
  getSingleCurse,
  updateCourse,
} from './course.controller';
import validateRequest from '../midddlewares/validatedRequest';
import {
  assignFacultiesWithCourseValidationSchema,
  createCourseValidationSchema,
  updateCourseValidationSchema,
} from './course.validation';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(createCourseValidationSchema),
  createCourse,
);
router.get('/', getAllCourses);
router.get('/:id', getSingleCurse);
router.put(
  '/:courseId/assign-faculties',
  validateRequest(assignFacultiesWithCourseValidationSchema),
  assignFaculties,
);
router.delete('/:id', deleteCourse);
router.patch(
  '/:id',
  validateRequest(updateCourseValidationSchema),
  updateCourse,
);

export const CourseRoutes = router;
