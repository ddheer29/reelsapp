import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useMemo, useRef } from 'react'
import CustomText from '../global/CustomText';
import { times } from 'lodash';
import { Colors } from '../../constants/Colors';
import { RFValue } from 'react-native-responsive-fontsize';
import { useAppDispatch, useAppSelector } from '../../redux/reduxHook';
import { selectUser } from '../../redux/reducers/userSlice';
import { selectLikedComment, selectLikedReply } from '../../redux/reducers/likeSlice';
import { toggleLikeComment, toggleLikeReply } from '../../redux/actions/likeAction';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { SheetManager } from 'react-native-actions-sheet';
import { navigate } from '../../utils/NavigationUtil';
import { FONTS } from '../../constants/Fonts';
import { getRelativeTime } from '../../utils/dateUtils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';
import GIFLoader from '../../assets/animations/giphy.gif';

interface CommentSingleItemProps {
  comment: Comment | SubReply;
  isReply?: boolean;
  onReply: (comment: Comment | SubReply) => void;
  scrollToComment: () => void;
  user: User | undefined;
}

const CommentSingleItem: FC<CommentSingleItemProps> = ({
  comment,
  isReply,
  onReply,
  scrollToComment,
  user
}) => {
  console.log("🚀 ~ comment:", JSON.stringify(comment, null, 2))
  const dispatch = useAppDispatch();
  const me = useAppSelector(selectUser);
  const likedComment = useAppSelector(selectLikedComment);
  const likedReply = useAppSelector(selectLikedReply);

  const commentMeta = useMemo(() => {
    return {
      isLiked: likedComment?.find((ritem: any) => ritem.id === comment._id)?.isLiked ?? comment.isLiked,
      likesCount: likedComment?.find((ritem: any) => ritem.id === comment._id)?.likesCount ?? comment.likesCount,
    }
  }, [likedComment, comment._id]);

  const replyMeta = useMemo(() => {
    return {
      isLiked: likedReply?.find((ritem: any) => ritem.id === comment._id)?.isLiked ?? comment.isLiked,
      likesCount: likedReply?.find((ritem: any) => ritem.id === comment._id)?.likesCount ?? comment.likesCount,
    }
  }, [likedReply, comment._id]);

  const backGroundColor = useRef(new Animated.Value(0)).current;
  const startAnimation = () => {
    Animated.sequence([
      Animated.timing(backGroundColor, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(backGroundColor, {
        toValue: 0,
        duration: 4000,
        useNativeDriver: false,
      }),
    ]).start();
  }

  const handleReply = () => {
    onReply(comment);
    scrollToComment();
    startAnimation();
  }

  const backGroundColorInterpolate = backGroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', Colors.black],
  })

  const likeComment = async () => {
    'worklet';
    if (!isReply) {
      await dispatch(toggleLikeComment(comment._id, commentMeta?.likesCount));
      return;
    }
    await dispatch(toggleLikeReply(comment._id, commentMeta?.likesCount));
  }

  const doubleTap = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(2)
    .onStart(() => {
      likeComment();
    })
    .runOnJS(true);

  const multiAction = async () => {
    'worklet';
  }

  const longPress = Gesture.LongPress()
    .minDuration(750)
    .onStart(() => {
      multiAction();
    }).runOnJS(true);

  useEffect(() => {
    if (comment?.isPosting) {
      scrollToComment();
      startAnimation();
    }
  }, [comment?.isPosting])

  return (
    <GestureDetector gesture={Gesture.Exclusive(doubleTap, longPress)}>
      <Animated.View
        style={[
          styles.commentContainer,
          { backgroundColor: backGroundColorInterpolate }
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            SheetManager.hide("comment-sheet")
            navigate("UserProfileScreen", { username: comment?.user?.username })
          }}
        >
          <Image source={{ uri: comment?.user?.userImage }} style={styles.userImage} />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <View style={styles.flexRow}>
            <CustomText
              fontFamily={FONTS.SemiBold}
              variant='h9'
              style={styles.username}>
              {comment?.user?.username}
            </CustomText>
            <CustomText
              fontFamily={FONTS.Medium}
              variant='h9'
              style={styles.timeStamp}>
              {getRelativeTime(comment?.timestamp)}
            </CustomText>
            {comment?.isPinned && (
              <Icon name='pin'
                size={RFValue(10)}
                color={"#000"}
                style={{ transform: [{ rotate: '45deg' }] }}
              />
            )}
            {comment?.user?._id === user?._id && (
              <CustomText
                fontFamily={FONTS.Medium}
                variant='h9'
                style={styles.timeStamp}>
                * Author{' '}
              </CustomText>
            )}
            {comment?.isLikedByAuthor && (
              <>
                <CustomText
                  fontFamily={FONTS.Medium}
                  variant='h9'
                  style={styles.timeStamp}>
                  *
                </CustomText>
                <Icon
                  name='heart'
                  size={RFValue(10)}
                  color={"red"}
                />
                <CustomText
                  fontFamily={FONTS.Medium}
                  variant='h9'
                  style={styles.timeStamp}>
                  by author{' '}
                </CustomText>
              </>
            )}
          </View>
          <CustomText
            variant='h9'
            style={styles.commentText}>
            {isReply ? comment?.reply : comment?.comment}
          </CustomText>
          {comment?.hasGirf && (
            <FastImage
              source={{ uri: comment?.gifUrl, priority: FastImage.priority.high }}
              style={styles.gifImage}
              defaultSource={GIFLoader}
              resizeMode="cover"
            />
          )}
          {!comment?.isPosting ? (
            <TouchableOpacity
              onPress={handleReply}
              style={{ alignSelf: 'flex-start' }}
            >
              <CustomText
                fontFamily={FONTS.Medium}
                variant='h9'
                style={styles.timeStamp}
              >
                Reply
              </CustomText>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              disabled={true}
              onPress={handleReply}
              style={{ alignSelf: 'flex-start' }}
            >
              <CustomText
                fontFamily={FONTS.Medium}
                variant='h9'
                style={styles.timeStamp}
              >
                Posting...
              </CustomText>
            </TouchableOpacity>
          )}
          {!comment?.isPosting && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => likeComment()}
              onLongPress={() => {
                SheetManager.show("like-sheet", {
                  payload: {
                    entityId: comment?._id,
                    type: isReply ? 'reply' : 'comment',
                  }
                })
              }}
            >
              <Icon
                name={(isReply && replyMeta?.isLiked) || (!isReply && commentMeta?.isLiked) ? 'heart' : 'heart-outline'}
                size={RFValue(12)}
                color={(isReply && replyMeta?.isLiked) || (!isReply && commentMeta?.isLiked) ? Colors.like : Colors.lightText}
              />
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
    </GestureDetector>
  )
}

export default CommentSingleItem

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 6,
  },
  button: {
    position: 'absolute',
    right: 15,
    alignItems: 'center',
    justifyContent: 'center',
    top: 12,
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  flexRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  username: {},
  timeStamp: {
    color: Colors.lightText,
  },
  gifImage: {
    width: RFValue(170),
    height: RFValue(100),
    marginBottom: 5,
    aspectRatio: 4 / 3,
    borderRadius: 10,
  }
})