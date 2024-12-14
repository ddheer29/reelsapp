import { Platform, StyleSheet, Text, TextStyle, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import CustomText from './CustomText';

interface SocialButtonHorizontalProps {
  icon: React.ReactNode;
  text: string;
  textColor: string;
  backgroundColor: string;
  onPress: () => void;
}

const SocialButtonHorizontal: FC<SocialButtonHorizontalProps> = ({
  icon,
  text,
  textColor,
  backgroundColor,
  onPress,
}) => {
  const textStyle: TextStyle = {
    color: textColor,
  }

  return (
    <TouchableOpacity style={[
      styles.container,
      { backgroundColor },
    ]}
      onPress={onPress}
    >
      {icon}
      <CustomText variant='h8' style={[styles.text, textStyle]}>
        {text}
      </CustomText>
    </TouchableOpacity>
  )
}

export default SocialButtonHorizontal

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: Platform.OS === 'ios' ? 0.3 : 0.5,
    padding: 10,
    paddingHorizontal: 20,
    width: '100%',
    marginVertical: 10,
  },
  text: {
    width: '90%',
    alignSelf: 'center',
    textAlign: 'center',
  },
});
