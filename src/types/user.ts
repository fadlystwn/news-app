export interface User {
  name: string;
  email: string;
  phone: string | null;
  Profile: Profile | null;

}

export interface Profile extends User {
  id: number;
  bio: string | null;
  avatarUrl: string | null;
  userId: number;
}
