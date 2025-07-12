
export interface Teacher {
  id?: number; 
  name: string;
  email: string;
  phone: string;
  role: string;
  birthDate: string;
  qualifications?: Qualification[];
}


export interface Student {
  id?: number;
  name: string;
  email: string;
  class: string;
  performance: number; 
}

export interface Qualification {
  name: string;
  rate: string; 
}


export interface Schedule {
  id?: number;
  className: string;
  teacherName: string;
  timeSlot: string; 
}
