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

interface Comment {
  _id: string;
  user: User;
  comment?: string;
  reply?: string;
  likes: number;
  likesCount: number;
  isPinned?: boolean;
  isLiked?: boolean;
  isLikedByAuthor?: boolean;
  timestamp: string;
  isAuthor?: boolean;
  hasGirf?: boolean;
  gifUrl?: string;
  repliesCount: number;
  isPosting?: boolean;
}

interface SubReply {
  _id: string;
  user: User;
  reply?: string;
  likes: number;
  likesCount: number;
  isPinned?: boolean;
  isLiked?: boolean;
  isLikedByAuthor?: boolean;
  timestamp: string;
  isAuthor?: boolean;
  hasGirf?: boolean;
  gifUrl?: string;
  comment: string;
  isPosting?: boolean;
}
