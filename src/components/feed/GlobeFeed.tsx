import { FlatList, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobeBg from '../../assets/images/globebg.jpg';
import { screenHeight, screenWidth } from '../../utils/Scaling';
import { useAppDispatch } from '../../redux/reduxHook';
import { fetchFeedReel } from '../../redux/actions/reelAction';
import ReelItemCard from './ReelItemCard';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

function clamp(val: any, min: any, max: any) {
  return Math.min(Math.max(val, min), max);
}

const GlobeFeed = () => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const previousTranslateX = useSharedValue(0);
  const previousTranslateY = useSharedValue(0);
  const zoomScale = useSharedValue(1);
  const zoomStartScale = useSharedValue(0);

  const pinch = Gesture.Pinch()
    .onStart(() => {
      // zoomStartScale.value = zoomScale.value;
    }).onUpdate(event => {
      zoomScale.value = clamp(
        zoomStartScale.value * event.scale,
        0.3,
        Math.min(screenWidth / 100, screenHeight / 100));
    }).runOnJS(true);

  const pan = Gesture.Pan().minDistance(1).onStart(() => {
    previousTranslateX.value = translateX.value;
    previousTranslateY.value = translateY.value;
  }).onUpdate(event => {
    const maxTranslateX = screenWidth - 10;
    const maxTranslateY = screenHeight / 2 - 50;

    translateX.value = clamp(
      previousTranslateX.value + event.translationX,
      -maxTranslateX,
      maxTranslateX
    );

    translateY.value = clamp(
      previousTranslateY.value + event.translationY,
      -maxTranslateY,
      maxTranslateY
    );
  }).runOnJS(true);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: zoomScale.value },
        { translateX: translateX.value },
        { translateY: translateY.value }
      ],
    };
  })

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={Gesture.Simultaneous(pan, pinch)}>
        <ImageBackground
          source={GlobeBg}
          style={{ flex: 1, zIndex: -1 }}
          imageStyle={{ resizeMode: 'cover' }}
        >
          <Animated.View style={[styles.container, animatedStyle]}>
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
      </GestureDetector>
    </GestureHandlerRootView>
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