import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobeBg from '../../assets/images/globebg.jpg';
import { screenHeight, screenWidth } from '../../utils/Scaling';
import { useAppDispatch } from '../../redux/reduxHook';
import { fetchFeedReel } from '../../redux/actions/reelAction';

const GlobeFeed = () => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);

  const fetchFeed = async () => {
    setLoading(true);
    const data = await dispatch(fetchFeedReel(0, 16));
    setData(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchFeed();
  }, [])

  return (
    <ImageBackground source={GlobeBg} style={{ flex: 1, zIndex: -1 }}>
      <View style={styles.gridContainer}>

      </View>
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