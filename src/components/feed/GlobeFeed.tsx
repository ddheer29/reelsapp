import { Animated, FlatList, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobeBg from '../../assets/images/globebg.jpg';
import { screenHeight, screenWidth } from '../../utils/Scaling';
import { useAppDispatch } from '../../redux/reduxHook';
import { fetchFeedReel } from '../../redux/actions/reelAction';
import ReelItemCard from './ReelItemCard';

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

  const renderItem = ({ item, index }: { item: any, index: number }) => {
    const verticalShift = index % 2 === 0 ? -20 : 20;
    return (
      <Animated.View style={{ transform: [{ translateY: verticalShift }] }}>
        <ReelItemCard
          item={item}
          loading={loading}
          onPressReel={async () => { }}
        />
      </Animated.View>
    )
  }

  useEffect(() => {
    fetchFeed();
  }, [])

  return (
    <ImageBackground
      source={GlobeBg}
      style={{ flex: 1, zIndex: -1 }}
      imageStyle={{ resizeMode: 'cover' }}
    >
      <Animated.View style={styles.container}>
        <View style={styles.gridContainer}>
          {
            loading ? (
              <FlatList
                data={Array.from({ length: 16 })}
                keyExtractor={(item, index) => index.toString()}
                numColumns={4}
                pinchGestureEnabled
                renderItem={renderItem}
                scrollEnabled={false}
                contentContainerStyle={styles.flatlistContainer}
              />
            ) : (
              <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                numColumns={4}
                pinchGestureEnabled
                renderItem={renderItem}
                scrollEnabled={false}
                contentContainerStyle={styles.flatlistContainer}
              />
            )
          }
        </View>
      </Animated.View>
    </ImageBackground>
  )
}

export default GlobeFeed

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  gridContainer: {
    width: screenWidth * 5,
    height: screenHeight * 2.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatlistContainer: {
    paddingVertical: 20,
    alignSelf: 'center',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  }
})