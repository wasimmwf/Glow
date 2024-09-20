// In App.js in a new project

import * as React from 'react';
// import { View, Text } from 'react-native';
import { PermissionsAndroid ,Platform} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../glow/src/pages/HomeScreen/HomeScreen';
import SessionScreen from './src/pages/SessionScreen';
import P5SessionScreen from './src/pages/P5SessionScreen';
import SFPSessionScreen from './src/pages/SFPSessionScreen';
import { Colors } from './src/themes';
import * as RNFS from "react-native-fs";

const Stack = createNativeStackNavigator();
// const phoneStorageDir = RNFS.ExternalStorageDirectoryPath + '/Glow/';
const GlowFolder = "/storage/emulated/0/Android/media/GLOW/";

const createAppFolder = async () => {
  isGlowFolderExist = await RNFS.exists(GlowFolder)
  if (!isGlowFolderExist) {
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
        await RNFS.mkdir(GlowFolder);
      } else {
        console.log('permission denied');
        return;
      }
    } catch (err) {
      console.warn(err);
      return;
    }

  }
}

function App() {
  createAppFolder()
  return (
    <NavigationContainer initialRouteName="Glow">
      <Stack.Navigator>
        <Stack.Screen
          name="Glow"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SessionScreen"
          component={SessionScreen}
          options={{
            title: 'Session Screen',
            headerTintColor: '#fff',
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
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: Colors.pmiBlue
            }
          }}
        />
        <Stack.Screen
          name="SFPSessionScreen"
          component={SFPSessionScreen}
          options={{
            title: 'SFP Session Screen',
            headerTintColor: '#fff',
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
