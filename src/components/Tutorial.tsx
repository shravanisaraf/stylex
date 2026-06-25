
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { ArrowLeft, ArrowRight, X, Palette, Filter, Shuffle, Save } from 'lucide-react';

interface TutorialProps {
  isOpen: boolean;
  onClose: () => void;
}

const tutorialSteps = [
  {
    title: "Welcome to Chér",
    content: "Your one-stop digital wardrobe app for curating pieces you want to buy and discovering the perfect outfits to pair them with.",
    icon: null
  },
  {
    title: "Take the Color Quiz",
    content: "Start by taking our color analysis quiz to discover the colors that make you shine and look your best.",
    icon: <Palette className="w-8 h-8 text-black" />
  },
  {
    title: "Filter Your Style",
    content: "Use the filter panel to select clothing categories and apply your perfect colors to curate your wardrobe.",
    icon: <Filter className="w-8 h-8 text-black" />
  },
  {
    title: "Browse & Mix",
    content: "Navigate through your clothing items using the arrow buttons, or hit the random mix button for surprise combinations.",
    icon: <Shuffle className="w-8 h-8 text-black" />
  },
  {
    title: "Save Your Looks",
    content: "Found a perfect outfit? Save it with a custom name and access all your saved looks from the menu.",
    icon: <Save className="w-8 h-8 text-black" />
  },
  {
    title: "Ready to Style!",
    content: "You're all set! Start exploring and discover endless styling possibilities with pieces you already have.",
    icon: null
  }
];

const Tutorial: React.FC<TutorialProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setCurrentStep(0);
    onClose();
  };

  const currentStepData = tutorialSteps[currentStep];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md mx-auto bg-white rounded-2xl border-0 shadow-2xl">
        <DialogHeader className="text-center pb-6">
          <DialogTitle className="text-2xl font-light tracking-wide text-black">
            {currentStepData.title}
          </DialogTitle>
        </DialogHeader>

        <div className="text-center space-y-6">
          {/* Icon */}
          {currentStepData.icon && (
            <div className="flex justify-center">
              <div className="p-4 bg-gray-50 rounded-full">
                {currentStepData.icon}
              </div>
            </div>
          )}

          {/* Content */}
          <p className="text-gray-600 font-light leading-relaxed px-4">
            {currentStepData.content}
          </p>

          {/* Step Indicators */}
          <div className="flex justify-center space-x-2 py-4">
            {tutorialSteps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentStep ? 'bg-black' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-4">
            <Button
              variant="ghost"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center space-x-2 text-gray-500 hover:text-black disabled:opacity-30"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>

            <span className="text-sm text-gray-400 font-light">
              {currentStep + 1} of {tutorialSteps.length}
            </span>

            {currentStep < tutorialSteps.length - 1 ? (
              <Button
                onClick={nextStep}
                className="flex items-center space-x-2 bg-black hover:bg-gray-800 text-white px-6"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleClose}
                className="bg-black hover:bg-gray-800 text-white px-6"
              >
                Get Started
              </Button>
            )}
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default Tutorial;
