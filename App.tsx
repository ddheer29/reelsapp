import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import React from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Navigation from './src/navigation/Navigation';

GoogleSignin.configure({
  webClientId: '118252792281-s50l7e855pa3oheb04kefeqeeeq4bnrc.apps.googleusercontent.com',
  forceCodeForRefreshToken: true,
  offlineAccess: false,
  iosClientId: '118252792281-7pomlrv6fu71bsfrcjlrdh1uvlkb66g0.apps.googleusercontent.com',
});

const App = () => {
  return (
    <Navigation />
  );
};

export default App;

const styles = StyleSheet.create({});
