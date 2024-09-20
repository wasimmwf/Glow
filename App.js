// In App.js in a new project

import * as React from 'react';
// import { View, Text } from 'react-native';
import { View, TouchableOpacity, Image, PermissionsAndroid, ImageComponent } from "react-native";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../glow/src/pages/HomeScreen/HomeScreen';
import SessionScreen from './src/pages/SessionScreen';
import P5SessionScreen from './src/pages/P5SessionScreen';
import SFPSessionScreen from './src/pages/SFPSessionScreen';
import { Colors, Images } from './src/themes';
import * as RNFS from "react-native-fs";
import { EventRegister } from "react-native-event-listeners";

const Stack = createNativeStackNavigator();
// const phoneStorageDir = RNFS.ExternalStorageDirectoryPath + '/Glow/';
const GlowFolder = "/storage/emulated/0/Android/media/GLOW/";

const createAppFolder = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Permissions for write access',
        message: 'Give permission to your storage to write a file',
        buttonPositive: 'ok',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // await RNFS.mkdir(phoneStorageDir);
      isGlowFolderExist = await RNFS.exists(GlowFolder)
      if (!isGlowFolderExist) {
        await RNFS.mkdir(GlowFolder);
      }
    } else {
      console.log('permission denied');
      return;
    }
  } catch (err) {
    console.warn(err);
    return;
  }
}
const NavigationBackSctructure = () => {
  logout = () => {
    EventRegister.emit("BackListner", "Listen it works")
  };
  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity onPress={logout}>
        <Image
          resizeMode="contain"
          source={Images.SessionScreen.back}
          style={{ width: 25, height: 25, marginLeft: 5, marginRight: 10 }}
        />
      </TouchableOpacity>
    </View>
  );
}

function App() {
  createAppFolder()
  return (
    <NavigationContainer initialRouteName="HomeScreen">
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerTitleAlign: 'center',
            headerShown: false
          }}
        />
        <Stack.Screen
          name="SessionScreen"
          component={SessionScreen}
          options={{
            title: 'Session Screen',
            headerLeft: NavigationBackSctructure,
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: Colors.pmiBlue
            }
          }}
        />
        <Stack.Screen
          name="P5SessionScreen"
          component={P5SessionScreen}
          options={{
            title: 'P5 Session Screen',
            headerLeft: NavigationBackSctructure,
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: Colors.pmiBlue,
            }
          }}
        />
        <Stack.Screen
          name="SFPSessionScreen"
          component={SFPSessionScreen}
          options={{
            title: 'SFP Session Screen',
            headerLeft: NavigationBackSctructure,
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: Colors.pmiBlue
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
