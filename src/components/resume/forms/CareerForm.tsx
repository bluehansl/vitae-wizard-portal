import { useState } from 'react';
import { Resume, Career } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCommonCodes } from '@/hooks/useCommonCodes';

interface CareerFormProps {
  resume: Resume;
  setResume: (resume: Resume) => void;
  onStepComplete: (step: 'career') => void;
}

const CareerForm = ({ resume, setResume, onStepComplete }: CareerFormProps) => {
  const { getCommonCodesByCategory } = useCommonCodes();
  const positions = getCommonCodesByCategory('position');
  const [newCareer, setNewCareer] = useState<Omit<Career, 'id'>>({
    company: '',
    position: '',
    department: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  const handleAddCareer = () => {
    if (!newCareer.company || !newCareer.position) {
      return;
    }

    const career: Career = {
      ...newCareer,
      id: Date.now().toString()
    };

    setResume({
      ...resume,
      career: [...resume.career, career]
    });

    setNewCareer({
      company: '',
      position: '',
      department: '',
      startDate: '',
      endDate: '',
      description: ''
    });

    onStepComplete('career');
  };

  const handleRemoveCareer = (id: string) => {
    setResume({
      ...resume,
      career: resume.career.filter(car => car.id !== id)
    });
  };

  const handleChange = (field: keyof Omit<Career, 'id'>, value: string) => {
    setNewCareer(prev => ({ ...prev, [field]: value }));
  };

  const handleSkip = () => {
    onStepComplete('career');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>경력</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Existing Career List */}
        {resume.career.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-medium">등록된 경력</h3>
            {resume.career.map((car) => (
              <div key={car.id} className="border rounded-lg p-4 bg-muted/50">
                <div className="flex justify-between items-start">
                  <div className="space-y-1 flex-1">
                    <p className="font-medium">{car.company}</p>
                    <p className="text-sm text-muted-foreground">
                      {car.position} {car.department && `(${car.department})`}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {car.startDate} ~ {car.endDate || '현재'}
                    </p>
                    {car.description && (
                      <p className="text-sm text-muted-foreground mt-2 whitespace-pre-line">
                        {car.description}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveCareer(car.id)}
                  >
                    삭제
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add New Career Form */}
        <div className="space-y-4 border rounded-lg p-4">
          <h3 className="font-medium">경력 추가</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">회사명 *</Label>
              <Input
                id="company"
                value={newCareer.company}
                onChange={(e) => handleChange('company', e.target.value)}
                placeholder="예: (주)테크컴퍼니"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">직위 *</Label>
              <Select value={newCareer.position} onValueChange={(value) => handleChange('position', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="직위를 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                  {positions.map((position) => (
                    <SelectItem key={position.id} value={position.value}>
                      {position.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">부서 (선택)</Label>
              <Input
                id="department"
                value={newCareer.department}
                onChange={(e) => handleChange('department', e.target.value)}
                placeholder="예: 개발팀"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="startDate">입사일 *</Label>
              <Input
                id="startDate"
                type="month"
                value={newCareer.startDate}
                onChange={(e) => handleChange('startDate', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">퇴사일 (현재 재직 중이면 비워두세요)</Label>
              <Input
                id="endDate"
                type="month"
                value={newCareer.endDate}
                onChange={(e) => handleChange('endDate', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">업무 내용 (선택)</Label>
            <Textarea
              id="description"
              value={newCareer.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="담당했던 업무나 성과를 입력해주세요."
              rows={4}
            />
          </div>

          <Button 
            onClick={handleAddCareer}
            disabled={!newCareer.company || !newCareer.position}
            className="w-full"
          >
            경력 추가
          </Button>
        </div>

        <div className="flex gap-4 pt-4">
          <Button onClick={handleSkip} variant="outline" className="flex-1">
            경력 없음 (건너뛰기)
          </Button>
          {resume.career.length > 0 && (
            <Button onClick={() => onStepComplete('career')} className="flex-1">
              경력 정보 저장 및 다음 단계
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CareerForm;
