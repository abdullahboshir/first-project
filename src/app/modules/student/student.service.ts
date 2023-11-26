import { Student } from '../student.model';
import { TStudent } from './student.interface';

export const createStudentIntoDB = async (studentData: TStudent) => {
  //   static method
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('User already exists!');
  }

  const result = await Student.create(studentData);

  //   const student = new Student(studentData); //create  instance method
  //   if (await student.isUserExists(studentData.id)) {
  //     throw new Error('User already exists');
  //   }
  //   const result = await student.save(); //build in instance method
  return result;
};

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
