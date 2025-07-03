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
    <div className="bg-muted/50 py-4 mb-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center space-x-4">
          {RESUME_STEPS.map((step, index) => {
            const isActive = step.key === currentStep;
            const isCompleted = completedSteps.includes(step.key);
            const isAccessible = index <= getCurrentStepIndex() || isCompleted;

            return (
              <div key={step.key} className="flex items-center">
                <button
                  onClick={() => isAccessible && onStepChange(step.key)}
                  disabled={!isAccessible}
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors",
                    isActive && "bg-primary text-primary-foreground",
                    isCompleted && !isActive && "bg-green-500 text-white",
                    !isActive && !isCompleted && isAccessible && "bg-muted text-muted-foreground hover:bg-primary/10",
                    !isAccessible && "bg-muted/50 text-muted-foreground/50 cursor-not-allowed"
                  )}
                >
                  {index + 1}
                </button>
                <span className={cn(
                  "ml-2 text-sm font-medium",
                  isActive && "text-primary",
                  isCompleted && !isActive && "text-green-600",
                  !isActive && !isCompleted && "text-muted-foreground"
                )}>
                  {step.label}
                </span>
                {index < RESUME_STEPS.length - 1 && (
                  <div className="w-8 h-0.5 bg-muted mx-4" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ResumeStepNavigator;