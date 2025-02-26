import 'react-native-gesture-handler';
import './src/sheets/sheet';
import { Platform, StatusBar, StyleSheet } from 'react-native';
import React from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Navigation from './src/navigation/Navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

// GoogleSignin.configure({
//   webClientId:
//     '118252792281-s50l7e855pa3oheb04kefeqeeeq4bnrc.apps.googleusercontent.com',
//   forceCodeForRefreshToken: true,
//   offlineAccess: false,
//   iosClientId:
//     '118252792281-7pomlrv6fu71bsfrcjlrdh1uvlkb66g0.apps.googleusercontent.com',
// });

GoogleSignin.configure({
  scopes: ['email'], // Request email and profile info
  webClientId: '118252792281-7pomlrv6fu71bsfrcjlrdh1uvlkb66g0.apps.googleusercontent.com', // Web Client ID (for Firebase or backend authentication)
  forceCodeForRefreshToken: true,
  offlineAccess: true, // Allows you to refresh the token
  iosClientId: '118252792281-s50l7e855pa3oheb04kefeqeeeq4bnrc.apps.googleusercontent.com', // iOS-specific client ID
});

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar
        translucent={Platform.OS === 'ios'}
        backgroundColor="transparent"
      />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({});
