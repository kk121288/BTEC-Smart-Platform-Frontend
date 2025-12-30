export interface Class {
  id: string;
  name: string;
  code: string;
  description: string;
  teacherId: string;
  teacherName: string;
  studentIds: string[];
  subjectIds: string[];
  schedule: ClassSchedule[];
  capacity: number;
  academicYear: string;
  semester: string;
  createdAt: number;
  updatedAt: number;
}

export interface ClassSchedule {
  day: string;
  startTime: string;
  endTime: string;
  room: string;
}
