
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { signIn, signInWithGoogle, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(formData.email, formData.password);
      toast({
        title: "Welcome back! 👋",
        description: "You've been signed in successfully.",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Sign in failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast({
        title: "Welcome! 🎉",
        description: "You've been signed in with Google successfully.",
      });
      navigate('/');
    } catch (error) {
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
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg border border-neutral-200 p-8 shadow-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="text-2xl font-light tracking-wide text-neutral-900">
              Almaree
            </Link>
            <h1 className="text-2xl font-light text-neutral-900 mt-6 mb-2">Welcome Back</h1>
            <p className="text-neutral-600 font-light">Sign in to your digital wardrobe</p>
          </div>

          {/* Google Sign In */}
          <Button 
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            variant="outline"
            className="w-full mb-6 border-neutral-300 hover:bg-neutral-50"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </Button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-neutral-500">or</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-neutral-700 font-medium">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-neutral-700 font-medium">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-neutral-600">Remember me</span>
              </label>
              <Link to="#" className="text-sm text-neutral-900 hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-neutral-900 hover:bg-neutral-800"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Signup Link */}
          <div className="text-center mt-6">
            <p className="text-neutral-600 font-light">
              Don't have an account?{' '}
              <Link to="/signup" className="text-neutral-900 hover:underline font-medium">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
