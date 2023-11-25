import { StudentModel } from '../student.model';
import { Student } from './student.interface';

export const createStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

export const getStudentFromDB = async () => {
  const result = await StudentModel.find({});
  return result;
};

export const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};
