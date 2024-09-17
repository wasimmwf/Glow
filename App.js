// In App.js in a new project

import * as React from 'react';
// import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../glow/src/pages/HomeScreen/HomeScreen';
import SessionScreen from './src/pages/SessionScreen';
import P5SessionScreen from './src/pages/P5SessionScreen';
import SFPSessionScreen from './src/pages/SFPSessionScreen';



// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer initialRouteName="Glow" >
      <Stack.Navigator>
        <Stack.Screen name="Glow" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SessionScreen" component={SessionScreen} />
        <Stack.Screen name="P5SessionScreen" component={P5SessionScreen} />
        <Stack.Screen name="SFPSessionScreen" component={SFPSessionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;