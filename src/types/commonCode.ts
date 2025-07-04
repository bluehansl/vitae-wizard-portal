export interface CommonCode {
  id: string;
  category: CommonCodeCategory;
  value: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CommonCodeCategory = 'degree' | 'graduationStatus' | 'position';

export const COMMON_CODE_CATEGORIES = {
  degree: '학위',
  graduationStatus: '졸업상태', 
  position: '직급'
} as const;

export const DEFAULT_COMMON_CODES: Omit<CommonCode, 'id' | 'createdAt' | 'updatedAt'>[] = [
  // 학위
  { category: 'degree', value: '고등학교 졸업', order: 1, isActive: true },
  { category: 'degree', value: '전문학사', order: 2, isActive: true },
  { category: 'degree', value: '학사', order: 3, isActive: true },
  { category: 'degree', value: '석사', order: 4, isActive: true },
  { category: 'degree', value: '박사', order: 5, isActive: true },
  
  // 졸업상태
  { category: 'graduationStatus', value: '졸업', order: 1, isActive: true },
  { category: 'graduationStatus', value: '재학', order: 2, isActive: true },
  { category: 'graduationStatus', value: '휴학', order: 3, isActive: true },
  { category: 'graduationStatus', value: '수료', order: 4, isActive: true },
  { category: 'graduationStatus', value: '중퇴', order: 5, isActive: true },
  
  // 직급
  { category: 'position', value: '사원', order: 1, isActive: true },
  { category: 'position', value: '주임', order: 2, isActive: true },
  { category: 'position', value: '대리', order: 3, isActive: true },
  { category: 'position', value: '과장', order: 4, isActive: true },
  { category: 'position', value: '차장', order: 5, isActive: true },
  { category: 'position', value: '부장', order: 6, isActive: true },
  { category: 'position', value: '이사', order: 7, isActive: true },
  { category: 'position', value: '상무', order: 8, isActive: true },
  { category: 'position', value: '전무', order: 9, isActive: true },
  { category: 'position', value: '부사장', order: 10, isActive: true },
  { category: 'position', value: '사장', order: 11, isActive: true },
  { category: 'position', value: '연구원', order: 12, isActive: true },
  { category: 'position', value: '선임연구원', order: 13, isActive: true },
  { category: 'position', value: '수석연구원', order: 14, isActive: true },
  { category: 'position', value: '책임연구원', order: 15, isActive: true }
];