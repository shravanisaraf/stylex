
import React from 'react';
import { Palette, BookOpen } from 'lucide-react';
import { Button } from './ui/button';

interface ColorAnalysisSectionProps {
  onOpenColorQuiz: () => void;
  onOpenTutorial: () => void;
}

const ColorAnalysisSection: React.FC<ColorAnalysisSectionProps> = ({
  onOpenColorQuiz,
  onOpenTutorial
}) => {
  return (
    <div className="text-center mb-16">
      <h3 className="text-2xl font-light text-black mb-4 tracking-wide">Discover Your Perfect Colors</h3>
      <p className="text-gray-600 font-light text-lg mb-8">Take our color analysis quiz to find the colors that make you shine</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button 
          onClick={onOpenColorQuiz}
          className="bg-black hover:bg-gray-800 text-white px-8 py-3 text-lg font-light tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl border-0"
        >
          <Palette className="w-5 h-5 mr-2" />
          Take Color Analysis Quiz
        </Button>
        <Button 
          onClick={onOpenTutorial}
          variant="outline"
          className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 text-sm font-light tracking-wide"
        >
          <BookOpen className="w-4 h-4 mr-2" />
          View Tutorial Again
        </Button>
      </div>
    </div>
  );
};

export default ColorAnalysisSection;
