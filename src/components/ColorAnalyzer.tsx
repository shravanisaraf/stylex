
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Palette, CheckCircle } from 'lucide-react';

const ColorAnalyzer = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const questions = [
    {
      id: 'skin',
      question: 'What best describes your skin tone?',
      options: [
        { value: 'warm', label: 'Warm (golden, yellow, or olive undertones)', color: '#F4A460' },
        { value: 'cool', label: 'Cool (pink, red, or blue undertones)', color: '#FFB6C1' },
        { value: 'neutral', label: 'Neutral (mix of warm and cool)', color: '#F5F5DC' }
      ]
    },
    {
      id: 'hair',
      question: 'What is your natural hair color?',
      options: [
        { value: 'blonde', label: 'Blonde/Light brown', color: '#F5DEB3' },
        { value: 'brown', label: 'Medium to dark brown', color: '#8B4513' },
        { value: 'black', label: 'Black', color: '#2F2F2F' },
        { value: 'red', label: 'Red/Auburn', color: '#CD853F' },
        { value: 'gray', label: 'Gray/Silver', color: '#C0C0C0' }
      ]
    },
    {
      id: 'eyes',
      question: 'What color are your eyes?',
      options: [
        { value: 'blue', label: 'Blue', color: '#4169E1' },
        { value: 'green', label: 'Green', color: '#228B22' },
        { value: 'brown', label: 'Brown', color: '#8B4513' },
        { value: 'hazel', label: 'Hazel', color: '#DAA520' },
        { value: 'gray', label: 'Gray', color: '#708090' }
      ]
    }
  ];

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = value;
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      generateColorAnalysis(newAnswers);
    }
  };

  const generateColorAnalysis = (userAnswers: string[]) => {
    const [skin, hair, eyes] = userAnswers;
    
    let season = '';
    let colors: string[] = [];
    let description = '';

    // Simplified color analysis logic
    if (skin === 'warm') {
      if (hair === 'blonde' || hair === 'red') {
        season = 'Spring';
        colors = ['Coral', 'Peach', 'Golden Yellow', 'Warm Pink', 'Turquoise', 'Orange Red'];
        description = 'You have a Spring color palette! You look amazing in bright, warm colors that complement your golden undertones.';
      } else {
        season = 'Autumn';
        colors = ['Rust', 'Olive Green', 'Deep Orange', 'Warm Brown', 'Burgundy', 'Golden Yellow'];
        description = 'You have an Autumn color palette! Rich, warm, earthy tones bring out your natural beauty.';
      }
    } else if (skin === 'cool') {
      if (hair === 'blonde' || hair === 'brown') {
        season = 'Summer';
        colors = ['Soft Pink', 'Lavender', 'Light Blue', 'Sage Green', 'Rose', 'Powder Blue'];
        description = 'You have a Summer color palette! Soft, muted colors with cool undertones are perfect for you.';
      } else {
        season = 'Winter';
        colors = ['True Red', 'Royal Blue', 'Emerald Green', 'Hot Pink', 'Black', 'Pure White'];
        description = 'You have a Winter color palette! Bold, dramatic colors with cool undertones make you shine.';
      }
    } else {
      season = 'Versatile';
      colors = ['Navy', 'Teal', 'Coral', 'Sage', 'Burgundy', 'Cream'];
      description = 'Lucky you! With neutral undertones, you can wear both warm and cool colors beautifully.';
    }

    setResult(`**Your Color Season: ${season}**\n\n${description}\n\n**Your Best Colors:**\n${colors.join(' • ')}\n\n**Styling Tips:**\n• Use these colors near your face for maximum impact\n• Mix and match within your palette\n• Use neutrals to balance brighter shades`);
  };

  const resetAnalysis = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResult(null);
  };

  if (result) {
    return (
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <span>Your Color Analysis Results</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {result}
          </div>
          <div className="text-center space-x-4">
            <Button onClick={resetAnalysis} variant="outline">
              Take Again
            </Button>
            <Button onClick={() => window.print()}>
              Save Results
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = questions[currentStep];

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center space-x-2">
          <Palette className="w-6 h-6 text-purple-500" />
          <span>Personal Color Analysis</span>
        </CardTitle>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
          <div 
            className="bg-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Question {currentStep + 1} of {questions.length}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <h3 className="text-lg font-medium text-center mb-6">
          {currentQuestion.question}
        </h3>
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full p-4 h-auto text-left justify-start space-x-3 hover:bg-purple-50"
              onClick={() => handleAnswer(option.value)}
            >
              <div 
                className="w-6 h-6 rounded-full border-2 border-gray-300"
                style={{ backgroundColor: option.color }}
              />
              <span>{option.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ColorAnalyzer;
