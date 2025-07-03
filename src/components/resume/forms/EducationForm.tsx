import { useState } from 'react';
import { Resume, Education } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface EducationFormProps {
  resume: Resume;
  setResume: (resume: Resume) => void;
  onStepComplete: (step: 'education') => void;
}

const EducationForm = ({ resume, setResume, onStepComplete }: EducationFormProps) => {
  const [newEducation, setNewEducation] = useState<Omit<Education, 'id'>>({
    school: '',
    major: '',
    degree: '',
    startDate: '',
    endDate: '',
    gpa: ''
  });

  const handleAddEducation = () => {
    if (!newEducation.school || !newEducation.major || !newEducation.degree) {
      return;
    }

    const education: Education = {
      ...newEducation,
      id: Date.now().toString()
    };

    setResume({
      ...resume,
      education: [...resume.education, education]
    });

    setNewEducation({
      school: '',
      major: '',
      degree: '',
      startDate: '',
      endDate: '',
      gpa: ''
    });

    onStepComplete('education');
  };

  const handleRemoveEducation = (id: string) => {
    setResume({
      ...resume,
      education: resume.education.filter(edu => edu.id !== id)
    });
  };

  const handleChange = (field: keyof Omit<Education, 'id'>, value: string) => {
    setNewEducation(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>학력</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Existing Education List */}
        {resume.education.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-medium">등록된 학력</h3>
            {resume.education.map((edu) => (
              <div key={edu.id} className="border rounded-lg p-4 bg-muted/50">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="font-medium">{edu.school}</p>
                    <p className="text-sm text-muted-foreground">
                      {edu.major} ({edu.degree})
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {edu.startDate} ~ {edu.endDate}
                    </p>
                    {edu.gpa && (
                      <p className="text-sm text-muted-foreground">학점: {edu.gpa}</p>
                    )}
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveEducation(edu.id)}
                  >
                    삭제
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add New Education Form */}
        <div className="space-y-4 border rounded-lg p-4">
          <h3 className="font-medium">학력 추가</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="school">학교명 *</Label>
              <Input
                id="school"
                value={newEducation.school}
                onChange={(e) => handleChange('school', e.target.value)}
                placeholder="예: 서울대학교"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="major">전공 *</Label>
              <Input
                id="major"
                value={newEducation.major}
                onChange={(e) => handleChange('major', e.target.value)}
                placeholder="예: 컴퓨터공학과"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="degree">학위 *</Label>
              <Select value={newEducation.degree} onValueChange={(value) => handleChange('degree', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="학위를 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="고등학교 졸업">고등학교 졸업</SelectItem>
                  <SelectItem value="전문학사">전문학사</SelectItem>
                  <SelectItem value="학사">학사</SelectItem>
                  <SelectItem value="석사">석사</SelectItem>
                  <SelectItem value="박사">박사</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gpa">학점 (선택)</Label>
              <Input
                id="gpa"
                value={newEducation.gpa}
                onChange={(e) => handleChange('gpa', e.target.value)}
                placeholder="예: 3.8/4.5"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="startDate">입학일 *</Label>
              <Input
                id="startDate"
                type="month"
                value={newEducation.startDate}
                onChange={(e) => handleChange('startDate', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">졸업일 *</Label>
              <Input
                id="endDate"
                type="month"
                value={newEducation.endDate}
                onChange={(e) => handleChange('endDate', e.target.value)}
              />
            </div>
          </div>

          <Button 
            onClick={handleAddEducation}
            disabled={!newEducation.school || !newEducation.major || !newEducation.degree}
            className="w-full"
          >
            학력 추가
          </Button>
        </div>

        {resume.education.length > 0 && (
          <div className="pt-4">
            <Button onClick={() => onStepComplete('education')} className="w-full">
              학력 정보 저장 및 다음 단계
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EducationForm;
