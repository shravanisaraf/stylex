
import React, { useState, useRef, useEffect } from 'react';
import { Send, Palette, Sparkles, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import ChatMessage from '../components/ChatMessage';
import ColorAnalyzer from '../components/ColorAnalyzer';
import StyleQuiz from '../components/StyleQuiz';
import { getStyleAdvice } from '../services/aiStyleService';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  category?: 'color' | 'style' | 'outfit' | 'general';
}

const StyleCoach = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi! I'm your AI Style Coach! 👗✨ I can help you with:\n\n🎨 **Color Analysis** - Find your perfect colors\n👔 **Style Advice** - Get personalized styling tips\n👗 **Outfit Recommendations** - Create amazing looks\n📊 **Style Quiz** - Discover your style personality\n\nWhat would you like to explore today?",
      timestamp: new Date(),
      category: 'general'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeFeature, setActiveFeature] = useState<'chat' | 'color' | 'quiz'>('chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const aiResponse = await getStyleAdvice(inputMessage, messages);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date(),
        category: detectCategory(inputMessage)
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "I'm having trouble connecting right now. But I can still help you with some basic style advice! Try asking about color combinations, outfit ideas, or style tips.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const detectCategory = (message: string): 'color' | 'style' | 'outfit' | 'general' => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('color') || lowerMessage.includes('palette')) return 'color';
    if (lowerMessage.includes('outfit') || lowerMessage.includes('combination')) return 'outfit';
    if (lowerMessage.includes('style') || lowerMessage.includes('fashion')) return 'style';
    return 'general';
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  const quickQuestions = [
    "What colors look best on me?",
    "How do I find my personal style?",
    "What should I wear to a job interview?",
    "How do I mix patterns?",
    "What are the current fashion trends?"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Wardrobe</span>
            </Link>
            <h1 className="text-2xl font-light tracking-wide text-black">AI Style Coach</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        {/* Feature Tabs */}
        <div className="flex space-x-4 mb-6">
          <Button
            variant={activeFeature === 'chat' ? 'default' : 'outline'}
            onClick={() => setActiveFeature('chat')}
            className="flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Chat Coach</span>
          </Button>
          <Button
            variant={activeFeature === 'color' ? 'default' : 'outline'}
            onClick={() => setActiveFeature('color')}
            className="flex items-center space-x-2"
          >
            <Palette className="w-4 h-4" />
            <span>Color Analysis</span>
          </Button>
          <Button
            variant={activeFeature === 'quiz' ? 'default' : 'outline'}
            onClick={() => setActiveFeature('quiz')}
            className="flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Style Quiz</span>
          </Button>
        </div>

        {/* Main Content */}
        {activeFeature === 'chat' && (
          <div className="space-y-6">
            {/* Chat Messages */}
            <Card className="h-96 overflow-hidden">
              <CardContent className="p-0 h-full flex flex-col">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map(message => (
                    <ChatMessage key={message.id} message={message} />
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                
                {/* Input Area */}
                <div className="border-t p-4">
                  <div className="flex space-x-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Ask me about colors, styles, or outfits..."
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleSendMessage}
                      disabled={isLoading || !inputMessage.trim()}
                      size="icon"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Questions */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">Quick Questions to Get Started:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {quickQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="justify-start text-left h-auto p-3 text-sm"
                      onClick={() => handleQuickQuestion(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeFeature === 'color' && <ColorAnalyzer />}
        {activeFeature === 'quiz' && <StyleQuiz />}
      </div>
    </div>
  );
};

export default StyleCoach;
