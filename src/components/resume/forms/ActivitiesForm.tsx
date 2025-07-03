import { useState } from 'react';
import { Resume, Activity } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ActivitiesFormProps {
  resume: Resume;
  setResume: (resume: Resume) => void;
  onStepComplete: (step: 'activities') => void;
}

const ActivitiesForm = ({ resume, setResume, onStepComplete }: ActivitiesFormProps) => {
  const [newActivity, setNewActivity] = useState<Omit<Activity, 'id'>>({
    name: '',
    organization: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  const handleAddActivity = () => {
    if (!newActivity.name || !newActivity.organization) {
      return;
    }

    const activity: Activity = {
      ...newActivity,
      id: Date.now().toString()
    };

    setResume({
      ...resume,
      activities: [...resume.activities, activity]
    });

    setNewActivity({
      name: '',
      organization: '',
      startDate: '',
      endDate: '',
      description: ''
    });

    onStepComplete('activities');
  };

  const handleRemoveActivity = (id: string) => {
    setResume({
      ...resume,
      activities: resume.activities.filter(activity => activity.id !== id)
    });
  };

  const handleChange = (field: keyof Omit<Activity, 'id'>, value: string) => {
    setNewActivity(prev => ({ ...prev, [field]: value }));
  };

  const handleSkip = () => {
    onStepComplete('activities');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>대외활동</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Existing Activities List */}
        {resume.activities.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-medium">등록된 대외활동</h3>
            {resume.activities.map((activity) => (
              <div key={activity.id} className="border rounded-lg p-4 bg-muted/50">
                <div className="flex justify-between items-start">
                  <div className="space-y-1 flex-1">
                    <p className="font-medium">{activity.name}</p>
                    <p className="text-sm text-muted-foreground">{activity.organization}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.startDate} ~ {activity.endDate || '현재'}
                    </p>
                    {activity.description && (
                      <p className="text-sm text-muted-foreground mt-2 whitespace-pre-line">
                        {activity.description}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveActivity(activity.id)}
                  >
                    삭제
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add New Activity Form */}
        <div className="space-y-4 border rounded-lg p-4">
          <h3 className="font-medium">대외활동 추가</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="activityName">활동명 *</Label>
              <Input
                id="activityName"
                value={newActivity.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="예: 동아리 회장"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="organization">기관/단체 *</Label>
              <Input
                id="organization"
                value={newActivity.organization}
                onChange={(e) => handleChange('organization', e.target.value)}
                placeholder="예: 프로그래밍 동아리"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="startDate">시작일 *</Label>
              <Input
                id="startDate"
                type="month"
                value={newActivity.startDate}
                onChange={(e) => handleChange('startDate', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">종료일 (현재 진행 중이면 비워두세요)</Label>
              <Input
                id="endDate"
                type="month"
                value={newActivity.endDate}
                onChange={(e) => handleChange('endDate', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">활동 내용 (선택)</Label>
            <Textarea
              id="description"
              value={newActivity.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="활동 내용이나 성과를 입력해주세요."
              rows={4}
            />
          </div>

          <Button 
            onClick={handleAddActivity}
            disabled={!newActivity.name || !newActivity.organization}
            className="w-full"
          >
            대외활동 추가
          </Button>
        </div>

        <div className="flex gap-4 pt-4">
          <Button onClick={handleSkip} variant="outline" className="flex-1">
            대외활동 없음 (건너뛰기)
          </Button>
          {resume.activities.length > 0 && (
            <Button onClick={() => onStepComplete('activities')} className="flex-1">
              대외활동 정보 저장 및 완료
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivitiesForm;
