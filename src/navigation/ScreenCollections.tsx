import UploadReelScreen from '../screens/reel/UploadReelScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import SplashScreen from '../screens/auth/SplashScreen';
import HomeScreen from '../screens/dashboard/HomeScreen';
import PickReelScreen from '../screens/reel/PickReelScreen';
import BottomTab from './BottomTab';
import FeedReelScrollScreen from '../screens/reel/FeedReelScrollScreen';
import ReelScrollScreen from '../screens/reel/ReelScrollScreen';
import FollowingScreen from '../screens/dashboard/FollowingScreen';
import UserProfileScreen from '../screens/dashboard/UserProfileScreen';

export const authStack = [
  {
    name: 'LoginScreen',
    component: LoginScreen,
  },
  {
    name: 'RegisterScreen',
    component: RegisterScreen,
  },
  {
    name: 'SplashScreen',
    component: SplashScreen,
  },
];

export const dashboardStack = [
  {
    name: 'BottomTab',
    component: BottomTab,
  },
  {
    name: 'PickReelScreen',
    component: PickReelScreen,
  },
  {
    name: 'UploadReelScreen',
    component: UploadReelScreen,
  },
  {
    name: 'FeedReelScrollScreen',
    component: FeedReelScrollScreen
  },
  {
    name: 'ReelScrollScreen',
    component: ReelScrollScreen
  },
  {
    name: 'FollowingScreen',
    component: FollowingScreen
  },
  {
    name: 'UserProfileScreen',
    component: UserProfileScreen
  }
];

export const mergedStacks = [...dashboardStack, ...authStack];
