import { z } from 'zod';
import { semesterRagistrationStatus } from './semesterRagistration.constant';

const createSemesterRagistratonValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string(),
    status: z.enum([...(semesterRagistrationStatus as [string, ...string[]])]),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    minCredit: z.number(),
    maxCredit: z.number(),
  }),
});

const updateSemesterRagistratonValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string().optional(),
    status: z
      .enum([...(semesterRagistrationStatus as [string, ...string[]])])
      .optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    minCredit: z.number().optional(),
    maxCredit: z.number().optional(),
  }),
});

export const SemesterRagisterValidations = {
  createSemesterRagistratonValidationSchema,
  updateSemesterRagistratonValidationSchema,
};
