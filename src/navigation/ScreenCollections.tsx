import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import SplashSceen from "../screens/auth/SplashSceen";
import HomeScreen from "../screens/dashboard/HomeScreen";
import PickReelScreen from "../screens/reel/PickReelScreen";
import BottomTab from "./BottomTab";

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
    name: 'SplashSceen',
    component: SplashSceen,
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
];

export const mergedStacks = [...dashboardStack, ...authStack];
