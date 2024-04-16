import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { StudentRoutes } from '../modules/student/student.route';
import { academicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { CourseRoutes } from '../course/course.route';
import { semesterRagistrationRoutes } from '../modules/semesterRagistration/semesterRagistration.route';
import { offeredCourseRoutes } from '../modules/offeredCourse/offeredCourse.route';
import { FacultyRoutes } from '../modules/faculty/faculty.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { EnrolledCourseRoutes } from '../modules/EnrolledCourse/enrolledCourse.route';
import { TestRoutes } from '../modules/test/todos';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/academic-semesters',
    route: academicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/semester-ragistrations',
    route: semesterRagistrationRoutes,
  },
  {
    path: '/offered-courses',
    route: offeredCourseRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/enrolled-course',
    route: EnrolledCourseRoutes,
  },
  {
    path: '/todo',
    route: TestRoutes, 
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
