import { Student } from '../student.model';

export const getStudentFromDB = async () => {
  const result = await Student.find({});
  return result;
};

export const getSingleStudentFromDB = async (id: string) => {
  //   const result = await Student.findOne({ id });
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

export const deleteSingleStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};
