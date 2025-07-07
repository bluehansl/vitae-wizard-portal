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
            {/* 갓난아기 - 연결된 형태 */}
            <path d="M12 4C10.5 4 9.5 5 9.5 6.5C9.5 8 10.5 9 12 9C13.5 9 14.5 8 14.5 6.5C14.5 5 13.5 4 12 4Z M10 10C10 10 10.5 10 12 10C13.5 10 14 10 14 10C15 10.5 15.5 11.5 15.5 13L15.5 18C15.5 19 14.5 20 13.5 20L10.5 20C9.5 20 8.5 19 8.5 18L8.5 13C8.5 11.5 9 10.5 10 10Z"/>
          </svg>
        );
      case 'education':
        return (
          <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
            {/* 어린이 - 연결된 형태 */}
            <path d="M12 3C10.5 3 9.5 4 9.5 5.5C9.5 7 10.5 8 12 8C13.5 8 14.5 7 14.5 5.5C14.5 4 13.5 3 12 3Z M10.5 9C10.5 9 11 9 12 9C13 9 13.5 9 13.5 9C14.5 9.5 15 10.5 15 12L15 16C15 17 14.5 17.5 14 17.5L13.5 17.5L13.5 21C13.5 21.5 13 22 12.5 22L11.5 22C11 22 10.5 21.5 10.5 21L10.5 17.5L10 17.5C9.5 17.5 9 17 9 16L9 12C9 10.5 9.5 9.5 10.5 9Z"/>
            {/* 팔 */}
            <ellipse cx="8" cy="11.5" rx="1" ry="2.5"/>
            <ellipse cx="16" cy="11.5" rx="1" ry="2.5"/>
          </svg>
        );
      case 'career':
        return (
          <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
            {/* 성인 - 연결된 형태 */}
            <path d="M12 2.5C10.5 2.5 9.5 3.5 9.5 5C9.5 6.5 10.5 7.5 12 7.5C13.5 7.5 14.5 6.5 14.5 5C14.5 3.5 13.5 2.5 12 2.5Z M10 8.5C10 8.5 10.5 8.5 12 8.5C13.5 8.5 14 8.5 14 8.5C15 9 15.5 10 15.5 11.5L15.5 16.5C15.5 17 15 17.5 14.5 17.5L13.5 17.5L13.5 21.5C13.5 22 13 22.5 12.5 22.5L11.5 22.5C11 22.5 10.5 22 10.5 21.5L10.5 17.5L9.5 17.5C9 17.5 8.5 17 8.5 16.5L8.5 11.5C8.5 10 9 9 10 8.5Z"/>
            {/* 팔 */}
            <ellipse cx="7.5" cy="12" rx="1.5" ry="3"/>
            <ellipse cx="16.5" cy="12" rx="1.5" ry="3"/>
          </svg>
        );
      case 'certificates':
        return (
          <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
            {/* 중년 - 연결된 형태, 약간 더 넓은 어깨 */}
            <path d="M12 2.5C10.5 2.5 9.5 3.5 9.5 5C9.5 6.5 10.5 7.5 12 7.5C13.5 7.5 14.5 6.5 14.5 5C14.5 3.5 13.5 2.5 12 2.5Z M9.5 8.5C9.5 8.5 10.5 8.5 12 8.5C13.5 8.5 14.5 8.5 14.5 8.5C15.5 9 16 10 16 11.5L16 16.5C16 17 15.5 17.5 15 17.5L13.5 17.5L13.5 21.5C13.5 22 13 22.5 12.5 22.5L11.5 22.5C11 22.5 10.5 22 10.5 21.5L10.5 17.5L9 17.5C8.5 17.5 8 17 8 16.5L8 11.5C8 10 8.5 9 9.5 8.5Z"/>
            {/* 팔 - 더 넓게 */}
            <ellipse cx="7" cy="12" rx="1.5" ry="3.5"/>
            <ellipse cx="17" cy="12" rx="1.5" ry="3.5"/>
          </svg>
        );
      case 'skills':
        return (
          <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
            {/* 장년 - 연결된 형태, 약간 구부정한 */}
            <path d="M12 3C10.5 3 9.5 4 9.5 5.5C9.5 7 10.5 8 12 8C13.5 8 14.5 7 14.5 5.5C14.5 4 13.5 3 12 3Z M9.5 9C9.5 9 10.5 9 12 9C13.5 9 14.5 9 14.5 9C15.5 9.5 16 10.5 16 12L15.8 16.5C15.8 17 15.3 17.5 14.8 17.5L13.3 17.5L13.3 21.5C13.3 22 12.8 22.5 12.3 22.5L11.7 22.5C11.2 22.5 10.7 22 10.7 21.5L10.7 17.5L9.2 17.5C8.7 17.5 8.2 17 8.2 16.5L8 12C8 10.5 8.5 9.5 9.5 9Z"/>
            {/* 팔 - 살짝 아래로 */}
            <ellipse cx="7" cy="13" rx="1.5" ry="3"/>
            <ellipse cx="17" cy="13" rx="1.5" ry="3"/>
          </svg>
        );
      case 'activities':
        return (
          <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
            {/* 할아버지 - 연결된 형태, 약간 구부정하고 지팡이 */}
            <path d="M11 3.5C9.5 3.5 8.5 4.5 8.5 6C8.5 7.5 9.5 8.5 11 8.5C12.5 8.5 13.5 7.5 13.5 6C13.5 4.5 12.5 3.5 11 3.5Z M9 9.5C9 9.5 9.5 9.5 11 9.5C12.5 9.5 13 9.5 13 9.5C14 10 14.5 11 14.5 12.5L14.2 17C14.2 17.5 13.7 18 13.2 18L12.2 18L12.2 22C12.2 22.5 11.7 23 11.2 23L10.8 23C10.3 23 9.8 22.5 9.8 22L9.8 18L8.8 18C8.3 18 7.8 17.5 7.8 17L7.5 12.5C7.5 11 8 10 9 9.5Z"/>
            {/* 왼팔 */}
            <ellipse cx="6.5" cy="13.5" rx="1.5" ry="2.5"/>
            {/* 오른팔과 지팡이 */}
            <ellipse cx="15.5" cy="12.5" rx="1" ry="2"/>
            <rect x="17" y="10" width="1.5" height="12" rx="0.75" fill="currentColor"/>
            <ellipse cx="17.8" cy="9" rx="1" ry="1.5"/>
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