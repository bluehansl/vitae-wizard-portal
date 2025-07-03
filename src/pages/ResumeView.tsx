import { useParams, useNavigate } from 'react-router-dom';
import { useResumes } from '@/hooks/useResumes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ResumeView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getResume } = useResumes();

  if (!id) {
    navigate('/');
    return null;
  }

  const resume = getResume(id);

  if (!resume) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">이력서를 찾을 수 없습니다.</p>
        <Button onClick={() => navigate('/')}>목록으로 돌아가기</Button>
      </div>
    );
  }

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'beginner': return '초급';
      case 'intermediate': return '중급';
      case 'advanced': return '고급';
      case 'expert': return '전문가';
      default: return level;
    }
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

  // Group skills by category
  const groupedSkills = resume.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof resume.skills>);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{resume.title}</h1>
        <Button onClick={() => navigate('/')}>목록으로</Button>
      </div>

      <div className="space-y-6">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle>기본 정보</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="font-medium">이름:</span> {resume.basicInfo.name}
            </div>
            <div>
              <span className="font-medium">전화번호:</span> {resume.basicInfo.phone}
              {resume.basicInfo.phoneVerified && (
                <Badge className="ml-2 bg-green-100 text-green-800">인증완료</Badge>
              )}
            </div>
            <div>
              <span className="font-medium">이메일:</span> {resume.basicInfo.email}
              {resume.basicInfo.emailVerified && (
                <Badge className="ml-2 bg-green-100 text-green-800">인증완료</Badge>
              )}
            </div>
            <div>
              <span className="font-medium">주소:</span> {resume.basicInfo.address}
            </div>
          </CardContent>
        </Card>

        {/* Education */}
        {resume.education.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>학력</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {resume.education.map((edu) => (
                <div key={edu.id} className="border-l-4 border-primary pl-4">
                  <h3 className="font-medium">{edu.school}</h3>
                  <p className="text-muted-foreground">
                    {edu.major} ({edu.degree})
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {edu.startDate} ~ {edu.endDate}
                  </p>
                  {edu.gpa && (
                    <p className="text-sm text-muted-foreground">학점: {edu.gpa}</p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Career */}
        {resume.career.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>경력</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {resume.career.map((car) => (
                <div key={car.id} className="border-l-4 border-primary pl-4">
                  <h3 className="font-medium">{car.company}</h3>
                  <p className="text-muted-foreground">
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
              ))}
            </CardContent>
          </Card>
        )}

        {/* Certificates */}
        {resume.certificates.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>자격증</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resume.certificates.map((cert) => (
                <div key={cert.id} className="border rounded-lg p-4">
                  <h3 className="font-medium">{cert.name}</h3>
                  <p className="text-muted-foreground">{cert.organization}</p>
                  <p className="text-sm text-muted-foreground">
                    취득일: {cert.acquisitionDate}
                  </p>
                  {cert.expirationDate && (
                    <p className="text-sm text-muted-foreground">
                      유효기간: {cert.expirationDate}
                    </p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Skills */}
        {resume.skills.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>기술 스택</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(groupedSkills).map(([category, skills]) => (
                <div key={category}>
                  <h3 className="font-medium mb-2">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <div key={skill.id} className="flex items-center gap-2">
                        <span className="font-medium">{skill.name}</span>
                        <Badge className={getLevelColor(skill.level)}>
                          {getLevelLabel(skill.level)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Activities */}
        {resume.activities.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>대외활동</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {resume.activities.map((activity) => (
                <div key={activity.id} className="border-l-4 border-primary pl-4">
                  <h3 className="font-medium">{activity.name}</h3>
                  <p className="text-muted-foreground">{activity.organization}</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.startDate} ~ {activity.endDate || '현재'}
                  </p>
                  {activity.description && (
                    <p className="text-sm text-muted-foreground mt-2 whitespace-pre-line">
                      {activity.description}
                    </p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ResumeView;