import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView'
import { Colors } from '../../constants/Colors'
import { Tabs, MaterialTabBar, CollapsibleRef } from "react-native-collapsible-tab-view";
import CustomGradient from '../../components/global/CustomGradient';
import ReelListTab from '../../components/profile/ReelListTab';
import ProfileDetails from '../../components/profile/ProfileDetails';
import { useAppSelector } from '../../redux/reduxHook';
import { selectUser } from '../../redux/reducers/userSlice';
import Icon from 'react-native-vector-icons/Ionicons'
import { RFValue } from 'react-native-responsive-fontsize';

const ProfileScreen = () => {
  const containerRef = useRef<CollapsibleRef>(null);
  const user = useAppSelector(selectUser) as User;
  const [focusedIndex, setFocusedIndex] = useState(0);

  const MyTabs = [
    {
      name: "Reels",
      component: <ReelListTab user={user} type="post" />,
      icon: 'apps-sharp'
    },
    {
      name: "Liked",
      component: <ReelListTab user={user} type="liked" />,
      icon: 'heart'
    },
    {
      name: "History",
      component: <ReelListTab user={user} type="watched" />,
      icon: 'logo-tableau'
    },
  ]

  const handleSetIndex = (newIndex: number) => {
    setFocusedIndex(newIndex);
    containerRef.current?.setIndex(newIndex);
  }

  return (
    <CustomSafeAreaView style={styles.container}>
      <Tabs.Container
        ref={containerRef}
        lazy
        cancelLazyFadeIn
        revealHeaderOnScroll={true}
        renderHeader={() => <ProfileDetails user={user} />}
        headerContainerStyle={styles.noOpacity}
        pagerProps={{
          onPageSelected: event => {
            setFocusedIndex(event.nativeEvent.position)
          },
          removeClippedSubviews: true
        }}
        renderTabBar={props => (
          <MaterialTabBar
            {...props}
            activeColor={Colors.white}
            inactiveColor={Colors.disabled}
            tabStyle={{ backgroundColor: Colors.background }}
            style={{
              backgroundColor: Colors.background,
              borderTopWidth: 1,
              borderColor: Colors.background
            }}
            indicatorStyle={styles.indicatorStyle}
            TabItemComponent={({ index, name, ...rest }) => {
              return (
                <TouchableOpacity key={index} style={styles.tabBar} onPress={() => handleSetIndex(index)}>
                  <Icon
                    name={MyTabs[index].icon}
                    size={RFValue(20)}
                    color={focusedIndex === index ? Colors.text : Colors.inactive_tint}
                  />
                </TouchableOpacity>
              )
            }}
          />
        )}
        containerStyle={{
          backgroundColor: Colors.background,
          paddingVertical: 0,
          elevation: 0,
          shadowColor: 'transparent',
          shadowOpacity: 0,
        }}
      >
        {
          MyTabs.map((item, index) => {
            return (
              <Tabs.Tab key={index} name={item.name}>
                {item.component}
              </Tabs.Tab>
            )
          })
        }
      </Tabs.Container>
      <CustomGradient position='bottom' />
    </CustomSafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    overflow: 'hidden',
    paddingTop: 10,
    paddingVertical: 0,
    color: Colors.background,
  },
  indicatorStyle: {
    backgroundColor: "white",
    height: 0.8,
  },
  noOpacity: {
    shadowOpacity: 0,
    elevation: 0,
    borderWidth: 0,
  },
  tabBar: {
    width: '33%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  }
})