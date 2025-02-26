import { FlatList, Keyboard, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ActionSheet, { SheetManager, SheetProps } from 'react-native-actions-sheet'
import { screenHeight } from '../utils/Scaling'
import { Colors } from '../constants/Colors'
import CustomText from '../components/global/CustomText'
import { FONTS } from '../constants/Fonts'
import { useAppDispatch, useAppSelector } from '../redux/reduxHook'
import { selectUser } from '../redux/reducers/userSlice'
import { getSearchUsers } from '../redux/actions/userAction'
import { s } from 'react-native-size-matters'
import { getComments } from '../redux/actions/commentAction'
import UserItem from '../components/global/UserItem'

const CommentSheet = (props: SheetProps<"comment-sheet">) => {

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [replyTo, setReplyTo] = useState<Comment | SubReply | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [searchUserLoading, setSearchUserLoading] = useState<boolean>(false);
  const [filterData, setFilterData] = useState<User[]>([]);
  const [replyCommentId, setReplyCommentId] = useState<string | number | null>(null);
  const [commentData, setCommentData] = useState<any[]>([]);
  const [mentionSearchWord, setMentionSearchWord] = useState<string | null>(null);
  const [confirmMention, setConfirmMention] = useState<any | null>(false);

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

  const fetchSearchUserData = async () => {
    setSearchUserLoading(true);
    const searchUserData = await dispatch(getSearchUsers(mentionSearchWord || ''));
    setFilterData(searchUserData);
    setSearchUserLoading(false);
  }

  const fetchComments = async (scrollOffset: number) => {
    setLoading(true);
    const newData = await dispatch(getComments(props.payload?.id || '', scrollOffset));
    setOffset(scrollOffset + 5);
    if (newData.length < 5) {
      setHasMore(false);
    }
    setCommentData(removeDuplicate([...commentData, ...newData]));
    setLoading(false);
  }

  useEffect(() => {
    fetchComments(0);
  }, [props.payload?.id])

  useEffect(() => {
    fetchSearchUserData();
  }, [mentionSearchWord])

  return (
    <ActionSheet id={props.sheetId}
      headerAlwaysVisible={true}
      isModal={true}
      onClose={() => SheetManager.hide(props.sheetId)}
      gestureEnabled={Platform.OS === 'ios'}
      keyboardHandlerEnabled={true}
      indicatorStyle={styles.indicator}
      enableGesturesInScrollView={Platform.OS === 'ios'}
      containerStyle={styles.container}
      animated
      drawUnderStatusBar={false}
      onSnapIndexChange={() => Keyboard.dismiss()}
    >
      <CustomText
        variant='h7'
        fontFamily={FONTS.SemiBold}
        style={styles.header}
      >
        Comments
      </CustomText>
      <View style={styles.divider} />

      {
        mentionSearchWord != null ? (
          <FlatList
            data={filterData || []}
            keyboardShouldPersistTaps='always'
            keyboardDismissMode='interactive'
            keyExtractor={(item: User) => item._id.toString()}
            renderItem={({ item }) => {
              return (
                <UserItem user={item} onPress={() => {
                  const dataMention = {
                    user: item,
                    replaceWord: mentionSearchWord,
                  }
                  setConfirmMention(dataMention);
                }} />
              )
            }}
            style={{ height: '100%', marginTop: 20 }}
          // ListFooterComponent={() => (
          //   <>
          //   {
          //     searchUserLoading && (

          //     )
          //   }
          //   </>
          // )}
          />
        ) : (null)
      }

    </ActionSheet>
  )
}

export default CommentSheet


const styles = StyleSheet.create({
  indicator: {
    height: 4,
    width: 40,
    top: 4,
    borderColor: Colors.border
  },
  divider: {
    height: 0.2,
    backgroundColor: Colors.border,
    width: '100%',
  },
  container: {
    backgroundColor: '#121212',
    height: screenHeight * 0.8
  },
  header: {
    alignSelf: 'center',
    marginVertical: 8,
  },
  input: {
    flex: 1,
    paddingHorizontal: 2,
    marginHorizontal: 10,
    color: Colors.text,
  },
  loading: {
    marginTop: 10,
  },
  inputContainer: {
    backgroundColor: '#1f1e1e',
    flexDirection: 'row',
    borderRadius: 10,
    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
    paddingHorizontal: 8,
    marginVertical: 15,
    marginHorizontal: 10,
    alignItems: 'center',
  }
})