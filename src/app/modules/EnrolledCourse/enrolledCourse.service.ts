/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { OfferedCourse } from '../offeredCourse/offeredCourse.model';
import EnrolledCourse from './enrolledCourse.model';
import { TEnrolledCourse } from './enrolledCourse.interface';
import { Student } from '../student/student.model';
import mongoose from 'mongoose';
import { SemesterRagistration } from '../semesterRagistration/semesterRagistration.model';
import { Course } from '../../course/course.model';

export const createEnrolledCourseIntoDB = async (
  userId: string,
  payload: TEnrolledCourse,
) => {
  const isOfferedCourseExists = await OfferedCourse.findById(
    payload?.offeredCourse,
  );
  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offerd Course is not found!');
  }

  if (isOfferedCourseExists.maxCapacity <= 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Room ia full!');
  }

  const student = await Student.findOne({ id: userId }, { _id: 1 });

  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'student is not found!');
  }

  const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
    semesterRegistration: isOfferedCourseExists?.semesterRegistration,
    offeredCourse: payload?.offeredCourse,
    student: student?._id,
  });

  if (isStudentAlreadyEnrolled) {
    throw new AppError(
      httpStatus.CONFLICT,
      'You have already Enrolled the course!',
    );
  }

  const semesterRegistration = await SemesterRagistration.findById(
    isOfferedCourseExists.semesterRegistration,
    { maxCredit: 1 },
  );

  const enrolledCourse = await EnrolledCourse.aggregate([
    {
      $match: {
        semesterRegistration: isOfferedCourseExists.semesterRegistration,
        student: student._id,
      },
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'enrolledCourseData',
      },
    },
    {
      $unwind: '$enrolledCourseData',
    },
    {
      $group: {
        _id: null,
        totalEnrolledCredits: { $sum: '$enrolledCourseData.credits' },
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ]);

  const course = await Course.findById(isOfferedCourseExists.course);

  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course is not found!');
  }

  const maxCredits = semesterRegistration?.maxCredit;
  const totalCredits =
    enrolledCourse.length > 0 ? enrolledCourse[0].totalEnrolledCredits : 0;

  if (
    totalCredits &&
    maxCredits &&
    totalCredits + course?.credits > maxCredits
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You have exceeded maximum number of credits',
    );
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const result = await EnrolledCourse.create(
      [
        {
          semesterRegistration: isOfferedCourseExists.semesterRegistration,
          academicSemester: isOfferedCourseExists.academicSemester,
          academicFaculty: isOfferedCourseExists.academicFaculty,
          academicDepartment: isOfferedCourseExists.academicDepartment,
          offeredCourse: payload?.offeredCourse,
          course: isOfferedCourseExists.course,
          student: student._id,
          faculty: isOfferedCourseExists.faculty,
          isEnrolled: true,
        },
      ],
      { session },
    );

    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Course is not endrolled !');
    }

    const maxCapacity = isOfferedCourseExists.maxCapacity;

    await OfferedCourse.findByIdAndUpdate(
      { _id: payload?.offeredCourse },
      {
        maxCapacity: maxCapacity - 1,
      },
    );

    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const updateEnrolledCourseMarksIntoDB = async (
  facultyId: string,
  payload: Partial<TEnrolledCourse>,
) => {
  const { semesterRegistration, offeredCourse, student, courseMarks } = payload;

  const isSemesterRegistrationExits =
    await SemesterRagistration.findById(semesterRegistration);

  if (!isSemesterRegistrationExits) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semster Registration is not found',
    );
  }

  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse);
  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offerd Course is not found!');
  }

  const studentData = await Student.findById(student);

  if (!studentData) {
    throw new AppError(httpStatus.NOT_FOUND, 'student is not found!');
  }
};
