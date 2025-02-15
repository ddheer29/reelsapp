import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import GlobeBg from '../../assets/images/globebg.jpg';
import { screenHeight, screenWidth } from '../../utils/Scaling';

const GlobeFeed = () => {

  const [data, setata] = useState([])

  return (
    <ImageBackground source={GlobeBg} style={{ flex: 1, zIndex: -1 }}>
      <Text>GlobeFeed</Text>
    </ImageBackground>
  )
}

export default GlobeFeed

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    alignItems: 'center',
  },
  gridContainer: {
    width: screenWidth * 5,
    height: screenHeight * 2.9,
    justifyContent: 'center',
    alignItems: 'center',
  }
})