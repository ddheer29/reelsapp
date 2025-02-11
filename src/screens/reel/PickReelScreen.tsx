import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import CustomView from '../../components/global/CustomView'
import CustomHeader from '../../components/global/CustomHeader'
import PickerReelButton from '../../components/reel/PickerReelButton'

const PickReelScreen: FC = () => {
  return (
    <CustomView>
      <SafeAreaView style={styles.margin}>
        <CustomHeader title='New Reel' />
      </SafeAreaView>
      <View>
        <PickerReelButton />
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