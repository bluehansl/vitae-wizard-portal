import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Resume, ResumeStep, RESUME_STEPS } from '@/types/resume';
import { useResumes } from '@/hooks/useResumes';
import { useToast } from '@/hooks/use-toast';
import ResumeStepNavigator from '@/components/resume/ResumeStepNavigator';
import BasicInfoForm from '@/components/resume/forms/BasicInfoForm';
import EducationForm from '@/components/resume/forms/EducationForm';
import CareerForm from '@/components/resume/forms/CareerForm';
import CertificatesForm from '@/components/resume/forms/CertificatesForm';
import SkillsForm from '@/components/resume/forms/SkillsForm';
import ActivitiesForm from '@/components/resume/forms/ActivitiesForm';

const ResumeCreate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addResume, updateResume, getResume } = useResumes();
  const { toast } = useToast();
  const isEditing = !!id;

  const [currentStep, setCurrentStep] = useState<ResumeStep>('basic');
  const [completedSteps, setCompletedSteps] = useState<ResumeStep[]>([]);
  const [resume, setResume] = useState<Resume>({
    id: id || Date.now().toString(),
    title: '',
    basicInfo: {
      name: '',
      phone: '',
      email: '',
      address: '',
      phoneVerified: false,
      emailVerified: false
    },
    education: [],
    career: [],
    certificates: [],
    skills: [],
    activities: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  useEffect(() => {
    if (isEditing && id) {
      const existingResume = getResume(id);
      if (existingResume) {
        setResume(existingResume);
        // Mark all steps as completed if they have data
        const completed: ResumeStep[] = [];
        if (existingResume.title && existingResume.basicInfo.name) completed.push('basic');
        if (existingResume.education.length > 0) completed.push('education');
        if (existingResume.career.length > 0) completed.push('career');
        if (existingResume.certificates.length > 0) completed.push('certificates');
        if (existingResume.skills.length > 0) completed.push('skills');
        if (existingResume.activities.length > 0) completed.push('activities');
        setCompletedSteps(completed);
      } else {
        navigate('/');
      }
    }
  }, [isEditing, id, getResume, navigate]);

  const handleStepChange = (step: ResumeStep) => {
    setCurrentStep(step);
  };

  const getCurrentStepIndex = () => {
    return RESUME_STEPS.findIndex(step => step.key === currentStep);
  };

  const handleNext = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex < RESUME_STEPS.length - 1) {
      const nextStep = RESUME_STEPS[currentIndex + 1].key;
      setCurrentStep(nextStep);
    }
  };

  const handlePrevious = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex > 0) {
      const prevStep = RESUME_STEPS[currentIndex - 1].key;
      setCurrentStep(prevStep);
    }
  };

  const markStepCompleted = (step: ResumeStep) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps(prev => [...prev, step]);
    }
  };

  const handleSave = () => {
    const updatedResume = {
      ...resume,
      updatedAt: new Date().toISOString()
    };

    if (isEditing) {
      updateResume(updatedResume);
      toast({
        title: "수정 완료",
        description: "이력서가 성공적으로 수정되었습니다.",
      });
    } else {
      addResume(updatedResume);
      toast({
        title: "저장 완료",
        description: "이력서가 성공적으로 저장되었습니다.",
      });
    }
    
    navigate('/');
  };

  const renderCurrentForm = () => {
    const formProps = {
      resume,
      setResume,
      onStepComplete: markStepCompleted
    };

    switch (currentStep) {
      case 'basic':
        return <BasicInfoForm {...formProps} />;
      case 'education':
        return <EducationForm {...formProps} />;
      case 'career':
        return <CareerForm {...formProps} />;
      case 'certificates':
        return <CertificatesForm {...formProps} />;
      case 'skills':
        return <SkillsForm {...formProps} />;
      case 'activities':
        return <ActivitiesForm {...formProps} />;
      default:
        return null;
    }
  };

  const currentIndex = getCurrentStepIndex();
  const isFirstStep = currentIndex === 0;
  const isLastStep = currentIndex === RESUME_STEPS.length - 1;

  return (
    <div>
      <ResumeStepNavigator
        currentStep={currentStep}
        onStepChange={handleStepChange}
        completedSteps={completedSteps}
      />

      <div className="max-w-4xl mx-auto">
        {renderCurrentForm()}

        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevious}
            disabled={isFirstStep}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              isFirstStep
                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            이전
          </button>

          <div className="flex gap-4">
            {isLastStep ? (
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
              >
                {isEditing ? '수정 완료' : '저장'}
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
              >
                다음
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeCreate;