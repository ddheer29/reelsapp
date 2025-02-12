import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { FC, useState } from 'react'
import CustomSafeAreaView from '../global/CustomSafeAreaView'
import CustomHeader from '../global/CustomHeader';
import { useRoute } from '@react-navigation/native';
import { Colors } from '../../constants/Colors';
import GradientButton from '../global/GradientButton';
import { goBack } from '../../utils/NavigationUtil';

interface uriData {
  thumb_uri: string;
  file_uri: string;
}

const UploadReelScreen: FC = () => {
  const data = useRoute()
  const item = data.params as uriData;
  console.log("🚀 ~ item:", item)
  const [caption, setCaption] = useState<string>('');

  return (
    <CustomSafeAreaView>
      <CustomHeader title='Upload' />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.flexRow}>
          <Image
            source={{ uri: item.thumb_uri }}
            style={styles.img}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            value={caption}
            placeholder='Enter your caption here...'
            placeholderTextColor={Colors.border}
            onChangeText={setCaption}
            multiline={true}
            numberOfLines={8}
          />
        </View>

        <GradientButton
          text='Upload'
          iconName='upload'
          onPress={() => goBack()}
        />
      </ScrollView>
    </CustomSafeAreaView>
  )
}

export default UploadReelScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    paddingHorizontal: 0,
    marginTop: 30,
    alignItems: 'center',
  },
  img: {
    width: '25%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  textArea: {
    height: 150,
    verticalAlign: 'top',
  },
  input: {
    height: 150,
    borderColor: 'gray',
    borderWidth: 1,
    color: Colors.text,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: '60%',
  }
})