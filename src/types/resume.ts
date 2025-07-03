export interface Resume {
  id: string;
  title: string;
  basicInfo: BasicInfo;
  education: Education[];
  career: Career[];
  certificates: Certificate[];
  skills: Skill[];
  activities: Activity[];
  createdAt: string;
  updatedAt: string;
}

export interface BasicInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
  phoneVerified: boolean;
  emailVerified: boolean;
}

export interface Education {
  id: string;
  school: string;
  major: string;
  degree: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface Career {
  id: string;
  company: string;
  position: string;
  department: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Certificate {
  id: string;
  name: string;
  organization: string;
  acquisitionDate: string;
  expirationDate?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: string;
}

export interface Activity {
  id: string;
  name: string;
  organization: string;
  startDate: string;
  endDate: string;
  description: string;
}

export type ResumeStep = 'basic' | 'education' | 'career' | 'certificates' | 'skills' | 'activities';

export const RESUME_STEPS: { key: ResumeStep; label: string }[] = [
  { key: 'basic', label: '기본정보' },
  { key: 'education', label: '학력' },
  { key: 'career', label: '경력' },
  { key: 'certificates', label: '자격증' },
  { key: 'skills', label: '기술' },
  { key: 'activities', label: '대외활동' }
];