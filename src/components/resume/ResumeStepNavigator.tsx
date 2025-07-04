import { RESUME_STEPS, ResumeStep } from '@/types/resume';
import { cn } from '@/lib/utils';
import { Baby, GraduationCap, Briefcase, Award, Code, Users } from 'lucide-react';

interface ResumeStepNavigatorProps {
  currentStep: ResumeStep;
  onStepChange: (step: ResumeStep) => void;
  completedSteps: ResumeStep[];
}

const ResumeStepNavigator = ({ currentStep, onStepChange, completedSteps }: ResumeStepNavigatorProps) => {
  const getCurrentStepIndex = () => {
    return RESUME_STEPS.findIndex(step => step.key === currentStep);
  };

  const getLifecycleIcon = (step: ResumeStep) => {
    switch (step) {
      case 'basic':
        return Baby;
      case 'education':
        return GraduationCap;
      case 'career':
        return Briefcase;
      case 'certificates':
        return Award;
      case 'skills':
        return Code;
      case 'activities':
        return Users;
      default:
        return Baby;
    }
  };

  return (
    <div className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-10 pt-16">
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-muted">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ 
                width: `${(getCurrentStepIndex() / (RESUME_STEPS.length - 1)) * 100}%` 
              }}
            />
          </div>
          
          {/* Steps */}
          <div className="relative flex -space-x-4">
            {RESUME_STEPS.map((step, index) => {
              const isActive = step.key === currentStep;
              const isCompleted = completedSteps.includes(step.key);
              const isAccessible = index <= getCurrentStepIndex() || isCompleted;
              const isLastStep = index === RESUME_STEPS.length - 1;

              return (
                <div key={step.key} className="flex-1 min-w-0 relative">
                  {/* Lifecycle Icon */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-40">
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center border-2 bg-background shadow-sm",
                      isActive && "border-primary bg-primary text-primary-foreground",
                      isCompleted && !isActive && "border-green-500 bg-green-500 text-white",
                      !isActive && !isCompleted && "border-muted text-muted-foreground"
                    )}>
                      {(() => {
                        const IconComponent = getLifecycleIcon(step.key);
                        return <IconComponent size={20} />;
                      })()}
                    </div>
                  </div>

                  <button
                    onClick={() => isAccessible && onStepChange(step.key)}
                    disabled={!isAccessible}
                    className={cn(
                      "relative w-full h-16 flex items-center justify-center text-sm font-semibold transition-all duration-300 shadow-sm",
                      "border-2 bg-background",
                      // 첫번째와 마지막 처리
                      index === 0 && "pl-4 pr-2",
                      isLastStep && "pl-6 pr-4",
                      index !== 0 && !isLastStep && "pl-6 pr-2",
                      isActive && "border-primary bg-primary text-primary-foreground shadow-lg z-30",
                      isCompleted && !isActive && "border-green-500 bg-green-500 text-white z-20",
                      !isActive && !isCompleted && isAccessible && "border-muted-foreground/30 text-muted-foreground hover:border-primary hover:text-primary z-10",
                      !isAccessible && "border-muted-foreground/20 text-muted-foreground/40 cursor-not-allowed z-0"
                    )}
                    style={{
                      clipPath: index === 0 
                        ? 'polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%)'  // 첫번째: 왼쪽 사각형, 오른쪽 화살표
                        : isLastStep 
                          ? 'polygon(20px 0, 100% 0, 100% 100%, 20px 100%, 0 50%)'  // 마지막: 왼쪽 화살표, 오른쪽 사각형
                          : 'polygon(20px 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 20px 100%, 0 50%)'  // 중간: 양쪽 화살표
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold",
                        isActive && "bg-primary-foreground text-primary",
                        isCompleted && !isActive && "bg-white text-green-500",
                        !isActive && !isCompleted && "bg-muted text-muted-foreground"
                      )}>
                        {isCompleted && !isActive ? (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          index + 1
                        )}
                      </div>
                      <span className={cn(
                        "text-sm font-medium truncate",
                        isActive && "font-semibold"
                      )}>
                        {step.label}
                      </span>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeStepNavigator;