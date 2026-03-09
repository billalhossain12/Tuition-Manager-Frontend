export interface WeeklySchedule {
  day: string;
  startTime: string;
  endTime: string;
}

export interface StudentInfo {
  _id: string;
  name: string;
  phone: string;
  subject: string;
  address: string;
}

export interface Routine {
  _id: string;
  tutorId: string;
  studentId: StudentInfo;
  weeklySchedule: WeeklySchedule[];
  monthlySalary: number;
  startDate: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}


export interface StudentOption {
  _id: string;
  name: string;
}

export interface RoutineForm {
  studentId: string;
  startDate: string;
  weeklySchedule: WeeklySchedule[];
}
