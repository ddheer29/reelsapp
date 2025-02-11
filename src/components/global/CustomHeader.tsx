import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { goBack } from '../../utils/NavigationUtil';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from '../../constants/Colors';
import CustomText from './CustomText';

interface CustomHeaderProps {
  title: string;
  onInfoPress?: () => void;
}

const CustomHeader: FC<CustomHeaderProps> = ({ title, onInfoPress }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 5,
      }}
    >
      <TouchableOpacity onPress={() => goBack()}>
        <Icon name="keyboard-backspace" color={Colors.text} size={RFValue(20)} />
      </TouchableOpacity>
      <CustomText variant='h4'>{title}</CustomText>
      <TouchableOpacity onPress={onInfoPress}>
        <Icon name="information-outline" color={Colors.disabled} size={RFValue(20)} />
      </TouchableOpacity>
    </View>
  )
}

export default CustomHeader

const styles = StyleSheet.create({})