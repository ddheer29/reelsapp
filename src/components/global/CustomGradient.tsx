import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { FC } from 'react'
import LinearGradient from 'react-native-linear-gradient';

interface CustomGradientProps {
  position: 'top' | 'bottom';
  style?: ViewStyle;
}

const CustomGradient: FC<CustomGradientProps> = ({
  position = 'top',
  style,
}) => {

  const darkColors = [
    'rgba(0,0,0,0.9)',
    'rgba(0,0,0,0.8)',
    'rgba(0,0,0,0.7)',
    'rgba(0,0,0,0.4)',
    'rgba(0,0,0,0.1)',
    'rgba(0,0,0,0)'
  ];

  const lightColors = [
    'rgba(255,255,255,0.3)',
    'rgba(255,255,255,0.2)',
    'rgba(255,255,255,0.1)',
    'rgba(255,255,255,0.0)',
    'rgba(255,255,255,0.02)',
    'rgba(255,255,255,0.004)',
    'rgba(255,255,255,0)',
  ]

  const bottomColors = [...lightColors].reverse();

  const gradientStyle: ViewStyle = {
    position: 'absolute',
    width: '100%',
    height: 120,
    top: position === 'top' ? 0 : undefined,
    bottom: position === 'bottom' ? 0 : undefined,
    zIndex: 999,
  }

  return (
    <LinearGradient
      colors={position === 'top' ? lightColors : bottomColors}
      style={[gradientStyle, style]}
    />
  )
}

export default CustomGradient

const styles = StyleSheet.create({})