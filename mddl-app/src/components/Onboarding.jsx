import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, BookOpen, Search, BrainCircuit } from 'lucide-react';
import { logUserAction } from '../utils/logger';

const onboardingSteps = [
  {
    id: 1,
    title: 'Welcome to DreamLexi',
    description: 'Learn vocabulary like a researcher. Explore how words truly behave in the wild through authentic language data.',
    icon: <BookOpen className="w-16 h-16 text-primary" />,
  },
  {
    id: 2,
    title: 'The KWIC View',
    description: 'KWIC stands for "Key Word in Context". It aligns the target word in the center so you can easily spot patterns to its left and right.',
    icon: <Search className="w-16 h-16 text-primary" />,
  },
  {
    id: 3,
    title: 'Collocations & Practice',
    description: 'See which words often go together (collocations) and save them to your notebook. Then, practice with flashcards and quizzes!',
    icon: <BrainCircuit className="w-16 h-16 text-primary" />,
  }
];

export default function Onboarding({ onFinish }) {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      logUserAction('ONBOARDING_NEXT', { step: currentStep + 1 });
      setCurrentStep(prev => prev + 1);
    } else {
      logUserAction('ONBOARDING_FINISH');
      onFinish();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      logUserAction('ONBOARDING_PREV', { step: currentStep - 1 });
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="flex flex-col h-full bg-surface p-6">
      <div className="flex-1 flex flex-col items-center justify-center relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center space-y-6"
          >
            <div className="p-6 bg-primary-container/10 rounded-full text-primary-container">
              {onboardingSteps[currentStep].icon}
            </div>
            <h1 className="text-3xl font-bold text-primary tracking-tight">
              {onboardingSteps[currentStep].title}
            </h1>
            <p className="text-lg text-on-surface-variant leading-relaxed">
              {onboardingSteps[currentStep].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center space-x-2 mb-8">
        {onboardingSteps.map((_, idx) => (
          <div
            key={idx}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentStep ? 'w-6 bg-secondary-container' : 'w-2 bg-outline-variant'
            }`}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prevStep}
          className={`p-3 text-primary font-semibold flex items-center ${
            currentStep === 0 ? 'invisible' : 'visible'
          }`}
        >
          <ChevronLeft className="w-5 h-5 mr-1" /> Back
        </button>
        <button
          onClick={nextStep}
          className="px-6 py-3 bg-primary text-on-primary font-semibold rounded-lg shadow-diffused flex items-center hover:bg-primary-container transition-colors"
        >
          {currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Next'}
          {currentStep < onboardingSteps.length - 1 && <ChevronRight className="w-5 h-5 ml-1" />}
        </button>
      </div>
    </div>
  );
}
