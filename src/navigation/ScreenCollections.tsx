import UploadReelScreen from '../screens/reel/UploadReelScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import SplashScreen from '../screens/auth/SplashScreen';
import HomeScreen from '../screens/dashboard/HomeScreen';
import PickReelScreen from '../screens/reel/PickReelScreen';
import BottomTab from './BottomTab';
import FeedReelScrollScreen from '../screens/reel/FeedReelScrollScreen';
import LoginEmail from '../screens/auth/LoginEmail';

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
  {
    name: 'LoginEmail',
    component: LoginEmail,
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
  }
];

export const mergedStacks = [...dashboardStack, ...authStack];
