import QueryBuilder from '../../builder/QueryBuilder';
import {
  AcademicSemesterSearchableFields,
  academicSemesterNameMapper,
} from './academicSemester.constant';
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

export const getAllAcademicSemesterFromDB = async (
  query: Record<string, unknown>,
) => {
  const academicSemesterQuery = new QueryBuilder(AcademicSemester.find(), query)
    .search(AcademicSemesterSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const data = await academicSemesterQuery.modelQuery;
  // const meta = await academicSemesterQuery.countTotal();
  // console.log('dataaaaaaaa', data);
  return data;
};
