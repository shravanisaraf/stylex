
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login data:', formData);
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
        <div className="bg-white rounded-lg border border-neutral-200 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="text-2xl font-light tracking-wide text-neutral-900">
              STYLEX
            </Link>
            <h1 className="text-2xl font-light text-neutral-900 mt-6 mb-2">Welcome Back</h1>
            <p className="text-neutral-600 font-light">Sign in to your digital wardrobe</p>
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

            <Button type="submit" className="w-full bg-neutral-900 hover:bg-neutral-800">
              Sign In
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
