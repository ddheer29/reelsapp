import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useState } from 'react'
import { Colors } from '../../constants/Colors';
import CommentSingleItem from './CommentSingleItem';
import { useAppDispatch } from '../../redux/reduxHook';
import { getReplies } from '../../redux/actions/commentAction';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../global/CustomText';

interface CommentItemProps {
  comment: Comment;
  user: User | undefined;
  onReply: (comment: Comment | SubReply, commentId: string | number) => void;
  scrollToParentComment: () => void;
  scrollToChildComment: (index: number) => void;
}

const CommentItem: FC<CommentItemProps> = ({
  comment,
  user,
  onReply,
  scrollToParentComment,
  scrollToChildComment
}) => {
  const dispatch = useAppDispatch();
  const [replies, setReplies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [offSet, setOffSet] = useState(0);

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

  const fetchReplies = async (scrollOffset: number, commentId: string) => {
    setLoading(true);
    const newData = await dispatch(getReplies(commentId, scrollOffset));
    const combinedData = [...replies, ...newData];
    setReplies(removeDuplicate(combinedData));
    setLoading(false);
  }

  const handleReply = (msg: any) => {
    onReply(msg, comment._id);
  }

  return (
    <View style={styles.commentContainer}>
      <View style={styles.textContainer}>
        <CommentSingleItem
          comment={comment}
          user={user}
          onReply={() => handleReply(comment)}
          scrollToComment={() => scrollToParentComment()}
        />
      </View>
      {comment?.repliesCount > 0 && (
        <View style={{ marginLeft: 40 }}>
          {replies?.map((reply, index) => (
            <CommentSingleItem
              isReply
              key={reply._id}
              user={user}
              comment={reply}
              onReply={() => handleReply(comment)}
              scrollToComment={() => scrollToChildComment(index)}
            />
          ))}
          {
            comment?.repliesCount - replies.length > 0 ? (
              <TouchableOpacity
                style={styles.flexRow}
                onPress={async () => {
                  setOffSet(offSet + 2);
                  await fetchReplies(offSet, comment._id);
                }}
              >
                <LinearGradient
                  colors={[
                    'rgba(0, 0, 0, 0)',
                    Colors.disabled,
                    'rgba(0, 0, 0, 0)',
                  ]}
                  style={styles.linearGradient}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                />
                <CustomText style={styles.viewRepliesText} variant='h9'>
                  Show {comment?.repliesCount - replies.length}{' '}
                  {comment?.repliesCount - replies.length > 1 ? 'replies' : 'reply'}
                </CustomText>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.flexRow}
                onPress={async () => {
                  setOffSet(0);
                  setReplies([]);
                }}
              >
                <LinearGradient
                  colors={[
                    'rgba(0, 0, 0, 0)',
                    Colors.disabled,
                    'rgba(0, 0, 0, 0)',
                  ]}
                  style={styles.linearGradient}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                />
                <CustomText style={styles.viewRepliesText} variant='h9'>
                  Hide Replies
                </CustomText>
              </TouchableOpacity>
            )
          }
          {loading && (
            <ActivityIndicator size="small" color={Colors.disabled} style={{ alignSelf: 'flex-start' }} />
          )}
        </View>
      )}
    </View>
  )
}

export default CommentItem

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: 'row',
    padding: 2,
  },
  textContainer: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  linearGradient: {
    width: 50,
    height: 1,
    top: 2,
  },
  viewRepliesText: {
    color: Colors.lightText,
    marginTop: 5,
  }
})