import { StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/reduxHook'
import { selectUser } from '../../redux/reducers/userSlice'
import { refetchUser } from '../../redux/actions/userAction'
import { RFValue } from 'react-native-responsive-fontsize'
import { Colors } from '../../constants/Colors'

interface StatsDisplayProps {
  title: string;
  value: string;
}

const StatsDisplay: FC<StatsDisplayProps> = ({ title, value }) => {
  return (
    <View style={styles.statsContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  )
}

const StatsContainer = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const fetchUser = async () => {
    await dispatch(refetchUser())
  }

  useEffect(() => {
    fetchUser()
  })

  return (
    <View style={styles.container}>
      <StatsDisplay title='Followers' value={user?.followersCount} />
      <View style={styles.divider} />
      <StatsDisplay title='Following' value={user?.followingCount} />
      <View style={styles.divider} />
      <StatsDisplay title='Reels' value={user?.reelsCount} />
    </View>
  )
}

export default StatsContainer

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: -350,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: RFValue(30),
  },
  value: {
    fontSize: RFValue(60),
  },
  divider: {
    height: '100%',
    backgroundColor: Colors.disabled,
    width: 3,
    marginHorizontal: 80,
  },
})