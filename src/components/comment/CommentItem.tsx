import { StyleSheet, Text, View } from 'react-native'
import React, { FC, useState } from 'react'
import { Colors } from '../../constants/Colors';
import CommentSingleItem from './CommentSingleItem';

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
  const [replies, setReplies] = useState<any[]>([]);

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
              comment={comment}
              user={user}
              onReply={() => handleReply(comment)}
              scrollToComment={() => scrollToParentComment()}
            />
          ))}
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