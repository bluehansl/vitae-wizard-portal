import { useState } from 'react';
import { Resume, Skill } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface SkillsFormProps {
  resume: Resume;
  setResume: (resume: Resume) => void;
  onStepComplete: (step: 'skills') => void;
}

const SkillsForm = ({ resume, setResume, onStepComplete }: SkillsFormProps) => {
  const [newSkill, setNewSkill] = useState<Omit<Skill, 'id'>>({
    name: '',
    level: 'beginner',
    category: ''
  });

  const skillLevels = [
    { value: 'beginner', label: '초급' },
    { value: 'intermediate', label: '중급' },
    { value: 'advanced', label: '고급' },
    { value: 'expert', label: '전문가' }
  ];

  const handleAddSkill = () => {
    if (!newSkill.name || !newSkill.category) {
      return;
    }

    const skill: Skill = {
      ...newSkill,
      id: Date.now().toString()
    };

    setResume({
      ...resume,
      skills: [...resume.skills, skill]
    });

    setNewSkill({
      name: '',
      level: 'beginner',
      category: ''
    });

    onStepComplete('skills');
  };

  const handleRemoveSkill = (id: string) => {
    setResume({
      ...resume,
      skills: resume.skills.filter(skill => skill.id !== id)
    });
  };

  const handleChange = (field: keyof Omit<Skill, 'id'>, value: string) => {
    setNewSkill(prev => ({ ...prev, [field]: value }));
  };

  const handleSkip = () => {
    onStepComplete('skills');
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-purple-100 text-purple-800';
      case 'expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelLabel = (level: string) => {
    const levelObj = skillLevels.find(l => l.value === level);
    return levelObj ? levelObj.label : level;
  };

  // Group skills by category
  const groupedSkills = resume.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <Card>
      <CardHeader>
        <CardTitle>기술 스택</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Existing Skills List */}
        {resume.skills.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-medium">등록된 기술</h3>
            {Object.entries(groupedSkills).map(([category, skills]) => (
              <div key={category} className="border rounded-lg p-4 bg-muted/50">
                <h4 className="font-medium mb-3">{category}</h4>
                <div className="space-y-2">
                  {skills.map((skill) => (
                    <div key={skill.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{skill.name}</span>
                        <Badge className={getLevelColor(skill.level)}>
                          {getLevelLabel(skill.level)}
                        </Badge>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRemoveSkill(skill.id)}
                      >
                        삭제
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add New Skill Form */}
        <div className="space-y-4 border rounded-lg p-4">
          <h3 className="font-medium">기술 추가</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="skillName">기술명 *</Label>
              <Input
                id="skillName"
                value={newSkill.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="예: React"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skillCategory">카테고리 *</Label>
              <Input
                id="skillCategory"
                value={newSkill.category}
                onChange={(e) => handleChange('category', e.target.value)}
                placeholder="예: 프론트엔드"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skillLevel">숙련도 *</Label>
              <Select value={newSkill.level} onValueChange={(value) => handleChange('level', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="숙련도를 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                  {skillLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={handleAddSkill}
            disabled={!newSkill.name || !newSkill.category}
            className="w-full"
          >
            기술 추가
          </Button>
        </div>

        <div className="flex gap-4 pt-4">
          <Button onClick={handleSkip} variant="outline" className="flex-1">
            기술 없음 (건너뛰기)
          </Button>
          {resume.skills.length > 0 && (
            <Button onClick={() => onStepComplete('skills')} className="flex-1">
              기술 정보 저장 및 다음 단계
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsForm;
