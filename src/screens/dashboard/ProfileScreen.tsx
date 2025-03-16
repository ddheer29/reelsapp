import { StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView'
import { Colors } from '../../constants/Colors'
import { Tabs, MaterialTabBar, CollapsibleRef } from "react-native-collapsible-tab-view";
import CustomGradient from '../../components/global/CustomGradient';
import ReelListTab from '../../components/profile/ReelListTab';
import ProfileDetails from '../../components/profile/ProfileDetails';
import { useAppSelector } from '../../redux/reduxHook';
import { selectUser } from '../../redux/reducers/userSlice';

const ProfileScreen = () => {
  const containerRef = useRef<CollapsibleRef>(null);
  const user = useAppSelector(selectUser);

  const MyTabs = [
    {
      name: "Reels",
      component: <ReelListTab />,
      icon: 'apps-sharp'
    },
    {
      name: "Liked",
      component: <ReelListTab />,
      icon: 'heart'
    },
    {
      name: "History",
      component: <ReelListTab />,
      icon: 'logo-tableau'
    },
  ]

  return (
    <CustomSafeAreaView style={styles.container}>
      <Tabs.Container
        ref={containerRef}
        lazy
        cancelLazyFadeIn
        revealHeaderOnScroll={true}
        renderHeader={() => <ProfileDetails user={user} />}
        headerContainerStyle={styles.noOpacity}
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