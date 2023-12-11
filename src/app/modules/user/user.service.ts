import { startSession } from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { Student } from '../student.model';
import { TStudent } from '../student/student.interface';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generatedStudentId } from './user.utilts';
import { AppError } from '../../errors/AppError';
import httpStatus from 'http-status';

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

  const session = await startSession();

  try {
    session.startTransaction();
    // set generated id
    userData.id = await generatedStudentId(admissionSemester);

    // transaction-1
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // transaction-2
    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw new AppError(
      httpStatus.FAILED_DEPENDENCY,
      'Student or User created failed',
    );
  }
};
