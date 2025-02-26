import { ActivityIndicator, FlatList, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ActionSheet, { SheetManager, SheetProps } from 'react-native-actions-sheet'
import { screenHeight } from '../utils/Scaling'
import { Colors } from '../constants/Colors'
import CustomText from '../components/global/CustomText'
import { FONTS } from '../constants/Fonts'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { RFValue } from 'react-native-responsive-fontsize'
import { useAppDispatch } from '../redux/reduxHook'
import { getListLikes } from '../redux/actions/likeAction'
import UserItem from '../components/global/UserItem'

const LikeSheet = (props: SheetProps<"like-sheet">) => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    setLoading(true);
    const data = await dispatch(getListLikes(props.payload, search));
    setUsers(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchUsers();
  }, [props.payload?.entityId, search])

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
    >
      <CustomText variant='h7' fontFamily={FONTS.SemiBold} style={styles.header}>LikeSheet</CustomText>
      <View style={styles.inputContainer} >
        <Icon
          name='magnify'
          size={RFValue(15)}
          color={Colors.border}
        />
        <TextInput
          style={styles.input}
          placeholder='Search users'
          placeholderTextColor={Colors.border}
          value={search}
          onChangeText={setSearch}
        />
        {
          search !== '' && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Icon
                name='close-circle'
                size={RFValue(14)}
                color={Colors.border}
              />
            </TouchableOpacity>
          )
        }
      </View>
      {
        loading ? (
          <ActivityIndicator
            size={'small'}
            color={Colors.text}
            style={styles.loading}
          />
        ) : (
          <FlatList
            data={users}
            keyExtractor={(item: User) => item._id?.toString()}
            style={{ height: '100%' }}
            renderItem={({ item }) => <UserItem user={item} />}
          />
        )
      }
    </ActionSheet>
  )
}

export default LikeSheet

const styles = StyleSheet.create({
  indicator: {
    height: 4,
    width: 40,
    top: 4,
    borderColor: Colors.border
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