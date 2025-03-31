import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import CustomText from '../global/CustomText';
import { FONTS } from '../../constants/Fonts';

interface ButtonProps {
  firstText: string;
  secondText: string;
  onPressFirst: () => void;
  onPressSecond: () => void;
}

const ProfileButton: FC<ButtonProps> = ({
  firstText,
  secondText,
  onPressFirst,
  onPressSecond
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={onPressFirst}>
        <CustomText variant='h9' fontFamily={FONTS.Medium}>
          {firstText}
        </CustomText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={onPressSecond}>
        <CustomText variant='h9' fontFamily={FONTS.Medium}>
          {secondText}
        </CustomText>
      </TouchableOpacity>
    </View>
  )
}

export default ProfileButton

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12
  },
  btn: {
    backgroundColor: '#1c1b1b',
    padding: 8,
    borderRadius: 10,
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});