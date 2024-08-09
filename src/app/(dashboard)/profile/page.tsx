import styles from './profile.module.css';
import prisma from '@/lib/db';
import Navigation from '@/components/Navigation';
import { getSession } from '@/lib/auth';

export default async function Profile() {
  const session = await getSession()
  const userId = session?.sessionData?.userId
  console.log('session', session)

  const profile = await prisma.profile.findUnique({
    where: {
      userId: userId
    }
  })

  return (
    <>
      <Navigation />
      <div className={styles.profileContainer}>
        {/* <img className={styles.avatar} src={avatarUrl} alt={`${name}'s avatar`} /> */}
        <div className={styles.details}>
          <h2 className={styles.name}>{profile?.name}</h2>
          <p className={styles.bio}>{profile?.bio}</p>
        </div>
      </div>
    </>
  );
};

