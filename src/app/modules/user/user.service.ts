import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { Student } from '../student.model';
import { TStudent } from '../student/student.interface';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generatedStudentId } from './user.utilts';

export const createStudentIntoDB = async (
  payload: TStudent,
  password: string,
) => {
  const userData: Partial<TUser> = {};

  // if password is not given then use the default pass
  userData.password = password || (config.default_pass as string);

  // set Student role
  userData.role = 'student';

  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  // set generated id
  userData.id = await generatedStudentId(admissionSemester);

  const newUser = await User.create(userData);

  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id; //reference _id
  }

  const newStudent = await Student.create(payload);

  return newStudent;
};
