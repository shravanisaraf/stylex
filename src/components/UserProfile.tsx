
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import { User } from 'lucide-react';

const UserProfile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center justify-center space-x-4">
        <Link to="/login">
          <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
            Sign In
          </Button>
        </Link>
        <Link to="/signup">
          <Button className="bg-black text-white hover:bg-gray-800">
            Sign Up
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2 text-gray-700">
      {user.avatar ? (
        <img 
          src={user.avatar} 
          alt={user.name} 
          className="w-8 h-8 rounded-full"
        />
      ) : (
        <User className="w-8 h-8 p-1 bg-gray-200 rounded-full" />
      )}
      <span className="font-light">Hi, {user.name}</span>
    </div>
  );
};

export default UserProfile;
