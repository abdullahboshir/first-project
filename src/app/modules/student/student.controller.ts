import { Request, Response } from 'express';
import {
  createStudentIntoDB,
  getSingleStudentFromDB,
  getStudentFromDB,
} from './student.service';

export const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body.student;
    const result = await createStudentIntoDB(student);

    res.status(200).json({
      success: true,
      message: 'Student created is successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllSudents = async (req: Request, res: Response) => {
  try {
    const result = await getStudentFromDB();

    res.status(200).json({
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await getSingleStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
