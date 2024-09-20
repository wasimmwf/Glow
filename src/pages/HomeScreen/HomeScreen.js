// Import libraries to create a component
import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableHighlight, NativeModules } from 'react-native';

const { PermissionFile } = NativeModules;

// Themes and Styles
import { Colors, Fonts } from '../../themes';
import PackageJson from '../../../package.json';
import * as RNFS from "react-native-fs";
import Dropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
const GlowFolder = "/storage/emulated/0/Android/media/GLOW/";

// Create a component
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //loading: false,
      arrProductType: [],
      selectedSessionType: "CC Product",
      selectedIndex: 0
    }
  }

  componentDidMount = async () => {

    // await PermissionFile.checkAndGrantPermission(
    //   err => {
    //     console.log(err.message);
    //   },
    //   res => {
    //     RNFS.exists(GlowFolder).then((folderExist) => {
    //       if (folderExist) {
    //         //console.log('folder exist ->> ', folderExist);
    //       } else {
    //         RNFS.mkdir(GlowFolder)
    //           .then((isDirectoryCreated) => {
    //             //console.log('DirectoryCreated');
    //           })
    //           .catch((err) => {
    //             console.log(err.message);
    //           });
    //       }
    //     });
    //   },
    // )
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
          <View style={{ flexDirection: 'column', alignContent: 'flex-start', flex: 0.3, marginTop: 40 }}>
            <Dropdown
              data={this.state.arrProductType}
              defaultButtonText={"CC Product"}
              onSelect={(selectedItem, index) => {
                this.setState({ selectedSessionType: selectedItem.value, selectedIndex: index })
              }}
              disabled={this.state.arrProductType.length > 0 ? false : true}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
              renderDropdownIcon={isOpened => {
                return <Icon name={isOpened ? 'caret-up' : 'caret-down'} color={'#444'} size={20} />;
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem.value
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item.value
              }}
            />
          </View>
          <TouchableHighlight
            style={styles.Create}
            underlayColor="#fff"
            onPress={() => {
              (this.state.selectedIndex == 1) ? this.props.navigation.navigate("P5SessionScreen") :
                (this.state.selectedIndex == 2) ? this.props.navigation.navigate("SFPSessionScreen") :
                  this.props.navigation.navigate("SessionScreen")
            }
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
    marginLeft: 85,
    width: '50%',
    height: '8%',
    backgroundColor: Colors.cyanMain,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.lightCyan,
    justifyContent: 'center',
    alignItems: 'center'
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
  dropdown1BtnStyle: {
    width: 360,
    height: 40,
    //borderBottomWidth: 1,
    backgroundColor: Colors.cyanMain,
    borderColor: '#1bb09d',
    marginRight: 0,
    borderRadius: 6
  },
  dropdown1BtnTxtStyle: {
    color: '#444',
    textAlign: 'center',
    fontSize: 17,
    marginLeft: 5,
    fontWeight: '500'
  },
  dropdown1DropdownStyle: {
    backgroundColor: '#EFEFEF'
    //backgroundColor: 'transparent'
  },
  dropdown1RowStyle: {
    backgroundColor: '#EFEFEF',
    // backgroundColor: Colors.lightCyan,
    borderBottomColor: '#C5C5C5'
  },
  dropdown1RowTxtStyle: {
    color: '#444',
    textAlign: 'center',
    fontSize: 16
  }
});

// Make the Component available to other parts of the application
export default HomeScreen;
