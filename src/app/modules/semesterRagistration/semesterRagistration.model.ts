import mongoose, { Schema, model } from 'mongoose';
import { TSemesterRagistration } from './semesterRagistration.interface';
import { semesterRagistrationStatus } from './semesterRagistration.constant';

const semesterRagistrationModel = new mongoose.Schema<TSemesterRagistration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'AcademicSemester',
    },
    status: {
      type: String,
      enum: semesterRagistrationStatus,
      default: 'UPCOMING',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    minCredit: {
      type: Number,
      default: 3,
    },
    maxCredit: {
      type: Number,
      default: 16,
    },
  },
  {
    timestamps: true,
  },
);

export const SemesterRagistration = model<TSemesterRagistration>(
  'SemesterRagistration',
  semesterRagistrationModel,
);
