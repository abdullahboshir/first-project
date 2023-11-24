import { Schema, model, connect } from 'mongoose';
import { Student } from './student/student.interface';

const StudentSchema = new Schema<Student>({
  id: { type: String },
  name: {
    firstName: {
      type: String,
      required: true,
    },
    middleNmae: {
      type: String,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  gender: ['male', 'female'],
  dateOfBirth: { type: String },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: ['A+', 'AB+', 'A-', 'AB-', 'B+', 'B-', 'O+', 'O-'],
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    fatherName: { type: String, required: true },
    fatherOccupation: { type: String, required: true },
    fatherContactNo: { type: String, required: true },
    motherName: { type: String, required: true },
    motherOccupation: { type: String, required: true },
    motherContactNo: { type: String, required: true },
  },
  localGuardian: {
    firstName: { type: String, required: true },
    middleNmae: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  profileImg: { type: String },
  isActive: ['active', 'blocked'],
});
