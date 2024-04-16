import { ObjectId, Types } from 'mongoose';

export type TPreRequisiteCorse = {
  course: ObjectId;
  isDeleted: boolean;
};

export type TCourse = {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourses: TPreRequisiteCorse[];
  isDeleted?: boolean;
};

export type CourseFaculty = {
  course: Types.ObjectId;
  faculties: [Types.ObjectId];
};

export type TCourseFaculty = {
  course: Types.ObjectId;
  faculties: [Types.ObjectId];
};
