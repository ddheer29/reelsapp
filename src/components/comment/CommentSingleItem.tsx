import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import CustomText from '../global/CustomText';

interface CommentSingleItemProps {
  comment: Comment | SubReply;
  isReply?: boolean;
  onReply: (comment: Comment | SubReply) => void;
  scrollToComment: () => void;
  user: User | undefined;
}

const CommentSingleItem: FC = ({
  comment,
  isReply,
  onReply,
  scrollToComment,
  user
}) => {
  return (
    <View>
      <CustomText>{comment?.comment}</CustomText>
    </View>
  )
}

export default CommentSingleItem

const styles = StyleSheet.create({})