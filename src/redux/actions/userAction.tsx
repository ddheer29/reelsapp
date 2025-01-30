import axios from 'axios';
import { appAxios } from '../apiConfig';
import { setUser } from '../reducers/userSlice';
import { CHECK_USERNAME } from '../API';
import { Alert } from 'react-native';
import { REGISTER } from 'redux-persist';
import { token_storage } from '../storage';
import { navigate } from '../../utils/NavigationUtil';

interface registerData {
  id_token: string;
  provider: string;
  name: string;
  email: string;
  username: string;
  userImage: string;
  bio: string;
}

export const refetchUser = () => async (dispatch: any) => {
  try {
    const res = await appAxios.get('/user/profile');
    await dispatch(setUser(res.data.user));
  } catch (error) {
    console.log('REFETCH USER--> ', error);
  }
};


export const register
  = (data: registerData) => async (dispatch: any) => {
    try {
      const res = await axios.post(REGISTER, data);
      token_storage.set('access_token', res.data.tokens.access_token);
      token_storage.set('refresh_token', res.data.tokens.refresh_token);
      await dispatch(setUser(res.data.user));
      navigate('BottomTab');
    } catch (error) {
      Alert.alert('Error, try again');
      console.log('REGISTER ERROR --> ', error);
    }
  };



export const checkUserNameAvailability
  = (username: string) => async (dispatch: any) => {
    try {
      const res = await axios.post(CHECK_USERNAME, {
        username,
      });
      return res.data.available;
    } catch (error) {
      console.log('checkUserNameAvailability USER--> ', error);
      return null;
    }
  };

