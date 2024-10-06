import React, { FC } from 'react';
import Home from '../assets/icons/home.png';
import HomeFocused from '../assets/icons/homeFocused.png';
import Profile from '../assets/icons/profile.png';
import ProfileFocused from '../assets/icons/profileFocused.png';
import { Image } from 'react-native';
import { bottomBarStyles } from '../styles/NavigationBarStyles';
import { Colors } from '../constants/Colors';

interface TabProps{
  name: string;
}

interface IconProps{
  name: string;
}

const TabIcon: FC<TabProps> = ({name}) => {
  return (
    <Image
      source={name === 'Home' ? Home : Profile}
      style={[bottomBarStyles.tabIcon, {tintColor: Colors.disabled}]}
    />
  );
};

const TabIconFocused: FC<IconProps> = ({name}) => {
  return (
    <Image
      source={name === 'Home' ? HomeFocused : ProfileFocused}
      style={[bottomBarStyles.tabIcon, {tintColor: Colors.disabled}]}
    />
  );
};

export const HomeTabIcon: FC<IconProps> = ({focused}) => {
  return focused ? <TabIconFocused name="Home" /> : <TabIcon name="Home" />;
};

export const ProfileTabIcon: FC<IconProps> = ({focused}) => {
  return focused ? <TabIconFocused name="Profile" /> : <TabIcon name="Profile" />;
};
