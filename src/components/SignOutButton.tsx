
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import { LogOut } from 'lucide-react';

const SignOutButton = () => {
  const { user, signOut } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <Button 
      onClick={signOut}
      variant="outline" 
      size="sm"
      className="border-gray-300 text-gray-700 hover:bg-gray-50"
    >
      <LogOut className="w-4 h-4 mr-2" />
      Sign Out
    </Button>
  );
};

export default SignOutButton;
