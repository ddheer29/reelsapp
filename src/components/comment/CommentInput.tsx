import { Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import GIFIcon from "../../assets/icons/gif.png";
import { SheetManager } from 'react-native-actions-sheet';
import { useAppSelector } from '../../redux/reduxHook';
import { emojiListData } from '../../utils/staticData';
import CustomText from '../global/CustomText';
import { Colors } from '../../constants/Colors';
import { selectUser } from '../../redux/reducers/userSlice';
import { FONTS } from '../../constants/Fonts';

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

  const handleSelectionChange = (event: any) => {
    const cursorPos = event.nativeEvent.selection.start;
    setTimeout(() => {
      setCursorPosition(cursorPos);
    }, 100);
  }

  const handleSend = (res: string | null) => {
    if (res) {
      clearReplyTo();
      setMention('');
      setComment('');
      onPostComment({
        hasGif: true,
        gifUrl: res,
      })
      return;
    }
    onPostComment({
      comment,
      hasGif: false,
    })
    clearReplyTo();
    setMention('');
    setComment('');
  }

  const replaceMentionCursor = (
    text: string,
    replaceWord: string,
    newWord: string,
    cursorPos: number) => {
    const index = text.lastIndexOf(`@${replaceWord}`, cursorPos)
    if (index !== -1 && index < cursorPos) {
      return (
        text.slice(0, index) + `@${newWord}` + text.slice(index + replaceWord.length + 1)
      )
    }
    return text;
  }

  useEffect(() => {
    if (replyTo) {
      const mentionText = `@${replyTo.user?.username}`;
      setMention(mentionText);
      setComment(mentionText);
      textInputRef.current?.focus();
    } else {
      setMention('');
      setComment('');
    }
  }, [replyTo])

  useEffect(() => {
    const textBeforeCursor = comment.slice(0, cursorPosition);
    const match = textBeforeCursor.match(/(^|\s)@([a-zA-Z]*)$/);
    if (match) {
      const lastWord = match[2];
      setMentionSearchWord(lastWord);
    } else {
      setMentionSearchWord(null);
    }
  }, [cursorPosition])

  useEffect(() => {
    if (confirmMention !== null) {
      setComment(
        replaceMentionCursor(
          comment,
          confirmMention.replaceWord,
          confirmMention.user?.username,
          cursorPosition,
        )
      )
    }
  }, [confirmMention])

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
            {
              comment ? (
                <TouchableOpacity onPress={() => handleSend(null)}>
                  <Icon
                    name={comment ? 'send' : 'emoji-emotions'}
                    size={RFValue(20)}
                    color={Colors.text}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={async () => {
                    const res = await SheetManager.show("gif-sheet");
                    if (res) {
                      handleSend(res);
                    }
                  }}
                >
                  <Image source={GIFIcon} tintColor={Colors.lightText} style={styles.gifIcon} />
                </TouchableOpacity>
              )
            }
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
    padding: Platform.OS === 'ios' ? 10 : 0,
    alignItems: 'center',
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
  },
  gifIcon: {
    width: 23,
    height: 23,
  }
})