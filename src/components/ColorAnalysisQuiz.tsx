
import React, { useState } from 'react';
import { X, Palette, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

interface Question {
  id: number;
  question: string;
  options: {
    value: string;
    label: string;
    points: { [key: string]: number };
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is your natural hair color?",
    options: [
      { value: "black", label: "Black", points: { winter: 3, autumn: 1 } },
      { value: "dark-brown", label: "Dark Brown", points: { winter: 2, autumn: 2 } },
      { value: "medium-brown", label: "Medium Brown", points: { autumn: 3, spring: 1 } },
      { value: "light-brown", label: "Light Brown", points: { autumn: 2, spring: 2 } },
      { value: "blonde", label: "Blonde", points: { spring: 3, summer: 2 } },
      { value: "red", label: "Red/Auburn", points: { autumn: 3, spring: 1 } },
      { value: "gray", label: "Gray/White", points: { summer: 2, winter: 2 } }
    ]
  },
  {
    id: 2,
    question: "What is your natural eye color?",
    options: [
      { value: "dark-brown", label: "Dark Brown", points: { winter: 2, autumn: 2 } },
      { value: "light-brown", label: "Light Brown/Hazel", points: { autumn: 3, spring: 1 } },
      { value: "blue", label: "Blue", points: { summer: 2, winter: 2 } },
      { value: "green", label: "Green", points: { spring: 2, summer: 2 } },
      { value: "gray", label: "Gray", points: { summer: 3, winter: 1 } }
    ]
  },
  {
    id: 3,
    question: "How does your skin look in natural sunlight?",
    options: [
      { value: "pale-cool", label: "Very pale with cool undertones", points: { winter: 3, summer: 2 } },
      { value: "pale-warm", label: "Pale with warm undertones", points: { spring: 3, summer: 1 } },
      { value: "medium-cool", label: "Medium with cool undertones", points: { summer: 3, winter: 1 } },
      { value: "medium-warm", label: "Medium with warm undertones", points: { autumn: 2, spring: 2 } },
      { value: "deep-cool", label: "Deep with cool undertones", points: { winter: 3, summer: 1 } },
      { value: "deep-warm", label: "Deep with warm undertones", points: { autumn: 3, winter: 1 } }
    ]
  },
  {
    id: 4,
    question: "How do you tan or burn in the sun?",
    options: [
      { value: "burn-easily", label: "Burn easily, tan minimally", points: { summer: 3, winter: 2 } },
      { value: "burn-then-tan", label: "Burn first, then tan gradually", points: { spring: 2, summer: 2 } },
      { value: "tan-easily", label: "Tan easily with minimal burning", points: { autumn: 3, spring: 1 } },
      { value: "deep-tan", label: "Tan deeply and rarely burn", points: { autumn: 2, winter: 2 } }
    ]
  },
  {
    id: 5,
    question: "Which metals look best on you?",
    options: [
      { value: "silver", label: "Silver, platinum, white gold", points: { summer: 3, winter: 2 } },
      { value: "gold", label: "Gold, brass, copper", points: { autumn: 3, spring: 2 } },
      { value: "both", label: "Both look good", points: { spring: 1, autumn: 1, summer: 1, winter: 1 } }
    ]
  }
];

const seasonDescriptions = {
  spring: {
    name: "Bright Spring",
    description: "You have warm, clear coloring with bright, vibrant features.",
    colors: ["Coral", "Peach", "Bright Yellow", "Kelly Green", "Turquoise", "Clear Navy"],
    avoid: ["Dusty colors", "Muted tones", "Black", "Pure white"]
  },
  summer: {
    name: "Cool Summer",
    description: "You have cool, soft coloring with muted, elegant features.",
    colors: ["Soft Pink", "Lavender", "Sky Blue", "Sage Green", "Rose Brown", "Cool Gray"],
    avoid: ["Orange", "Bright yellow", "Warm browns", "Black"]
  },
  autumn: {
    name: "Deep Autumn",
    description: "You have warm, rich coloring with deep, earthy features.",
    colors: ["Rust", "Deep Orange", "Olive Green", "Burgundy", "Chocolate Brown", "Camel"],
    avoid: ["Pastels", "Cool blues", "Bright pink", "Pure white"]
  },
  winter: {
    name: "Clear Winter",
    description: "You have cool, high-contrast coloring with striking features.",
    colors: ["Pure White", "Black", "Royal Blue", "Emerald Green", "Fuchsia", "Ruby Red"],
    avoid: ["Orange", "Peach", "Warm browns", "Muted colors"]
  }
};

interface ColorAnalysisQuizProps {
  isOpen: boolean;
  onClose: () => void;
}

const ColorAnalysisQuiz: React.FC<ColorAnalysisQuizProps> = ({ isOpen, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<string>('');

  if (!isOpen) return null;

  const handleAnswer = (questionId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const calculateResults = () => {
    const scores = { spring: 0, summer: 0, autumn: 0, winter: 0 };
    
    questions.forEach(question => {
      const answer = answers[question.id];
      if (answer) {
        const option = question.options.find(opt => opt.value === answer);
        if (option) {
          Object.entries(option.points).forEach(([season, points]) => {
            scores[season as keyof typeof scores] += points;
          });
        }
      }
    });

    const winner = Object.entries(scores).reduce((a, b) => 
      scores[a[0] as keyof typeof scores] > scores[b[0] as keyof typeof scores] ? a : b
    )[0];

    setResults(winner);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setResults('');
  };

  const currentQ = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const canProceed = answers[currentQ?.id];

  if (showResults) {
    const season = seasonDescriptions[results as keyof typeof seasonDescriptions];
    
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-light text-black tracking-wide">Your Color Analysis Results</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Palette className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-light text-black mb-4">{season.name}</h3>
              <p className="text-gray-600 text-lg font-light">{season.description}</p>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium text-black mb-4">Your Best Colors</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {season.colors.map((color) => (
                    <div key={color} className="bg-gray-50 rounded-lg p-3 text-center">
                      <span className="text-sm font-medium text-gray-700">{color}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-black mb-4">Colors to Avoid</h4>
                <div className="grid grid-cols-2 gap-3">
                  {season.avoid.map((color) => (
                    <div key={color} className="bg-red-50 rounded-lg p-3 text-center border border-red-100">
                      <span className="text-sm font-medium text-red-700">{color}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex space-x-4 mt-8">
              <Button onClick={resetQuiz} variant="outline" className="flex-1">
                Retake Quiz
              </Button>
              <Button onClick={onClose} className="flex-1">
                Apply to Wardrobe
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-light text-black tracking-wide">Color Analysis Quiz</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600">Question {currentQuestion + 1} of {questions.length}</span>
              <span className="text-sm text-gray-600">{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-black h-2 rounded-full transition-all duration-300" 
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {currentQ && (
            <div className="mb-8">
              <h3 className="text-xl font-light text-black mb-6">{currentQ.question}</h3>
              <div className="space-y-3">
                {currentQ.options.map((option) => (
                  <label key={option.value} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name={`question-${currentQ.id}`}
                      value={option.value}
                      checked={answers[currentQ.id] === option.value}
                      onChange={(e) => handleAnswer(currentQ.id, e.target.value)}
                      className="mr-4"
                    />
                    <span className="text-gray-700 font-light">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between">
            <Button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </Button>

            {isLastQuestion ? (
              <Button
                onClick={calculateResults}
                disabled={!canProceed}
                className="flex items-center space-x-2"
              >
                <span>See Results</span>
                <Palette className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                disabled={!canProceed}
                className="flex items-center space-x-2"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorAnalysisQuiz;
