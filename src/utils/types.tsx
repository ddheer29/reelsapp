interface User {
  _id: string;
  id: string;
  username: string;
  userImage: string;
  name: string;
  followingCount: string;
  followersCount: string;
  reelsCount: number;
  isFollowing?: boolean;
  bio: string;
}

interface ProfileUser {
  _id: string;
  id: string;
  username: string;
  userImage: string;
  name: string;
  followingCount: string;
  followersCount: string;
  reelsCount: number;
  bio: string;
}
