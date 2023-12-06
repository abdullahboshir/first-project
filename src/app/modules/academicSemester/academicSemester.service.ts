import { academicSemesterNameMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

export const createAcademicSemesterIntoDB = async (
  payload: TAcademicSemester,
) => {
  if (academicSemesterNameMapper[payload.name] !== payload.code) {
    throw new Error('Invelid Semester Code');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};
