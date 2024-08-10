import prisma from "@/lib/db";
import Navigation from "@/components/Navigation";
import { getSession } from "@/lib/auth";
import { User } from "@/types/user";
import ProfileComponent from "./ProfileComponent";

async function fetchData(): Promise<User | null> {
  const session = await getSession()
  const id = session?.sessionData?.userId
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
      include: {
        Profile: true
      }

    });
    return user;
  } catch (err) {
    console.error('Error fetching data:', err);
    return null;
  }
}

export default async function ProfilePage() {
  const profile = await fetchData()

  console.log(profile)
  if (!profile) {
    return <div>Not found!</div>;
  }
  return (
    <>
      <Navigation />
      {profile && <ProfileComponent data={profile} />}
    </>
  );
};

