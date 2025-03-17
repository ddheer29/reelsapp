import { ActivityIndicator, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch } from '../../redux/reduxHook';
import { fetchReel } from '../../redux/actions/reelAction';
import { Tabs } from 'react-native-collapsible-tab-view';
import { Colors } from '../../constants/Colors';
import { screenWidth } from '../../utils/Scaling';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomText from '../global/CustomText';
import { FONTS } from '../../constants/Fonts';
import Icon from 'react-native-vector-icons/MaterialIcons'
import ProfileReelCard from './ProfileReelCard';
import { navigate } from '../../utils/NavigationUtil';

const ReelListTab: FC<{
  user: ProfileUser | User | undefined;
  type: 'post' | 'liked' | 'watched';
}> = ({ user, type }) => {
  const [loading, setLoading] = useState(false);
  const [offsetLoading, setOffsetLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [offset, setOffset] = useState(0);

  const dispatch = useAppDispatch();

  const removeDuplicate = (data: any) => {
    const uniqueDataMap = new Map();
    data?.forEach((item: any) => {
      if (!uniqueDataMap.has(item._id)) {
        uniqueDataMap.set(item._id, item);
      }
    }
    );
    return Array.from(uniqueDataMap.values());
  }

  const renderItem = ({ item, index }: { item: any, index: number }) => {
    return (
      <ProfileReelCard
        item={item}
        loading={loading}
        onPressReel={() => {
          navigate('ReelScrollScreen', {
            data: data,
            index: index
          })
        }}
      />
    )
  }

  const fetchReelsFunction = async (scrollOffset: number, isRefreshing: boolean) => {
    if (scrollOffset === 0) {
      setLoading(true);
    } else {
      setOffsetLoading(true);
    }

    const reelData = {
      userId: user?.id,
      offset: scrollOffset
    }

    let newData: any[] = [];
    if (type === 'post') {
      newData = await dispatch(fetchReel(reelData, 'reel'));
    } else if (type === 'liked') {
      newData = await dispatch(fetchReel(reelData, 'likedreel'));
    } else {
      newData = await dispatch(fetchReel(reelData, 'watchedreel'));
    }

    if (isRefreshing) {
      setData([...newData]);
      setOffset(0);
    } else {
      setData(prevData => removeDuplicate([...prevData, ...newData]));
    }

    if (newData.length < 5) {
      setHasMore(false);
    }

    setLoading(false)
    setOffsetLoading(false);
    setRefreshing(false);

  }

  useEffect(() => {
    fetchReelsFunction(0, false)
  }, [])

  return (
    <Tabs.FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      numColumns={3}
      onEndReached={() => {
        if (hasMore) {
          fetchReelsFunction(offset, false)
        }
      }}
      removeClippedSubviews
      initialNumToRender={2}
      onEndReachedThreshold={0.1}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setData([]);
            setOffset(0);
            setHasMore(true);
            fetchReelsFunction(0, true);
          }}
        />
      }
      ListFooterComponent={() => {
        if (!offsetLoading && !loading) {
          return null;
        }
        return (
          <View
            style={{
              width: screenWidth,
              justifyContent: 'center',
              alignItems: 'center',
              height: 30,
            }}
          >
            <ActivityIndicator color={Colors.white} size={"small"} />
          </View>
        )
      }}
      ListEmptyComponent={() => {
        if (loading) return null;
        return (
          <View style={styles.emptyContainer}>
            <Icon
              name='play-circle-outline'
              size={RFValue(35)}
              color={Colors.white}
            />
            <CustomText variant='h6' fontFamily={FONTS.Medium}>
              No {type} Reels here
            </CustomText>
          </View>
        )
      }}
      contentContainerStyle={styles.flatlistContainer}
    />
  )
}

export default ReelListTab

const styles = StyleSheet.create({
  flatlistContainer: {
    paddingVertical: 20,
    alignItems: 'flex-start',
    paddingBottom: 80,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: '100%'
  }
})