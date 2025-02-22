import { StyleSheet, Text, View } from 'react-native'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { screenHeight, screenWidth } from '../../utils/Scaling';
import { useAppDispatch } from '../../redux/reduxHook';
import { useIsFocused } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import Loader from '../../assets/images/loader.jpg';
import Video from 'react-native-video';
import convertToProxyUrl from 'react-native-video-cache'
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import LottieView from 'lottie-react-native';
import DoubleTapAnim from '../../assets/animations/heart.json';

interface VideoItemProps {
  item: any;
  isVisible: boolean;
  preload: boolean;
}

const VideoItem: FC<VideoItemProps> = ({ item, isVisible, preload }) => {

  const dispatch = useAppDispatch();
  const [paused, setPaused] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [showLikeAnim, setShowLikeAnim] = useState<boolean>(false);

  const isFocused = useIsFocused();

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  }

  const handleTogglePlay = useCallback(() => {
    let currentState = !paused ? 'paused' : 'play';
    setIsPaused(!isPaused);
    setPaused(currentState);
    setTimeout(() => {
      if (currentState === 'play') {
        setPaused(null);
      }
    }, 700);
  }, [paused, isPaused])

  const handleDoubleTap = useCallback(() => {
    setShowLikeAnim(true);
    setTimeout(() => {
      setShowLikeAnim(false);
    }, 700);
  }, [])

  const singleTap = Gesture.Tap().maxDuration(250).onStart(() => {
    handleTogglePlay();
  }).runOnJS(true);

  const doubleTap = Gesture.Tap().maxDuration(250).numberOfTaps(2).onStart(() => {
    handleDoubleTap();
  }).runOnJS(true);

  useEffect(() => {
    setIsPaused(!isVisible);
    if (isVisible) {
      setPaused(null);
      setVideoLoaded(false);
    }
  }, [isVisible])

  useEffect(() => {
    if (!isFocused) {
      setIsPaused(true);
    }
    if (isFocused && isVisible) {
      setIsPaused(false);
    }
  }, [isFocused])

  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <GestureDetector gesture={Gesture.Simultaneous(singleTap, doubleTap)}>
          <View style={styles.videoContainer}>
            {
              !videoLoaded && (
                <FastImage source={{ uri: item.thumbUri, priority: FastImage.priority.high }}
                  style={styles.videoContainer}
                  defaultSource={Loader}
                  resizeMode='cover'
                />
              )
            }
            {
              isVisible || preload ? (
                <Video
                  poster={item.thumbUri}
                  posterResizeMode='cover'
                  source={
                    isVisible || preload
                      ? { uri: convertToProxyUrl(item.videoUri) }
                      : undefined
                  }
                  bufferConfig={{
                    minBufferMs: 2500,
                    maxBufferMs: 3000,
                    bufferForPlaybackMs: 2500,
                    bufferForPlaybackAfterRebufferMs: 2500
                  }}
                  ignoreSilentSwitch={'ignore'}
                  playWhenInactive={false}
                  playInBackground={false}
                  useTextureView={false}
                  controls={false}
                  disableFocus={false}
                  style={styles.videoContainer}
                  paused={isPaused}
                  repeat={true}
                  hideShutterView
                  minLoadRetryCount={5}
                  resizeMode='cover'
                  shutterColor='transparent'
                  onReadyForDisplay={handleVideoLoad}
                />
              ) : null
            }
          </View>
        </GestureDetector>
      </GestureHandlerRootView>
      {
        showLikeAnim && (
          <View style={styles.lottieContainer}>
            <LottieView
              source={DoubleTapAnim}
              autoPlay
              loop={false}
              style={styles.lottie}
            />
          </View>
        )
      }
      {
        paused !== null && (
          <View style={styles.playPauseButton}>
            <View style={styles.shadow} pointerEvents='none'>
              <Icon
                name={paused === 'paused' ? 'pause' : 'play-arrow'}
                size={RFValue(50)}
                color={'white'}
              />
            </View>
          </View>
        )
      }
    </View>
  )
}

export default VideoItem

const styles = StyleSheet.create({
  container: {
    height: screenHeight,
    width: screenWidth,
    flex: 1,
    flexGrow: 1,
  },
  videoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: screenHeight,
    aspectRatio: 9 / 16,
    zIndex: -1,
    flex: 1,
  },
  playPauseButton: {
    position: 'absolute',
    top: '47%',
    left: '44%',
    bottom: 0,
    opacity: 0.7,
  },
  shadow: {
    zIndex: -1
  },
  lottie: {
    height: '100%',
    width: '100%',
  },
  lottieContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignContent: 'center'
  }
})