
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const { signUp, signInWithGoogle, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    try {
      await signUp(formData.name, formData.email, formData.password);
      toast({
        title: "Welcome to Almaree! 🎉",
        description: "Your account has been created successfully.",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Sign up failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleGoogleSignIn = async () => {
    console.log('Google sign-in button clicked');
    try {
      await signInWithGoogle();
      toast({
        title: "Welcome to Almaree! 🎉",
        description: "You've been signed in with Google successfully.",
      });
      navigate('/');
    } catch (error) {
      console.error('Google sign-in error:', error);
      toast({
        title: "Google sign in failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      <div className="max-w-sm w-full">
        <div className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="text-4xl font-light font-cursive text-neutral-900 hover:text-neutral-700 transition-colors">
              Almaree
            </Link>
            <h1 className="text-xl font-light text-neutral-900 mt-6 mb-2">Create Account</h1>
            <p className="text-neutral-600 text-sm font-light">Start curating your digital wardrobe</p>
          </div>

          {/* Google Sign In */}
          <Button 
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            variant="outline"
            className="w-full mb-6 border-neutral-300 hover:bg-neutral-50 transition-all duration-200 hover:shadow-md"
          >
            {isLoading ? (
              <div className="w-5 h-5 mr-2 border-2 border-neutral-300 border-t-neutral-600 rounded-full animate-spin"></div>
            ) : (
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            {isLoading ? 'Signing in...' : 'Continue with Google'}
          </Button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-300"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-white text-neutral-500 font-light">or</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="name" className="text-neutral-700 text-sm font-medium">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 border-neutral-300 focus:border-neutral-500 focus:ring-neutral-500"
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-neutral-700 text-sm font-medium">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 border-neutral-300 focus:border-neutral-500 focus:ring-neutral-500"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-neutral-700 text-sm font-medium">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 border-neutral-300 focus:border-neutral-500 focus:ring-neutral-500"
                required
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-neutral-700 text-sm font-medium">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 border-neutral-300 focus:border-neutral-500 focus:ring-neutral-500"
                required
              />
            </div>

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-neutral-900 hover:bg-neutral-800 text-white transition-all duration-200 hover:shadow-md mt-6"
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-neutral-600 text-sm font-light">
              Already have an account?{' '}
              <Link to="/login" className="text-neutral-900 hover:text-neutral-700 font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
