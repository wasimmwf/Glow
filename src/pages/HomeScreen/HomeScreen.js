// Import libraries to create a component
import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ImageBackground,
  TouchableHighlight,
  PermissionsAndroid,
  Switch,
  Platform,
  NativeModules
} from 'react-native';

const { PermissionCheck } = NativeModules;
const { PermissionFile } = NativeModules;

// Themes and Styles
import { Images, Colors, Fonts } from '../../themes';
import PackageJson from '../../../package.json';
import * as RNFS from "react-native-fs";
import { Dropdown } from "react-native-material-dropdown";
//const GlowFolder = RNFS.ExternalStorageDirectoryPath + "/GLOW/";
// const GlowFolder = "/storage/emulated/0/Android/media/{$packagename}" + "/GLOW/";
const GlowFolder = "/storage/emulated/0/Android/media/GLOW/";

// Create a component
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //loading: false,
      isSwitchOn: false,
      arrProductType: [],
      selectedSessionType: "CC Product",
      selectedIndex: 0
    }
  }

  componentDidMount = async () => {

    //   PermissionsAndroid.request(
    //     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    // ).then(granted => {
    //    //console.log("granted ->>> ",granted)
    //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //       //console.log("Glow Folder ->> ",GlowFolder)
    //       RNFS.exists(GlowFolder).then((folderExist) => {
    //         if (folderExist) {
    //           //console.log('folder exist ->> ', folderExist);
    //         } else {
    //           RNFS.mkdir(GlowFolder)
    //             .then((isDirectoryCreated) => {
    //               //console.log('DirectoryCreated');
    //             })
    //             .catch((err) => {
    //               console.log(err.message);
    //             });
    //         }
    //       });
    //     } else {
    //         alert("No permission granted. Please allow storage permission.");
    //     }
    // }).catch(e => console.warn(e));

    // };
    // PermissionCheck.getAvailablePermissions().then(dictPermissionList => {
    //   var arrPermission = dictPermissionList["PermissionList"];
    //   console.log('Wasim ->>> ',arrPermission);
    //   //console.log("Glow Folder ->> ",GlowFolder)
    //   RNFS.exists(GlowFolder).then((folderExist) => {
    //     if (folderExist) {
    //       //console.log('folder exist ->> ', folderExist);
    //     } else {
    //       RNFS.mkdir(GlowFolder)
    //         .then((isDirectoryCreated) => {
    //           //console.log('DirectoryCreated');
    //         })
    //         .catch((err) => {
    //           console.log(err.message);
    //         });
    //     }
    //   });
    // }).catch(e => console.warn(e));

    // var ext = RNFS.ExternalStorageDirectoryPath
    // var tem = RNFS.TemporaryDirectoryPath
    // console.log('Wasim Path ->>>>>', ext,tem)

    // try {
    //   const granted = await PermissionsAndroid.requestMultiple([
    //     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //     PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    //   ]);
    // } catch (err) {
    //   console.warn(err);
    // }
    // const readGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE); 
    // const writeGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

    // if(!readGranted || !writeGranted ) {
    //   console.log('Read and write permissions have not been granted');
    //   return;
    // }else
    // {
    //   RNFS.exists(GlowFolder).then((folderExist) => {
    //     if (folderExist) {
    //       //console.log('folder exist ->> ', folderExist);
    //     } else {
    //       RNFS.mkdir(GlowFolder)
    //         .then((isDirectoryCreated) => {
    //           //console.log('DirectoryCreated');
    //         })
    //         .catch((err) => {
    //           console.log(err.message);
    //         });
    //     }
    //   });
    // }

    await PermissionFile.checkAndGrantPermission(
      err => {
        console.log(err.message);
      },
      res => {
        RNFS.exists(GlowFolder).then((folderExist) => {
          if (folderExist) {
            //console.log('folder exist ->> ', folderExist);
          } else {
            RNFS.mkdir(GlowFolder)
              .then((isDirectoryCreated) => {
                //console.log('DirectoryCreated');
              })
              .catch((err) => {
                console.log(err.message);
              });
          }
        });
      },
    )
  };


  toggleSwitch = value => {
    //onValueChange of the Admin switch this function will be called, state changes according to switch
    console.log("Switch Value ->> ", value)
    this.setState({ isSwitchOn: value })
  };

  // Render Method
  render() {

    this.state.arrProductType = [
      {
        value: "CC Product", //Index = 0
      },
      {
        value: "P5 Product", //Index = 1
      },
      {
        value: "SFP Product",//Index = 2 
      }
    ]

    return (
      // <View >
      //    <HomeScreen />
      // </View>
      <ImageBackground
        source={require('../../assets/images/MapBackground.png')}
        style={{ width: '100%', height: '100%' }}>
        <View style={styles.container}>
          <View style={styles.welcome}>
            <Text style={styles.welcomeTxt}></Text>
          </View>
          {/* <TouchableHighlight style={styles.Create} underlayColor="#fff" onPress ={() => this.props.navigation.navigate("Session")}>
              <Text style={[styles.ButtonTxtStyle]}>{'Create'}</Text>
            </TouchableHighlight> */}

          {/* <Text style={styles.titleCaption}>{"Select Product Type "}</Text> */}
          <View style={{ flexDirection: 'column', alignContent: 'flex-start' , flex:0.3,marginTop:40}}>
            {/* <Text style={styles.P5Decription}>{"Switch to P5 Product"}</Text>
            <Switch trackColor={{ true: '#FFE800',false: Platform.OS == 'android' ? '#d3d3d3' : '#fbfbfb' }}
              //thumbColor={'#FFD100'}
              ios_backgroundColor="#fbfbfb"
              onValueChange={this.toggleSwitch}
              value={this.state.isSwitchOn}
              style={styles.switchStyle}
            /> */}
              <Dropdown
                style={styles.dropdown}
                data={this.state.arrProductType}
                value={this.state.selectedSessionType}
                onChangeText={(value,index) => this.setState({ selectedSessionType: value, selectedIndex: index})}
              />
          </View>

          {/* <TouchableHighlight style={styles.Create} underlayColor="#fff" onPress ={() => this.props.navigation.push("P5SessionScreen")}> */}
          {/* <TouchableHighlight style={styles.Create} underlayColor="#fff" onPress={() => { this.state.isSwitchOn ? this.props.navigation.push("P5SessionScreen") : this.props.navigation.push("SessionScreen") }}> */}
          <TouchableHighlight 
            style={styles.Create} 
            underlayColor="#fff" 
            onPress={ () => { 
              (this.state.selectedIndex  == 1)  ? this.props.navigation.push("P5SessionScreen") :
              (this.state.selectedIndex  == 2)  ? this.props.navigation.push("SFPSessionScreen") :
              this.props.navigation.push("SessionScreen") }
              }>
            <Text style={[styles.ButtonTxtStyle]}>{'Create'}</Text>
          </TouchableHighlight>

        </View>
        <Text style={styles.versiontitle}>
          {'Version : '}{PackageJson.version}
        </Text>
      </ImageBackground>
    );
  }
} //end of HomeScreen class
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  welcome: {
    flex: 0.50,
    alignItems: 'center',
  },
  welcomeTxt: {
    fontSize: 24,
    textAlign: 'center',
    margin: 10,
    alignItems: 'center',
  },
  Create: {
    //marginTop: 8,
    //marginBottom:12,
    marginLeft: 85,
    width: '50%',
    height: '8%',
    backgroundColor: Colors.cyanMain,
    borderRadius: 6,
    borderWidth: 1,
    //borderColor: '#1bb09d',
    borderColor: Colors.lightCyan,
    justifyContent: 'center',
    alignItems:'center'
  },
  ButtonTxtStyle: {
    //color:'#1bb09d',
    color: Colors.black,
    // marginTop:5,
    // marginLeft:8,
    // marginRight:8,
    // marginBottom:2,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  P5Decription: {
    //flex:0.6,
    marginBottom: 20,
    marginRight: 2,
    textAlign: 'center',
    ...Fonts.description,
    color: Colors.white,
    //marginBottom:1
  },
  switchStyle: {
    //flex:0.3,
    //marginTop: 20,
    marginBottom: 20,
    marginTop: 0,
    marginRight: 0,
    //marginBottom:10
  },
  versiontitle: {
    marginBottom: 20,
    textAlign: 'center',
    ...Fonts.tag,
    color: Colors.white,
  },
  titleCaption: {
    flex: 0.20,
    textAlign: 'left',
    marginLeft: 10,
    marginTop: 5,
    marginRight: 0,
    ...Fonts.subDescription,
    color: Colors.white,
    fontFamily: 'monospace'
  },
  dropdown: {
    marginTop: 4,
    marginLeft: 5,
    ...Fonts.description,
    fontWeight: 'bold',
    color: Colors.white,
    height: '100%',
    textAlign:'center',
    borderRadius: 5,
    backgroundColor: "transparent",
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: 'transparent',
    borderBottomColor:'transparent'
  },
});

// Make the Component available to other parts of the application
export default HomeScreen;
