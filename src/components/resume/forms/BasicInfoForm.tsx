import { useState } from 'react';
import { Resume } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface BasicInfoFormProps {
  resume: Resume;
  setResume: (resume: Resume) => void;
  onStepComplete: (step: 'basic') => void;
}

const BasicInfoForm = ({ resume, setResume, onStepComplete }: BasicInfoFormProps) => {
  const { toast } = useToast();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof Resume['basicInfo'] | 'title', value: string) => {
    if (field === 'title') {
      setResume({ ...resume, title: value });
    } else {
      setResume({
        ...resume,
        basicInfo: { ...resume.basicInfo, [field]: value }
      });
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleVerification = (type: 'phone' | 'email') => {
    // Simulate verification process
    toast({
      title: "인증 요청",
      description: `${type === 'phone' ? '전화번호' : '이메일'} 인증이 요청되었습니다.`,
    });
    
    // Auto-verify for demo purposes
    setTimeout(() => {
      setResume({
        ...resume,
        basicInfo: {
          ...resume.basicInfo,
          [`${type}Verified`]: true
        }
      });
      toast({
        title: "인증 완료",
        description: `${type === 'phone' ? '전화번호' : '이메일'} 인증이 완료되었습니다.`,
      });
    }, 2000);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!resume.title.trim()) newErrors.title = '이력서 제목을 입력해주세요.';
    if (!resume.basicInfo.name.trim()) newErrors.name = '이름을 입력해주세요.';
    if (!resume.basicInfo.phone.trim()) newErrors.phone = '전화번호를 입력해주세요.';
    if (!resume.basicInfo.email.trim()) newErrors.email = '이메일을 입력해주세요.';
    if (!resume.basicInfo.address.trim()) newErrors.address = '주소를 입력해주세요.';
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onStepComplete('basic');
      return true;
    }
    return false;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>기본 정보</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">이력서 제목 *</Label>
          <Input
            id="title"
            value={resume.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="예: 프론트엔드 개발자 김철수 이력서"
          />
          {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">이름 *</Label>
          <Input
            id="name"
            value={resume.basicInfo.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="이름을 입력해주세요"
          />
          {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">전화번호 *</Label>
          <div className="flex gap-2">
            <Input
              id="phone"
              value={resume.basicInfo.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="010-1234-5678"
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => handleVerification('phone')}
              disabled={!resume.basicInfo.phone || resume.basicInfo.phoneVerified}
            >
              {resume.basicInfo.phoneVerified ? '인증완료' : '인증'}
            </Button>
          </div>
          {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">이메일 *</Label>
          <div className="flex gap-2">
            <Input
              id="email"
              type="email"
              value={resume.basicInfo.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="example@email.com"
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => handleVerification('email')}
              disabled={!resume.basicInfo.email || resume.basicInfo.emailVerified}
            >
              {resume.basicInfo.emailVerified ? '인증완료' : '인증'}
            </Button>
          </div>
          {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">주소 *</Label>
          <Input
            id="address"
            value={resume.basicInfo.address}
            onChange={(e) => handleChange('address', e.target.value)}
            placeholder="서울시 강남구 테헤란로 123"
          />
          {errors.address && <p className="text-sm text-destructive">{errors.address}</p>}
        </div>

        <div className="pt-4">
          <Button onClick={validate} className="w-full">
            기본 정보 저장 및 다음 단계
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicInfoForm;