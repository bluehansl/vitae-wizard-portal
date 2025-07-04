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

  return (
    <div className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-6">
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
          <div className="relative flex">
            {RESUME_STEPS.map((step, index) => {
              const isActive = step.key === currentStep;
              const isCompleted = completedSteps.includes(step.key);
              const isAccessible = index <= getCurrentStepIndex() || isCompleted;
              const isLastStep = index === RESUME_STEPS.length - 1;

              return (
                <div key={step.key} className={cn("flex-1", !isLastStep && "relative")}>
                  <button
                    onClick={() => isAccessible && onStepChange(step.key)}
                    disabled={!isAccessible}
                    className={cn(
                      "relative w-full h-16 flex items-center justify-center text-sm font-semibold transition-all duration-300 shadow-sm",
                      "border-2 bg-background",
                      // Arrow shape using clip-path
                      !isLastStep && "clip-path-[polygon(0_0,calc(100%-20px)_0,100%_50%,calc(100%-20px)_100%,0_100%)]",
                      isLastStep && "rounded-r-lg",
                      index === 0 && "rounded-l-lg",
                      isActive && "border-primary bg-primary text-primary-foreground shadow-lg z-20",
                      isCompleted && !isActive && "border-green-500 bg-green-500 text-white z-10",
                      !isActive && !isCompleted && isAccessible && "border-muted-foreground/30 text-muted-foreground hover:border-primary hover:text-primary z-10",
                      !isAccessible && "border-muted-foreground/20 text-muted-foreground/40 cursor-not-allowed z-0"
                    )}
                    style={{
                      clipPath: !isLastStep ? 'polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%)' : undefined
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
                        "text-sm font-medium",
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