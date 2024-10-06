import React, { FC, ReactNode } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Colors } from '../../constants/Colors';

interface CustomViewProps {
  children: ReactNode;
  style?: ViewStyle;
}

const CustomView:FC<CustomViewProps> = ({children, style}) => {
  return (
    <View style={[styles.container, style]}>{children}</View>
  );
};

export default CustomView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
