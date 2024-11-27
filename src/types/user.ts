export interface User {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  password: string;
  Profile: Profile | null;
}

export interface Profile {
  id: number;
  bio: string | null;
  avatarUrl: string | null;
  userId: number;
}
