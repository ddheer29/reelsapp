import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from './CustomText';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FONTS } from '../../constants/Fonts';
import { RFValue } from 'react-native-responsive-fontsize';

const GradientButton: React.FC<{
  text: string;
  iconName?: string;
  onPress?: () => void;
}> = ({ text, iconName, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.GradientButtonContainer}
      activeOpacity={0.4}
      onPress={onPress}
    >
      <LinearGradient
        colors={['#333', '#444', '#555', '#444', '#333']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.GradientButton}>
        <View style={styles.innerButton}>
          <CustomText
            variant="h8"
            style={styles.text}
            fontFamily={FONTS.Medium}>
            {text}
          </CustomText>
          <Icon
            name={iconName ? iconName : 'wallet-giftcard'}
            size={RFValue(16)}
            style={styles.icon}
          />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;

const styles = StyleSheet.create({
  GradientButtonContainer: {
    width: '70%',
    justifyContent: 'center',
    alignContent: 'center',
    margin: 20,
    overflow: 'hidden',
  },
  GradientButton: {
    borderRadius: 20,
    padding: 8,
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  innerButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    width: '100%',
  },
  text: {
    color: Colors.white,
    marginRight: 5,
  },
  icon: {
    color: Colors.white,
  },
  skeletonLoader: {
    borderRadius: 20,
  },
  gradient: {
    width: '70%',
    height: '100%',
  },
});
