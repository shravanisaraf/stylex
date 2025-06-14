
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import { User, LogOut } from 'lucide-react';

const UserProfile = () => {
  const { user, signOut } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center space-x-4">
        <Link to="/login">
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
            Sign In
          </Button>
        </Link>
        <Link to="/signup">
          <Button className="bg-white text-black hover:bg-gray-100">
            Sign Up
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2 text-white">
        {user.avatar ? (
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <User className="w-8 h-8 p-1 bg-white/20 rounded-full" />
        )}
        <span className="font-light">Hi, {user.name}</span>
      </div>
      <Button 
        onClick={signOut}
        variant="outline" 
        size="sm"
        className="border-white/20 text-white hover:bg-white/10"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Sign Out
      </Button>
    </div>
  );
};

export default UserProfile;
