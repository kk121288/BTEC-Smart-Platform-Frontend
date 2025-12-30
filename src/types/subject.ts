export interface Subject {
  id: string;
  name: string;
  code: string;
  description: string;
  credits: number;
  teacherIds: string[];
  materials: SubjectMaterial[];
  prerequisites: string[];
  category: string;
  level: string;
  createdAt: number;
  updatedAt: number;
}

export interface SubjectMaterial {
  id: string;
  name: string;
  type: 'pdf' | 'video' | 'document' | 'link';
  url: string;
  size?: number;
  uploadedAt: number;
}
