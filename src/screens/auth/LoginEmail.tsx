import { ActivityIndicator, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView'
import { RFValue } from 'react-native-responsive-fontsize'
import CustomText from '../../components/global/CustomText'
import { Colors } from '../../constants/Colors'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { FONTS } from '../../constants/Fonts'
import GradientButton from '../../components/global/GradientButton'

const LoginEmail = () => {

  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [haveAccount, setHaveAccount] = useState<boolean>(false);

  const handleSubmit = () => {

  }

  return (
    <CustomSafeAreaView>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollViewContainer}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        extraScrollHeight={Platform.select({ ios: 120, android: 120 })}
      >

        {
          haveAccount && (
            <>
              <CustomText style={styles.label}>Full Name</CustomText>
              <TextInput
                style={styles.input}
                returnKeyType='next'
                value={fullName}
                placeholderTextColor={Colors.border}
                onChangeText={setFullName}
                placeholder='Enter full name'
                autoComplete='off'
              />
            </>
          )
        }

        <CustomText style={styles.label}>Email</CustomText>
        <TextInput
          style={styles.input}
          returnKeyType='next'
          value={email}
          placeholderTextColor={Colors.border}
          onChangeText={setEmail}
          placeholder='Enter email'
          keyboardType='email-address'
        />

        <CustomText style={styles.label}>Password</CustomText>
        <TextInput
          style={styles.input}
          returnKeyType='next'
          value={password}
          placeholderTextColor={Colors.border}
          onChangeText={setPassword}
          placeholder='Enter password'
          secureTextEntry={true}
        />

        <View style={{ marginVertical: 20 }}>
          <CustomText variant="h6" style={{ color: Colors.text }}>
            {haveAccount ? 'Alreay have a account?' : 'Create an account?'}
            <Text onPress={() => setHaveAccount((prev) => !prev)}>{' '}{haveAccount ? 'Login' : 'SignUp'}</Text>
          </CustomText>
        </View>

        {
          loading ? (
            <View style={styles.flexRow}>
              <ActivityIndicator size='small' color={Colors.text} />
              <CustomText variant='h8' fontFamily={FONTS.Medium}>
                {loadingMessage || 'Loading...'}
              </CustomText>
            </View>
          ) : (
            <GradientButton
              text="Let's dive in"
              iconName="swim"
              onPress={handleSubmit}
            />
          )
        }

      </KeyboardAwareScrollView>
    </CustomSafeAreaView>
  )
}

export default LoginEmail


const styles = StyleSheet.create({
  scrollViewContainer: {
    paddingBottom: 120,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  label: {
    alignSelf: 'flex-start',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  linearGradient: {
    flex: 1,
    height: 1,
  },
  cameraIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 10,
    borderRadius: 100,
    position: 'absolute',
    right: 10,
    bottom: 0,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    color: Colors.text,
    borderRadius: 5,
    fontFamily: FONTS.Medium,
    padding: 10,
    marginVertical: 10,
    width: '100%',
  },
  image: {
    width: 150,
    height: 150,
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderRadius: 200,
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 30,
  },
});
