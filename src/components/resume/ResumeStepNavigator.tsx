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
            {/* 갓난아기 - 기는 자세 */}
            <ellipse cx="12" cy="7" rx="2.5" ry="2"/>
            <path d="M9 9C9 9 10 9.5 12 9.5C14 9.5 15 9 15 9C15.5 9.5 16 11 16 13C16 14 15.5 15 15 15.5L13 16L13 18C13 18.5 12.5 19 12 19L12 19C11.5 19 11 18.5 11 18L11 16L9 15.5C8.5 15 8 14 8 13C8 11 8.5 9.5 9 9Z"/>
            <ellipse cx="8.5" cy="12" rx="1.5" ry="1"/>
            <ellipse cx="15.5" cy="12" rx="1.5" ry="1"/>
            <ellipse cx="10" cy="17" rx="1" ry="1.5"/>
            <ellipse cx="14" cy="17" rx="1" ry="1.5"/>
          </svg>
        );
      case 'education':
        return (
          <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
            {/* 어린이 - 서있는 자세 */}
            <ellipse cx="12" cy="5" rx="2" ry="2.5"/>
            <path d="M10 8C10 8 11 7.5 12 7.5C13 7.5 14 8 14 8C14.5 8.5 15 10 15 12L15 16C15 16.5 14.5 17 14 17L13 17L13 21C13 21.5 12.5 22 12 22C11.5 22 11 21.5 11 21L11 17L10 17C9.5 17 9 16.5 9 16L9 12C9 10 9.5 8.5 10 8Z"/>
            <ellipse cx="8" cy="11" rx="1" ry="2"/>
            <ellipse cx="16" cy="11" rx="1" ry="2"/>
          </svg>
        );
      case 'career':
        return (
          <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
            {/* 성인 - 당당한 자세 */}
            <ellipse cx="12" cy="4.5" rx="2.2" ry="2.5"/>
            <path d="M9.5 7.5C9.5 7.5 10.5 7 12 7C13.5 7 14.5 7.5 14.5 7.5C15 8 15.5 9.5 15.5 12L15.5 16.5C15.5 17 15 17.5 14.5 17.5L13.5 17.5L13.5 21.5C13.5 22 13 22.5 12.5 22.5L11.5 22.5C11 22.5 10.5 22 10.5 21.5L10.5 17.5L9.5 17.5C9 17.5 8.5 17 8.5 16.5L8.5 12C8.5 9.5 9 8 9.5 7.5Z"/>
            <ellipse cx="7.5" cy="11.5" rx="1.2" ry="2.5"/>
            <ellipse cx="16.5" cy="11.5" rx="1.2" ry="2.5"/>
          </svg>
        );
      case 'certificates':
        return (
          <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
            {/* 중년 - 안정적인 자세 */}
            <ellipse cx="12" cy="4.5" rx="2.3" ry="2.5"/>
            <path d="M9 7.5C9 7.5 10.5 7 12 7C13.5 7 15 7.5 15 7.5C15.5 8 16 9.5 16 12L16 16.5C16 17 15.5 17.5 15 17.5L13.5 17.5L13.5 21.5C13.5 22 13 22.5 12.5 22.5L11.5 22.5C11 22.5 10.5 22 10.5 21.5L10.5 17.5L9 17.5C8.5 17.5 8 17 8 16.5L8 12C8 9.5 8.5 8 9 7.5Z"/>
            <ellipse cx="7" cy="11.5" rx="1.3" ry="2.8"/>
            <ellipse cx="17" cy="11.5" rx="1.3" ry="2.8"/>
          </svg>
        );
      case 'skills':
        return (
          <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
            {/* 장년 - 약간 구부정한 자세 */}
            <ellipse cx="12" cy="5" rx="2.2" ry="2.5"/>
            <path d="M9.5 8C9.5 8 10.5 7.5 12 7.5C13.5 7.5 14.5 8 14.5 8C15 8.5 15.3 10 15.3 12.5L15 17C15 17.5 14.5 18 14 18L13.2 18L13.2 22C13.2 22.5 12.7 23 12.2 23L11.8 23C11.3 23 10.8 22.5 10.8 22L10.8 18L10 18C9.5 18 9 17.5 9 17L8.7 12.5C8.7 10 9 8.5 9.5 8Z"/>
            <ellipse cx="7.2" cy="12.5" rx="1.2" ry="2.5"/>
            <ellipse cx="16.8" cy="12.5" rx="1.2" ry="2.5"/>
          </svg>
        );
      case 'activities':
        return (
          <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
            {/* 할아버지 - 허리 굽힌 자세로 지팡이에 의지 */}
            <ellipse cx="10" cy="6" rx="2" ry="2.5"/>
            {/* 굽은 몸통 */}
            <path d="M8.5 9C8.5 9 9 8.5 10 8.5C11 8.5 11.5 9 11.5 9C12 9.5 12.5 11 13 13.5C13.2 15 13.5 16.5 14 18L13.5 18.5L12.5 18.8L12.2 22.5C12.2 23 11.7 23.5 11.2 23.5L10.8 23.5C10.3 23.5 9.8 23 9.8 22.5L9.5 18.8L8.5 18.5C8 18.2 7.5 17.5 7.5 17L7 13.5C7 11 7.5 9.5 8.5 9Z"/>
            {/* 왼팔 - 앞으로 뻗은 */}
            <ellipse cx="6" cy="14" rx="1" ry="2" transform="rotate(-30 6 14)"/>
            {/* 오른팔과 지팡이 - 지팡이를 잡고 있는 */}
            <ellipse cx="15" cy="13" rx="0.8" ry="1.8" transform="rotate(20 15 13)"/>
            <rect x="16" y="9" width="1.2" height="14" rx="0.6" transform="rotate(10 16.6 16)"/>
            <ellipse cx="16.2" cy="8.5" rx="1" ry="0.8"/>
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