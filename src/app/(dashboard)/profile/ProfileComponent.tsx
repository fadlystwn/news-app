import React from 'react';
import Image from 'next/image';
import { User } from '@/types/user';

interface ProfileProps {
  data: User
}

const ProfileComponent: React.FC<ProfileProps> = ({ data }) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="p-4 border border-gray-300 rounded-lg bg-gray-50 max-w-md w-full mx-auto dark:bg-gray-800 dark:border-gray-600">
        <div className="flex items-start gap-4">
          <div className="shrink-0">
            <Image
              src={data?.Profile?.avatarUrl || 'https://placehold.co/60x60.png'}
              alt={`${data?.name}'s avatar`}
              className="w-20 h-20 rounded-full object-cover"
              width={80}
              height={80}
            />
          </div>
          <div className="flex-1">
            <h2 className="m-0 text-2xl text-gray-800 dark:text-white">{data?.name}</h2>
            <p className="mt-2 text-base text-gray-500 dark:text-gray-400">{data?.Profile?.bio || 'No bio available'}</p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{data?.email || 'No bio available'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
