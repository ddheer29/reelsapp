import { Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { FC, useRef, useState } from 'react'
import { Colors } from '../constants/Colors';
import { emojiListData } from '../utils/staticData';
import CustomText from '../components/global/CustomText';
import FastImage from 'react-native-fast-image';
import { useAppSelector } from '../redux/reduxHook';
import { selectUser } from '../redux/reducers/userSlice';
import { FONTS } from '../constants/Fonts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';

interface CommentInputProps {
  replyTo: Comment | SubReply | null;
  clearReplyTo: () => void;
  onPostComment: (data: any) => void;
  confirmMention: any | null;
  setMentionSearchWord: (word: string | null) => void;
}

const CommentInput: FC<CommentInputProps> = ({
  replyTo,
  clearReplyTo,
  onPostComment,
  confirmMention,
  setMentionSearchWord
}) => {
  const textInputRef = useRef<TextInput>(null);
  const user = useAppSelector(selectUser);
  const [comment, setComment] = useState('');
  const [mention, setMention] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);

  const handleEmojiClick = (emoji: string) => {
    setComment(prev => prev + emoji);
  }

  const handleInputChange = (text: string) => {
    setComment(text);
  }

  const handleSelectionChange = (event: string) => {
    const cursorPos = event.nativeEvent.selection.start;
    setTimeout(() => {
      setCursorPosition(cursorPos);
    }, 100);
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        keyboardDismissMode='interactive'
        keyboardShouldPersistTaps='always'
      >
        {emojiListData?.map((i: string, index: number) => (
          <TouchableOpacity
            key={index}
            style={styles.emojiBtn}
            onPress={() => {
              handleEmojiClick(i);
            }}
          >
            <CustomText variant="h5">
              {i}
            </CustomText>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.subContainer}>
        <FastImage
          source={{ uri: user?.userImage }}
          style={styles.userImage}
        />
        <View style={[
          styles.inputContainer,
          {
            borderRadius: comment?.length < 35 && !replyTo ? 100 : 20
          }
        ]}>
          {replyTo && (
            <View style={styles.flexRowBetween}>
              <CustomText variant='h9' style={{ color: Colors.lightText }} fontFamily={FONTS.Regular}>
                Replying to {mention}
              </CustomText>
              <Icon
                name='close'
                size={RFValue(12)}
                color={Colors.lightText}
                onPress={() => clearReplyTo()}
              />
            </View>
          )}
          <View style={styles.flexRow}>
            <TextInput
              ref={textInputRef}
              style={styles.input}
              placeholder='Add a comment...'
              placeholderTextColor={Colors.border}
              multiline={true}
              keyboardAppearance='dark'
              keyboardType='email-address'
              verticalAlign='middle'
              onChangeText={handleInputChange}
              onSelectionChange={handleSelectionChange}
            />
            {/* {
              comment ? (null) : (
                <TouchableOpacity>

                </TouchableOpacity>
              )
            } */}
          </View>
        </View>
      </View>
    </View>
  )
}

export default CommentInput

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Platform.OS === 'ios' ? 10 : 0,
  },
  input: {
    width: '86%',
    paddingHorizontal: 2,
    maxHeight: 100,
    marginRight: 10,
    bottom: Platform.OS === 'ios' ? 2 : 0,
    color: Colors.text,
  },
  container: {
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopWidth: 0.5,
    borderTopColor: Colors.lightText
  },
  emojiBtn: {
    marginTop: 4,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginRight: 10,
  },
  inputContainer: {
    borderColor: Colors.lightText,
    borderWidth: Platform.OS === 'ios' ? 0.5 : 0.8,
    width: '80%',
    paddingHorizontal: 2,
    overflow: 'hidden',
    alignItems: 'center',
  },
  flexRowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#080707',
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: Colors.lightText,
    justifyContent: 'space-between'
  }
})