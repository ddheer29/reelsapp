import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomView from '../../components/global/CustomView'
import CustomHeader from '../../components/global/CustomHeader'

const PickReelScreen = () => {
  return (
    <CustomView>
      <SafeAreaView style={styles.margin}>
        <CustomHeader title='New Reel' />
      </SafeAreaView>
      <View>

      </View>
    </CustomView>
  )
}

export default PickReelScreen

const styles = StyleSheet.create({
  margin: {
    margin: 10,
  }
})