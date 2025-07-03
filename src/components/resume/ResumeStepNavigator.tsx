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
          <div className="relative flex justify-between">
            {RESUME_STEPS.map((step, index) => {
              const isActive = step.key === currentStep;
              const isCompleted = completedSteps.includes(step.key);
              const isAccessible = index <= getCurrentStepIndex() || isCompleted;

              return (
                <div key={step.key} className="flex flex-col items-center">
                  <button
                    onClick={() => isAccessible && onStepChange(step.key)}
                    disabled={!isAccessible}
                    className={cn(
                      "relative z-10 flex items-center justify-center w-12 h-12 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm",
                      "border-2 bg-background",
                      isActive && "border-primary bg-primary text-primary-foreground scale-110 shadow-lg",
                      isCompleted && !isActive && "border-green-500 bg-green-500 text-white",
                      !isActive && !isCompleted && isAccessible && "border-muted-foreground/30 text-muted-foreground hover:border-primary hover:text-primary hover:scale-105",
                      !isAccessible && "border-muted-foreground/20 text-muted-foreground/40 cursor-not-allowed"
                    )}
                  >
                    {isCompleted && !isActive ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </button>
                  
                  <div className="mt-3 text-center min-w-0">
                    <span className={cn(
                      "text-sm font-medium transition-colors",
                      isActive && "text-primary font-semibold",
                      isCompleted && !isActive && "text-green-600",
                      !isActive && !isCompleted && "text-muted-foreground"
                    )}>
                      {step.label}
                    </span>
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