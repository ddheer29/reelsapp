import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useMemo } from 'react'
import FastImage from 'react-native-fast-image';
import { useAppDispatch, useAppSelector } from '../../redux/reduxHook';
import { selectUser } from '../../redux/reducers/userSlice';
import { Colors } from '../../constants/Colors';
import CustomText from '../global/CustomText';
import { FONTS } from '../../constants/Fonts';
import { selectFollowing } from '../../redux/reducers/followingSlice';
import { toggleFollow } from '../../redux/actions/userAction';

interface UserDetailsProps {
  user: any;
}

const UserDetails: FC<UserDetailsProps> = React.memo(({ user }) => {
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector(selectUser)
  const followingUsers = useAppSelector(selectFollowing)

  const isFollowing = useMemo(() => {
    return (
      followingUsers?.find((item: any) => {
        item?.id === user._id;
      })?.isFollowing ?? user?.isFollowing
    )
  }, [followingUsers, user._id, user.isFollowing]);

  const handleFollow = async () => {
    await dispatch(toggleFollow(user._id));
  }

  return (
    <View>
      <TouchableOpacity style={styles.flexRow}>
        <FastImage
          source={{ uri: user?.userImage, priority: FastImage.priority.high }}
          style={styles.img}
          resizeMode={FastImage.resizeMode.cover}
        />
        <CustomText variant='h8' fontFamily={FONTS.Medium}>
          {user?.username}
        </CustomText>
        {loggedInUser?.id !== user?._id && (
          <TouchableOpacity
            onPress={handleFollow}
            style={[
              styles.follow,
              {
                backgroundColor: isFollowing ? 'transparent' : Colors.white,
                borderWidth: isFollowing ? 1 : 0,
                borderColor: isFollowing ? Colors.disabled : Colors.white,
              }
            ]}
          >
            <CustomText variant='h9' fontFamily={FONTS.Medium} style={{ color: isFollowing ? Colors.white : Colors.black }}>
              {isFollowing ? 'Unfollow' : 'Follow'}
            </CustomText>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  )
})

export default UserDetails

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  img: {
    width: 35,
    height: 35,
    borderRadius: 100,
  },
  follow: {
    borderWidth: 1,
    borderColor: Colors.text,
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: Colors.white,
  }
})