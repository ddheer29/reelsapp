import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomView from '../../components/global/CustomView'
import CustomGradient from '../../components/global/CustomGradient'
import GlobalFeed from '../../components/feed/GlobalFeed'
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView'

const HomeScreen = () => {
  return (
    <CustomSafeAreaView>
      <GlobalFeed />
    </CustomSafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})