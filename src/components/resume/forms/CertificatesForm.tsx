import { useState } from 'react';
import { Resume, Certificate } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CertificatesFormProps {
  resume: Resume;
  setResume: (resume: Resume) => void;
  onStepComplete: (step: 'certificates') => void;
}

const CertificatesForm = ({ resume, setResume, onStepComplete }: CertificatesFormProps) => {
  const [newCertificate, setNewCertificate] = useState<Omit<Certificate, 'id'>>({
    name: '',
    organization: '',
    acquisitionDate: '',
    expirationDate: ''
  });

  const handleAddCertificate = () => {
    if (!newCertificate.name || !newCertificate.organization || !newCertificate.acquisitionDate) {
      return;
    }

    const certificate: Certificate = {
      ...newCertificate,
      id: Date.now().toString()
    };

    setResume({
      ...resume,
      certificates: [...resume.certificates, certificate]
    });

    setNewCertificate({
      name: '',
      organization: '',
      acquisitionDate: '',
      expirationDate: ''
    });

    onStepComplete('certificates');
  };

  const handleRemoveCertificate = (id: string) => {
    setResume({
      ...resume,
      certificates: resume.certificates.filter(cert => cert.id !== id)
    });
  };

  const handleChange = (field: keyof Omit<Certificate, 'id'>, value: string) => {
    setNewCertificate(prev => ({ ...prev, [field]: value }));
  };

  const handleSkip = () => {
    onStepComplete('certificates');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>자격증</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Existing Certificates List */}
        {resume.certificates.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-medium">등록된 자격증</h3>
            {resume.certificates.map((cert) => (
              <div key={cert.id} className="border rounded-lg p-4 bg-muted/50">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="font-medium">{cert.name}</p>
                    <p className="text-sm text-muted-foreground">{cert.organization}</p>
                    <p className="text-sm text-muted-foreground">
                      취득일: {cert.acquisitionDate}
                    </p>
                    {cert.expirationDate && (
                      <p className="text-sm text-muted-foreground">
                        유효기간: {cert.expirationDate}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveCertificate(cert.id)}
                  >
                    삭제
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add New Certificate Form */}
        <div className="space-y-4 border rounded-lg p-4">
          <h3 className="font-medium">자격증 추가</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="certName">자격증명 *</Label>
              <Input
                id="certName"
                value={newCertificate.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="예: 정보처리기사"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="organization">발급기관 *</Label>
              <Input
                id="organization"
                value={newCertificate.organization}
                onChange={(e) => handleChange('organization', e.target.value)}
                placeholder="예: 한국산업인력공단"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="acquisitionDate">취득일 *</Label>
              <Input
                id="acquisitionDate"
                type="date"
                value={newCertificate.acquisitionDate}
                onChange={(e) => handleChange('acquisitionDate', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expirationDate">유효기간 (선택)</Label>
              <Input
                id="expirationDate"
                type="date"
                value={newCertificate.expirationDate}
                onChange={(e) => handleChange('expirationDate', e.target.value)}
              />
            </div>
          </div>

          <Button 
            onClick={handleAddCertificate}
            disabled={!newCertificate.name || !newCertificate.organization || !newCertificate.acquisitionDate}
            className="w-full"
          >
            자격증 추가
          </Button>
        </div>

        <div className="flex gap-4 pt-4">
          <Button onClick={handleSkip} variant="outline" className="flex-1">
            자격증 없음 (건너뛰기)
          </Button>
          {resume.certificates.length > 0 && (
            <Button onClick={() => onStepComplete('certificates')} className="flex-1">
              자격증 정보 저장 및 다음 단계
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CertificatesForm;
