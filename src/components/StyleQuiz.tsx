
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, CheckCircle } from 'lucide-react';

const StyleQuiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<any>(null);

  const questions = [
    {
      question: 'How would you describe your ideal weekend outfit?',
      options: [
        { value: 'classic', label: 'Crisp white shirt and well-fitted jeans' },
        { value: 'bohemian', label: 'Flowy maxi dress with layered jewelry' },
        { value: 'minimalist', label: 'Simple tee and tailored trousers' },
        { value: 'romantic', label: 'Soft blouse with a floral skirt' },
        { value: 'edgy', label: 'Leather jacket and distressed denim' }
      ]
    },
    {
      question: 'What draws you to a piece of clothing first?',
      options: [
        { value: 'classic', label: 'Timeless design and quality fabric' },
        { value: 'bohemian', label: 'Unique patterns and flowing silhouettes' },
        { value: 'minimalist', label: 'Clean lines and perfect fit' },
        { value: 'romantic', label: 'Soft textures and feminine details' },
        { value: 'edgy', label: 'Bold design and unexpected elements' }
      ]
    },
    {
      question: 'Your ideal color palette consists of:',
      options: [
        { value: 'classic', label: 'Navy, white, beige, and camel' },
        { value: 'bohemian', label: 'Earth tones, jewel tones, and warm hues' },
        { value: 'minimalist', label: 'Black, white, gray, and one accent color' },
        { value: 'romantic', label: 'Pastels, soft pinks, and creamy whites' },
        { value: 'edgy', label: 'Black, deep colors, and metallic accents' }
      ]
    },
    {
      question: 'How do you prefer to accessorize?',
      options: [
        { value: 'classic', label: 'Simple, quality pieces like pearl earrings' },
        { value: 'bohemian', label: 'Layered jewelry and natural materials' },
        { value: 'minimalist', label: 'One statement piece or nothing at all' },
        { value: 'romantic', label: 'Delicate jewelry and soft scarves' },
        { value: 'edgy', label: 'Bold accessories and mixed metals' }
      ]
    },
    {
      question: 'Your shopping strategy is usually:',
      options: [
        { value: 'classic', label: 'Invest in timeless pieces that last' },
        { value: 'bohemian', label: 'Find unique pieces from various sources' },
        { value: 'minimalist', label: 'Buy less, choose carefully, love everything' },
        { value: 'romantic', label: 'Follow my heart and choose what feels pretty' },
        { value: 'edgy', label: 'Mix high and low, take fashion risks' }
      ]
    }
  ];

  const styleProfiles = {
    classic: {
      name: 'Classic Elegance',
      description: 'You appreciate timeless style and quality pieces. Your wardrobe is built on well-fitted basics that never go out of style.',
      colors: ['Navy', 'White', 'Camel', 'Black', 'Cream'],
      keyPieces: ['Tailored blazer', 'White button-down', 'Little black dress', 'Quality handbag', 'Pearl jewelry'],
      celebrities: ['Kate Middleton', 'Meghan Markle', 'Gwyneth Paltrow'],
      tips: '• Invest in quality basics\n• Stick to classic silhouettes\n• Add interest with textures\n• Focus on fit and tailoring'
    },
    bohemian: {
      name: 'Bohemian Spirit',
      description: 'You love flowing fabrics, unique patterns, and layered accessories. Your style is free-spirited and artistic.',
      colors: ['Terracotta', 'Sage Green', 'Burnt Orange', 'Deep Purple', 'Cream'],
      keyPieces: ['Maxi dresses', 'Kimono jackets', 'Wide-leg pants', 'Layered necklaces', 'Ankle boots'],
      celebrities: ['Vanessa Hudgens', 'Sienna Miller', 'Florence Welch'],
      tips: '• Layer different textures\n• Mix patterns confidently\n• Add vintage accessories\n• Embrace flowing silhouettes'
    },
    minimalist: {
      name: 'Minimalist Chic',
      description: 'You believe in "less is more" and prefer clean, simple lines. Your style is effortless and sophisticated.',
      colors: ['Black', 'White', 'Gray', 'Beige', 'One accent color'],
      keyPieces: ['Perfect white tee', 'Tailored trousers', 'Sleek sneakers', 'Structured bag', 'Simple jewelry'],
      celebrities: ['Phoebe Philo', 'Tilda Swinton', 'Jenna Lyons'],
      tips: '• Focus on fit and quality\n• Stick to a limited color palette\n• Choose versatile pieces\n• Let one element be the focus'
    },
    romantic: {
      name: 'Romantic Feminine',
      description: 'You love soft fabrics, delicate details, and feminine silhouettes. Your style is sweet and dreamy.',
      colors: ['Blush Pink', 'Lavender', 'Cream', 'Soft Blue', 'Rose Gold'],
      keyPieces: ['Floral dresses', 'Silk blouses', 'A-line skirts', 'Delicate jewelry', 'Ballet flats'],
      celebrities: ['Taylor Swift', 'Emma Stone', 'Reese Witherspoon'],
      tips: '• Embrace soft textures\n• Add feminine details\n• Play with pastels\n• Layer delicate accessories'
    },
    edgy: {
      name: 'Edgy Modern',
      description: 'You love making a statement and taking fashion risks. Your style is bold, confident, and unconventional.',
      colors: ['Black', 'Deep Red', 'Metallic', 'Bold Prints', 'Neon Accents'],
      keyPieces: ['Leather jacket', 'Combat boots', 'Statement jewelry', 'Graphic tees', 'Bold accessories'],
      celebrities: ['Rihanna', 'Kristen Stewart', 'Zendaya'],
      tips: '• Mix unexpected elements\n• Play with proportions\n• Add bold accessories\n• Experiment with textures'
    }
  };

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = value;
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (userAnswers: string[]) => {
    const scores: { [key: string]: number } = {
      classic: 0,
      bohemian: 0,
      minimalist: 0,
      romantic: 0,
      edgy: 0
    };

    userAnswers.forEach(answer => {
      scores[answer]++;
    });

    const topStyle = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    setResult(styleProfiles[topStyle as keyof typeof styleProfiles]);
  };

  const resetQuiz = () => {
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
            <span>Your Style Personality</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-purple-600 mb-2">{result.name}</h2>
            <p className="text-gray-600 leading-relaxed">{result.description}</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Your Perfect Colors:</h3>
              <div className="flex flex-wrap gap-2">
                {result.colors.map((color: string, index: number) => (
                  <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                    {color}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Key Wardrobe Pieces:</h3>
              <ul className="text-sm space-y-1">
                {result.keyPieces.map((piece: string, index: number) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                    <span>{piece}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Style Icons:</h3>
            <p className="text-sm text-gray-600">{result.celebrities.join(' • ')}</p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Styling Tips:</h3>
            <div className="bg-purple-50 p-4 rounded-lg">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">{result.tips}</pre>
            </div>
          </div>
          
          <div className="text-center space-x-4">
            <Button onClick={resetQuiz} variant="outline">
              Retake Quiz
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
          <Sparkles className="w-6 h-6 text-purple-500" />
          <span>Discover Your Style Personality</span>
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
              className="w-full p-4 h-auto text-left justify-start hover:bg-purple-50"
              onClick={() => handleAnswer(option.value)}
            >
              <span className="text-sm">{option.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StyleQuiz;
