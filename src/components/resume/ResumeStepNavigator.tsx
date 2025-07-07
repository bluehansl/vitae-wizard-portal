import { RESUME_STEPS, ResumeStep } from '@/types/resume';
import { cn } from '@/lib/utils';

interface ResumeStepNavigatorProps {
  currentStep: ResumeStep;
  onStepChange: (step: ResumeStep) => void;
  completedSteps: ResumeStep[];
}

const ResumeStepNavigator = ({ currentStep, onStepChange, completedSteps }: ResumeStepNavigatorProps) => {
  const getCurrentStepIndex = () => {
    return RESUME_STEPS.findIndex(step => step.key === currentStep);
  };

  // 생애주기 아이콘들
  const getLifecycleIcon = (stepKey: ResumeStep) => {
    switch (stepKey) {
      case 'basic':
        return (
          <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
            {/* 갓난아기 - 작고 둥근 형태 */}
            <circle cx="12" cy="6" r="3" />
            <ellipse cx="12" cy="14" rx="4" ry="6" />
            <circle cx="10" cy="12" r="1" />
            <circle cx="14" cy="12" r="1" />
            <circle cx="9" cy="16" r="1" />
            <circle cx="15" cy="16" r="1" />
          </svg>
        );
      case 'education':
        return (
          <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
            {/* 어린이 - 작지만 팔다리가 있는 형태 */}
            <circle cx="12" cy="5" r="2.5" />
            <rect x="10.5" y="8" width="3" height="6" rx="1.5" />
            <rect x="8" y="9" width="2" height="4" rx="1" />
            <rect x="14" y="9" width="2" height="4" rx="1" />
            <rect x="10" y="15" width="1.5" height="5" rx="0.75" />
            <rect x="12.5" y="15" width="1.5" height="5" rx="0.75" />
          </svg>
        );
      case 'career':
        return (
          <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
            {/* 성인 - 일반적인 성인 형태 */}
            <circle cx="12" cy="4.5" r="2.5" />
            <rect x="10" y="8" width="4" height="7" rx="2" />
            <rect x="7" y="9" width="2.5" height="5" rx="1.25" />
            <rect x="14.5" y="9" width="2.5" height="5" rx="1.25" />
            <rect x="10" y="16" width="1.5" height="6" rx="0.75" />
            <rect x="12.5" y="16" width="1.5" height="6" rx="0.75" />
          </svg>
        );
      case 'certificates':
        return (
          <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
            {/* 중년 - 약간 더 넓은 어깨 */}
            <circle cx="12" cy="4.5" r="2.5" />
            <rect x="9.5" y="8" width="5" height="7" rx="2.5" />
            <rect x="6.5" y="9" width="3" height="5" rx="1.5" />
            <rect x="14.5" y="9" width="3" height="5" rx="1.5" />
            <rect x="10" y="16" width="1.5" height="6" rx="0.75" />
            <rect x="12.5" y="16" width="1.5" height="6" rx="0.75" />
          </svg>
        );
      case 'skills':
        return (
          <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
            {/* 장년 - 더 성숙한 형태, 약간 구부정한 */}
            <circle cx="12" cy="5" r="2.5" />
            <path d="M9 8 Q12 9 15 8 L15 15 Q12 16 9 15 Z" />
            <rect x="6" y="10" width="3" height="4" rx="1.5" />
            <rect x="15" y="10" width="3" height="4" rx="1.5" />
            <rect x="10" y="16" width="1.5" height="6" rx="0.75" />
            <rect x="12.5" y="16" width="1.5" height="6" rx="0.75" />
          </svg>
        );
      case 'activities':
        return (
          <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
            {/* 할아버지 - 지팡이를 든 노인 */}
            <circle cx="11" cy="5" r="2.5" />
            <path d="M8 8 Q11 9 14 8 L13 15 Q11 16 8 15 Z" />
            <rect x="5" y="10" width="2.5" height="4" rx="1.25" />
            <rect x="13" y="10" width="2.5" height="4" rx="1.25" />
            <rect x="9" y="16" width="1.5" height="6" rx="0.75" />
            <rect x="11.5" y="16" width="1.5" height="6" rx="0.75" />
            {/* 지팡이 */}
            <rect x="16" y="8" width="1" height="14" rx="0.5" />
            <circle cx="16.5" cy="7" r="1" />
          </svg>
        );
      default:
        return null;
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
                  <button
                    onClick={() => isAccessible && onStepChange(step.key)}
                    disabled={!isAccessible}
                    className={cn(
                      "relative w-full h-16 flex items-center justify-center text-sm font-semibold transition-all duration-300 shadow-sm",
                      "border-2 bg-background",
                      // Arrow shape using clip-path - 뾰족한 부분이 20px 돌출
                      !isLastStep && "pl-6 pr-2",
                      isLastStep && "rounded-r-lg pl-6",
                      index === 0 && "rounded-l-lg pl-4",
                      isActive && "border-primary bg-primary text-primary-foreground shadow-lg z-30",
                      isCompleted && !isActive && "border-green-500 bg-green-500 text-white z-20",
                      !isActive && !isCompleted && isAccessible && "border-muted-foreground/30 text-muted-foreground hover:border-primary hover:text-primary z-10",
                      !isAccessible && "border-muted-foreground/20 text-muted-foreground/40 cursor-not-allowed z-0"
                    )}
                    style={{
                      clipPath: !isLastStep 
                        ? 'polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%, 20px 50%)' 
                        : index === 0 
                          ? undefined 
                          : 'polygon(20px 0, 100% 0, 100% 100%, 20px 100%, 0 50%)'
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
                  
                  {/* 생애주기 아이콘 - 도형 위에 서 있는 느낌 */}
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-40">
                    <div className={cn(
                      "p-3 rounded-full transition-all duration-300 drop-shadow-lg bg-white border-2",
                      "w-20 h-20 flex items-center justify-center",
                      isActive && "text-primary border-primary scale-110 shadow-lg",
                      isCompleted && !isActive && "text-green-600 border-green-500 bg-green-50",
                      !isActive && !isCompleted && isAccessible && "text-slate-600 border-slate-300 hover:text-primary hover:border-primary hover:scale-105",
                      !isAccessible && "text-slate-400 border-slate-200"
                    )}>
                      <div className="w-14 h-14">
                        {getLifecycleIcon(step.key)}
                      </div>
                    </div>
                  </div>
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