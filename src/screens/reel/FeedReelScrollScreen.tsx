import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import CustomView from '../../components/global/CustomView'
import { debounce } from 'lodash'

interface RouteProp {
  data: any[]
}

const FeedReelScrollScreen: FC = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const routeParams = route?.params as RouteProp;
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentVisibleIndex, setCurrentVisibleIndex] = useState<number>(0)


  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 80,
  }).current;


  const fetchFeedReel = useCallback(async (offset: number) => {
    debounce()
  }, [loading, hasMore, data, dispatch]);

  const renderVideoList = useCallback(({ item, index }: { item: any, index: number }) => {
    return (
      <View style={{ backgroundColor: 'red', flex: 1 }}>
        <Text>hi</Text>
      </View>
    )
  }, []);

  const keyExtractor = useCallback((item: any) => item._id.toString(), []);


  useEffect(() => {
    if (routeParams?.data) {
      setData(routeParams?.data);
      setOffset(routeParams?.data?.length);
    }
  }, [routeParams?.data])

  return (
    <CustomView>
      <FlatList
        data={data || []}
        keyExtractor={keyExtractor}
        renderItem={renderVideoList}
        pagingEnabled
        windowSize={2}
        disableIntervalMomentum={true}
        removeClippedSubviews={true}
        initialNumToRender={1}
        onEndReachedThreshold={0.1}
        decelerationRate={'normal'}
        showsVerticalScrollIndicator={false}
        viewabilityConfig={viewabilityConfig}
        scrollEventThrottle={16}
        onEndReached={async () => {
          await fetchFeedReel(offset);
        }}
      />
    </CustomView>
  )
}

export default FeedReelScrollScreen

const styles = StyleSheet.create({})
// ut920vDHOiJkMzHI
// divyangdheer11