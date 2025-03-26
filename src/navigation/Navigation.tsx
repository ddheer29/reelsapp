import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './MainNavigator';
import { navigationRef } from '../utils/NavigationUtil';

const config = {
  screens: {
    UserProfileScreen: '/share/user/:username',
    ReelScrollScreen: '/share/reel/:id'
  }
}

const linking = {
  prefixes: ['reelz://', 'https://dheer-reels-app.onrender.com'],
  config
}

const Navigation: React.FC = () => {
  return (
    <NavigationContainer ref={navigationRef} linking={linking}>
      <MainNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
