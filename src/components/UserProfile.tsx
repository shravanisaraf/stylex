
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const UserProfile = () => {
  return (
    <div className="flex items-center justify-center">
      <Link to="/signup">
        <Button className="bg-black text-white hover:bg-gray-800">
          Sign Up
        </Button>
      </Link>
    </div>
  );
};

export default UserProfile;
