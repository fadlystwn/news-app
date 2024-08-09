import styles from './profile.module.css';
import prisma from '@/lib/db';
import Navigation from '@/components/Navigation';
import { getSession } from '@/lib/auth';

async function getData() {
  try {
    const session = await getSession();
    const userId = session?.sessionData?.userId;

    if (!userId) throw new Error('User not found');

    const profile = await prisma.profile.findUnique({
      where: { userId }
    });

    return profile;
  } catch (err) {
    console.error('Error fetching profile data:', err);
    return null;
  }
}

export default async function Profile() {
  const profile = await getData();
  return (
    <>
      <Navigation />
      <div className={styles.profileContainer}>
        {/* <img className={styles.avatar} src={avatarUrl} alt={`${name}'s avatar`} /> */}
        <div className={styles.details}>
          <p className={styles.bio}>{profile?.bio}</p>
        </div>
      </div>
    </>
  );
};

