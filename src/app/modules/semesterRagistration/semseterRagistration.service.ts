import { AppError } from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TSemesterRagistration } from './semesterRagistration.interface';
import { SemesterRagistration } from './semesterRagistration.model';
import QueryBuilder from '../../builder/QueryBuilder';
import httpStatus from 'http-status';
import { RegistrationStatus } from './semesterRagistration.constant';

export const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRagistration,
) => {
  const academicSemester = payload?.academicSemester;

  //check if there any registered semester that is already 'UPCOMING'|'ONGOING'
  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRagistration.findOne({
      $or: [
        { status: RegistrationStatus.UPCOMING },
        { status: RegistrationStatus.ONGOING },
      ],
    });

  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already a ${isThereAnyUpcomingOrOngoingSemester.status} Registered Semester`,
    );
  }

  //   check if the semester is exist
  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);

  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This academic Semester is not found',
    );
  }

  //   check if the semester is already registered
  const isSemesterRegistrationExists = await SemesterRagistration.findOne({
    academicSemester,
  });

  if (isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      'The semester is already registered!',
    );
  }

  const result = await SemesterRagistration.create(payload);
  return result;
};

export const getAllSemesterRegistrationsFromDB = async (
  query: Record<string, unknown>,
) => {
  const semeterRegistrationQuery = new QueryBuilder(
    SemesterRagistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semeterRegistrationQuery.modelQuery;
  return result;
};

export const getSingleSemesterRegistrationsFromDB = async (id: string) => {
  const result = await SemesterRagistration.findById(id);
  return result;
};

export const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRagistration>,
) => {
  //   check if the semester is already registered
  const isSemesterRegistrationExists = await SemesterRagistration.findById(id);

  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'The semester is not found!');
  }

  const currentSemesterStatus = isSemesterRegistrationExists?.status;
  const requestedStatus = payload?.status;

  if (currentSemesterStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester is already ${currentSemesterStatus}`,
    );
  }

  if (
    currentSemesterStatus === RegistrationStatus.ONGOING &&
    requestedStatus === RegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from${currentSemesterStatus} to ${requestedStatus}`,
    );
  }

  const result = await SemesterRagistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};
