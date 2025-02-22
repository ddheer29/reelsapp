import { ActivityIndicator, FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View, ViewToken } from 'react-native'
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import CustomView from '../../components/global/CustomView'
import { debounce } from 'lodash'
import { screenHeight } from '../../utils/Scaling'
import { fetchFeedReel } from '../../redux/actions/reelAction'
import { useAppDispatch } from '../../redux/reduxHook'
import { Colors } from '../../constants/Colors'
import Loader from '../../assets/images/loader.jpg'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { goBack } from '../../utils/NavigationUtil'
import { RFValue } from 'react-native-responsive-fontsize'
import VideoItem from '../../components/reel/VideoItem'

interface RouteProp {
  data: any[]
}

const FeedReelScrollScreen: FC = () => {
  const route = useRoute();
  const dispatch = useAppDispatch();
  const routeParams = route?.params as RouteProp;
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentVisibleIndex, setCurrentVisibleIndex] = useState<number>(0)


  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 80,
  }).current;

  const onViewableItemsChanged = useRef(
    debounce(({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
      if (viewableItems?.length > 0) {
        setCurrentVisibleIndex(viewableItems[0]?.index || 0);
      }
    }, 100)
  ).current;


  const getItemLayout = useCallback((data: any, index: number) => ({
    length: screenHeight,
    offset: screenHeight * index,
    index
  }), []);

  const removeDuplicate = (data: any) => {
    const uniqueData = new Map();
    data?.forEach((item: any) => {
      if (!uniqueData.has(item._id)) {
        uniqueData.set(item._id, item);
      }
    }
    );
    return Array.from(uniqueData.values());
  }

  const fetchFeed = useCallback(
    debounce(async (offset: number) => {
      if (loading || !hasMore) return;
      setLoading(true);
      try {
        const newDara = await dispatch(fetchFeedReel(offset, 8));
        setOffset(offset + 8);
        if (newDara?.length < 8) {
          setHasMore(false);
        }
        setData(removeDuplicate([...data, ...newDara]));
      } catch (error) {
        console.log('error', error);
      } finally {
        setLoading(false);
      }
    }, 200),
    [loading, hasMore, data, dispatch]);

  const renderVideoList = useCallback(({ item, index }: { item: any, index: number }) => {
    return (
      <VideoItem
        key={index}
        item={item}
        isVisible={index === currentVisibleIndex}
        preload={Math.abs(currentVisibleIndex + 5) >= index}
      />
    )
  }, [currentVisibleIndex]);

  const keyExtractor = useCallback((item: any) => item._id.toString(), []);

  const memoizedValue = useMemo(() => renderVideoList, [currentVisibleIndex, data]);

  useEffect(() => {
    if (Array.isArray(routeParams?.data)) {
      setData(routeParams.data);
      setOffset(routeParams.data.length);
    }
  }, [routeParams?.data]);


  return (
    <CustomView>
      <FlatList
        data={data || []}
        keyExtractor={keyExtractor}
        renderItem={memoizedValue}
        windowSize={2}
        onEndReached={async () => {
          await fetchFeed(offset);
        }}
        pagingEnabled
        viewabilityConfig={viewabilityConfig}
        disableIntervalMomentum={true}
        removeClippedSubviews={true}
        maxToRenderPerBatch={2}
        getItemLayout={getItemLayout}
        onViewableItemsChanged={onViewableItemsChanged}
        initialNumToRender={1}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() =>
          loading ? (
            <View style={styles.footer}>
              <ActivityIndicator size="small" color={Colors.white} />
            </View>
          ) : null
        }
        decelerationRate={'normal'}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      />
      <Image
        source={Loader}
        style={styles.thumbnail}
      />
      <View style={styles.backButton}>
        <TouchableOpacity onPress={() => goBack()}>
          <Icon name='arrow-back' size={RFValue(20)} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </CustomView>
  )
}

export default FeedReelScrollScreen

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 20,
    left: 10,
    zIndex: 99,
  },
  footer: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    position: 'absolute',
    zIndex: -2,
    aspectRatio: 9 / 16,
    width: '100%',
    height: screenHeight,
    alignSelf: 'center',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    resizeMode: 'stretch',
  }
})
// ut920vDHOiJkMzHI
// divyangdheer11