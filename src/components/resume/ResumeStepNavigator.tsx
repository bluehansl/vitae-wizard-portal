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
            {/* 갓난아이 실루엣 */}
            <path d="M12 2C10.5 2 9 3 9 4.5C9 5.5 9.5 6.5 10.5 7C10.2 7.5 10 8.2 10 9C10 11 11.5 12.5 12 12.5S14 11 14 9C14 8.2 13.8 7.5 13.5 7C14.5 6.5 15 5.5 15 4.5C15 3 13.5 2 12 2M12 13.5C10 13.5 8.5 15 8.5 17V22H15.5V17C15.5 15 14 13.5 12 13.5Z"/>
          </svg>
        );
      case 'education':
        return (
          <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
            {/* 기는 아기 실루엣 */}
            <path d="M12 4C10.5 4 9.5 5 9.5 6.5S10.5 9 12 9S14.5 7.5 14.5 6.5S13.5 4 12 4M7 10C6 10 5 11 5 12V14C5 15 6 16 7 16H8V18C8 19 9 20 10 20H14C15 20 16 19 16 18V16H17C18 16 19 15 19 14V12C19 11 18 10 17 10H7Z"/>
          </svg>
        );
      case 'career':
        return (
          <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
            {/* 성인 실루엣 */}
            <path d="M12 2C10.5 2 9.5 3 9.5 4.5S10.5 7 12 7S14.5 5.5 14.5 4.5S13.5 2 12 2M10.5 8C9.5 8 8.5 9 8.5 10V12H7V22H17V12H15.5V10C15.5 9 14.5 8 13.5 8H10.5Z"/>
          </svg>
        );
      case 'certificates':
        return (
          <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
            {/* 중년 실루엣 */}
            <path d="M12 2C10 2 8.5 3.5 8.5 5.5S10 9 12 9S15.5 7.5 15.5 5.5S14 2 12 2M9 10C7.5 10 6.5 11 6.5 12.5V14H6V22H18V14H17.5V12.5C17.5 11 16.5 10 15 10H9Z"/>
          </svg>
        );
      case 'skills':
        return (
          <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
            {/* 장년 실루엣 */}
            <path d="M12 2C10 2 8 4 8 6S10 10 12 10S16 8 16 6S14 2 12 2M8 11C6.5 11 5.5 12 5.5 13.5V15H5V22H19V15H18.5V13.5C18.5 12 17.5 11 16 11H8Z"/>
          </svg>
        );
      case 'activities':
        return (
          <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
            {/* 할아버지와 지팡이 실루엣 */}
            <path d="M12 2C10 2 8.5 3.5 8.5 5.5S10 9 12 9S15.5 7.5 15.5 5.5S14 2 12 2M9.5 10C8 10 7 11 7 12.5V14H6.5V20H8V22H10V20H14V22H16V20H17.5V14H17V12.5C17 11 16 10 14.5 10H9.5M18 16V22H20V16C20 15.5 19.5 15 19 15S18 15.5 18 16Z"/>
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
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-40">
                    <div className={cn(
                      "p-2 rounded-full transition-all duration-300 drop-shadow-lg",
                      "w-16 h-16 flex items-center justify-center",
                      isActive && "text-primary bg-primary/10 scale-110",
                      isCompleted && !isActive && "text-green-500 bg-green-50",
                      !isActive && !isCompleted && isAccessible && "text-muted-foreground hover:text-primary hover:scale-105",
                      !isAccessible && "text-muted-foreground/40"
                    )}>
                      <div className="w-12 h-12">
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