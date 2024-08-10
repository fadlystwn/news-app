import React from 'react';
import Image from 'next/image';
import { User } from '@/types/user';
import styles from './profile.module.css';

interface ProfileProps {
  data: User
}

const ProfileComponent: React.FC<ProfileProps> = ({ data }) => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.avatarContainer}>
          <Image
            src={data?.Profile?.avatarUrl || 'https://placehold.co/60x60.png'}
            alt={`${data?.name}'s avatar`}
            className={styles.avatar}
            width={60}
            height={60}
          />
        </div>
        <div className={styles.infoContainer}>
          <h2 className={styles.username}>{data?.name}</h2>
          <p className={styles.bio}>{data?.Profile?.bio || 'No bio available'}</p>
          <p >{data?.email || 'No bio available'}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
