// Import libraries to create a component
import { useEffect } from "react";
import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
  TouchableHighlight,
  KeyboardAvoidingView,
  TextInput,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  AlertIOS,
  BackHandler,
  ScrollView,
  //LogBox,
  PermissionsAndroid,
  Dimensions,
} from "react-native";

// PermissionsAndroid.request(
//   PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
// );

import { Dropdown } from "react-native-material-dropdown";
//import { Dropdown } from "react-native-material-dropdown-v2"

import * as RNFS from "react-native-fs";
//import FileUpload from 'react-native-file-upload'
//var FileUpload = require('NativeModules').FileUpload;
import { NativeModules } from "react-native";
const { FileUpload } = NativeModules;
import Moment from "moment";
import { EventRegister } from "react-native-event-listeners";
import ZebraScanner from "react-native-zebra-scanner";
import { DeviceEventEmitter } from "react-native";

//import SSHClient from 'react-native-ssh-sftp';

// let client = new SSHClient('https://qatransfer.pconnect.biz/', 22, 'isms_fr_dev', '2f36sc', (error) => {
//   if (error)
//     console.warn(error);
// });

// Themes and Styles
import styles from "./styles";
import { Images, Colors } from "../../themes";
import PackageJson from "../../../package";

const { width, height } = Dimensions.get("window");
// console.log('Dimension ', width, height);

const txtPathFolder = RNFS.DocumentDirectoryPath + "/P5ScannedTxt/";
//const txtExternalFolder = RNFS.ExternalStorageDirectoryPath + "/";
//const txtExternalFolder = RNFS.ExternalStorageDirectoryPath + "/GLOW/";
//const txtExternalFolder = "/storage/emulated/0/Android/media/{$packagename}" + "/GLOW/";
const txtExternalFolder = "/storage/emulated/0/Android/media/GLOW/";

// Create a component
class P5SessionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrMovementType: [],
      sessionId: "",
      userName: "",
      isUserNameEnabled: true,
      description: "",
      isDescEnabled: true,
      prevScanData: "",
      scanData: "",
      isScanEnabled: false,
      scanCount: 0,
      isStartSession: true,
      isManualAllowed: false,
      isManualButtonEnabled: false,
      selectedMovType: "Select Movement Type",
      //isResetEnable: true,
      autFocus: false,
      selection: [],
      scanDataArray: [],
      scans: [],
      barcodeScannedData: "",
      message: "",
      isSuccess: false,
      userNameFocus:false,
      descFoucus:false
    };
  }
  handleUserFocus = () => this.setState({userNameFocus: true,descFoucus:false})
  handleDesFocus = () => this.setState({descFoucus: true,userNameFocus:false})
  //Added to handle device back button
  handleBackButton = () => {

    // const pushAction = StackActions.push({
    //   routeName: 'DefaultSelections',
    // });

    // this.props.navigation.dispatch(pushAction);
    return true
  }

  componentDidMount = () => {
    const scanListener = (scannedCode) => {
      //console.log("scannedCode-->", scannedCode);
      this.setState({ barcodeScannedData: scannedCode });
      if (
        scannedCode != "" &&
        this.state.isScanEnabled &&
        !this.state.isManualAllowed
      ) {
        //console.log("Sacnned QR Code ->>  ",scannedCode, scannedCode.length)
        //scannedCode = scannedCode.replace("\r\n", "");
        scannedCode = scannedCode.replace("\u001d", "");
        //console.log("Sacnned QR Code after replace ->>  ",scannedCode, scannedCode.length)
        //console.log("Sacnned QR Code after replace ->>  ",scannedCode.substring(0,16), scannedCode.substring(16,36),scannedCode.substring(36,scannedCode.length))
        // scannedCode = scannedCode.substring(0,16) + '-' + scannedCode.substring(16,36) + '-' + scannedCode.substring(36,scannedCode.length)
        //console.log("Sacnned QR Code final ->>  ",scannedCode, scannedCode.length)
        if (scannedCode.includes("240M") == true && scannedCode.length >= 50 && scannedCode.length < 60) {
          //Parse with separator 
          //scannedCode = scannedCode.substring(0,16) + '-' + scannedCode.substring(16,36) + '-' + scannedCode.substring(36,39)+ '-' + scannedCode.substring(39,scannedCode.length)
          scannedCode = scannedCode.substring(0,16) + '-' + scannedCode.substring(16,26) + '-' + scannedCode.substring(26,36) + '-'+ scannedCode.substring(36,39)+ '-' + scannedCode.substring(39,scannedCode.length)
          //Read File txt file
          var fileName = this.state.sessionId + ".txt";
          RNFS.readFile(txtPathFolder + fileName, "utf8")
            .then((content) => {
              if (content.includes(scannedCode) == true) {
                //this.showAlert("Already Scaned " + scannedCode);
                this.setState({
                  barcodeScannedData: "",
                  isSuccess: false,
                  message: "Already Scaned " + scannedCode,
                });
              } else {
                var TimeNow = Moment(new Date()).format("hh:mm A");
                //write the file
                RNFS.appendFile(
                  txtPathFolder + fileName,
                  "\n" + scannedCode + ";" + TimeNow + ";A",
                  "utf8"
                )
                  .then((success) => {
                    //File is appended
                    //this.showAlert("Scanned Successfully.");
                    if (this.state.scanData == "") {
                      this.setState({
                        scanCount: this.state.scanCount + 1,
                        barcodeScannedData: "",
                        scanData: scannedCode,
                        isSuccess: true,
                        message: "Scanned Successfully.",
                      });
                    } else {
                      this.setState({
                        scanCount: this.state.scanCount + 1,
                        barcodeScannedData: "",
                        scanData: this.state.scanData + "\n" + scannedCode,
                        isSuccess: true,
                        message: "Scanned Successfully.",
                      });
                    }
                  })
                  .catch((err) => {
                    console.log(err.message);
                  });
              }
            })
            .catch((err) => {
              console.log(err.message);
            });
        } else {
          this.setState({
            barcodeScannedData: "",
            isSuccess: false,
            message: "Invalid barcode. ",
          });
        }
      }
      //console.log("scannedCode-1->", this.state.scannedData);
    };
    ZebraScanner.addScanListener(scanListener);

    RNFS.exists(txtPathFolder).then((folderExist) => {
      if (folderExist) {
        //console.log('folder exist ->> ', folderExist);
      } else {
        RNFS.mkdir(txtPathFolder)
          .then((isDirectoryCreated) => {
            //console.log('isDirectoryCreated ->> ', isDirectoryCreated);
          })
          .catch((err) => {
            //console.log(err.message);
          });
      }
    });
    // this.BackListner = EventRegister.addEventListener("BackListner", (data) => {
    //   Alert.alert(
    //     "Alert",
    //     "Are you sure you want to Close?",
    //     [
    //       { text: "NO", onPress: () => null, style: "Cancel" },
    //       { text: "YES", onPress: () => this.onClose_Yes() },
    //     ],
    //     { cancelable: false }
    //   );
    // });
    this.BackListner = EventRegister.addEventListener("BackListner", (data) => {
      Alert.alert(
        "Alert",
        "Do you want to save the file?",
        [
          { text: "CANCEL", onPress: () => {}, },
          { text: "NO", onPress: () => this.onClose_Yes() },
          { text: "YES", onPress: () => this.onBackSave_Yes() },
        ],
        { cancelable: false }
      );
    });
    //Added to handle device back button
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  };
  onClose_Yes = async () => {
    //console.log('onClose_Yes');
    var fileName = this.state.sessionId + ".txt";

    if (this.state.sessionId == "") {
      this.props.navigation.push("HomeScreen");
    } else {
      RNFS.unlink(txtPathFolder + fileName)
        .then((success) => {
          this.props.navigation.push("HomeScreen");
        })
        .catch((err) => {
          //console.log(err.message);
        });
    }
  };
  onBackSave_Yes = async () => {
    //console.log('onSave_Yes');
    var fileName = this.state.sessionId + ".txt";

    if (this.state.scanCount > 0) {
      RNFS.copyFile(txtPathFolder + fileName, txtExternalFolder + fileName)
        .then((success) => {
          //this.showAlert(fileName + ' File saved successfully');
          //this.showAlert("File saved successfully.");
          RNFS.unlink(txtPathFolder + fileName)
            .then((success) => {
              this.props.navigation.push("HomeScreen");
            })
            .catch((err) => {
              //console.log(err.message);
            });
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      if (this.state.sessionId == "") {
        this.props.navigation.push("HomeScreen");
      } else {
        RNFS.unlink(txtPathFolder + fileName)
          .then((success) => {
            this.props.navigation.push("HomeScreen");
          })
          .catch((err) => {
            //console.log(err.message);
          });
      }
    }
  };

  componentWillUnmount() {
    EventRegister.removeEventListener(this.BackListner);
  }

  // initiateSessionScreenInformation() {
  //   var arrSystemValues = [];
  // }

  // Method to be triggered on click of Main Button
  btnStartSave = async () => {
    if (this.state.isStartSession) {
      var timeNow = new Date().getTime().toString();
      var DateNow = Moment(new Date()).format("DD-MM-YY");
      var fileName = "P5" + timeNow + ".txt";
      //console.log("Wasim ->> ",timeNow,DateNow)
      this.setState({
        isStartSession: false,
        sessionId: "P5" + timeNow,
        isScanEnabled: true,
        isUserNameEnabled: false,
        isDescEnabled: false,
        isManualButtonEnabled: true,
        autFocus: true,
        userNameFocus:false,
        descFoucus:false
        //selectedMovType:this.state.arrMovementType[0].value
      });
      //Write file
      await RNFS.writeFile(
        txtPathFolder + fileName,
        timeNow +
          ";" +
          this.state.selectedMovType +
          ";" +
          this.state.userName +
          ";" +
          this.state.description +
          ";" +
          DateNow,
        "utf8"
      );
    } else {
      //Close Session
      Alert.alert(
        "glow",
        "Are you sure you want to Save?",
        [
          { text: "NO", onPress: () => {}, style: "Cancel" },
          { text: "YES", onPress: () => this.onSave_Yes() },
        ],
        { cancelable: false }
      );
    }
  };
  onSave_Yes = async () => {
    //console.log('onSave_Yes');
    var fileName = this.state.sessionId + ".txt";

    if (this.state.scanCount > 0) {
      RNFS.copyFile(txtPathFolder + fileName, txtExternalFolder + fileName)
        .then((success) => {
          //this.showAlert(fileName + ' File saved successfully');
          //this.showAlert("File saved successfully.");
          RNFS.unlink(txtPathFolder + fileName)
            .then((success) => {
              this.props.navigation.push("HomeScreen");
              // setTimeout(() => { //Hang Issue
              //   BackHandler.exitApp();
              // }, 600000);
            })
            .catch((err) => {
              //console.log(err.message);
            });
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      if (this.state.sessionId == "") {
        this.props.navigation.push("HomeScreen");
        // setTimeout(() => {
        //   BackHandler.exitApp();
        // }, 10000);
      } else {
        RNFS.unlink(txtPathFolder + fileName)
          .then((success) => {
            this.props.navigation.push("HomeScreen");
            // setTimeout(() => {//Hang Issue
            //   BackHandler.exitApp();
            // }, 600000);
          })
          .catch((err) => {
            //console.log(err.message);
          });
      }
    }
  };

  onChangeTextPress(value) {
    this.setState({ selectedMovType: value });
  }
  handleSelectionChange = (event) => {
    this.setState({ selection: event.nativeEvent.selection });
  };
  onChangeScannedTextPress(value) {
    this.setState({ scanData: value.replace(/\s/g,'') });
    //Handling space
    // if (value.indexOf(" ") != 0) {
    //   this.setState({ scanData: value});
    // }
  }
  onChangeUserText(value) {
    //this.setState({ userName: value.replace(/\s/g,'') });
    //Handling space
    if (value.indexOf(" ") != 0) {
      this.setState({ userName: value});
    }
  }
  onChangeDescText(value) {
    //this.setState({ description: value.replace(/\s/g,'') });
    //Handling space
    if (value.indexOf(" ") != 0) {
      this.setState({ description: value});
    }
  }

  showAlert(msg) {
    if (msg == undefined) {
      msg = "Unknown error";
    }
    if (Platform.OS === "android") {
    }
    (Platform.OS === "android" ? Alert : AlertIOS).alert("Alert", msg, [
      {
        text: "Ok",
        onPress: () => {},
      },
    ]);
  }
  btnManual_Click = async () => {
    this.setState({
      isManualAllowed: true,
      isManualButtonEnabled: false,
      //barcodeScannedData: this.state.scanData,
      scanData:""
    });
  };
  btnManualSave_Click = async () => {
    var mScanned = this.state.scanData;
    // console.log("Sacnned QR Code ->>  ",scannedCode, scannedCode.length)
    // scannedCode = scannedCode.replace("\r\n", "");
    // scannedCode = scannedCode.replace("\n", "");
    if (mScanned.includes("240M") == true && mScanned.length >= 50 && mScanned.length < 60) {
      var fileName = this.state.sessionId + ".txt";
       //Read File
        RNFS.readFile(txtPathFolder + fileName, "utf8")
            .then((content) => {
              if (content.includes(mScanned) == true) {
                //this.showAlert("Already Scaned " + mScanned);
                this.setState({
                  isSuccess: false,
                  message: "Already Scaned " + mScanned,
                });
              } else {
                var TimeNow = Moment(new Date()).format("hh:mm A");
                //write the file
                RNFS.appendFile(
                  txtPathFolder + fileName,
                  "\n" + mScanned + ";" + TimeNow + ";M",
                  "utf8"
                )
                  .then((success) => {
                    //File is appended
                    //this.showAlert("Scanned Successfully.");
                    this.setState({
                      scanCount: this.state.scanCount + 1,
                      scanData: "",
                      isManualButtonEnabled: true,
                      isManualAllowed: false,
                      isSuccess: true,
                      message: "Scanned Manually.",
                    });
                  })
                  .catch((err) => {
                    console.log(err.message);
                  });
              }
            })
            .catch((err) => {
              console.log(err.message);
            });
    } else {
      this.setState({
        isSuccess: false,
        message: "Invalid barcode. ",
      });
    }
  };

  // Render Method
  render() {
    //console.log(' In render');
    //CHG20197663:New movement code addition.
    this.state.arrMovementType = [
      {
        value: "101 Good Receipt",
      },
      {
        value: "102 Good Receipt Cancelation",
      },
      {
        value: "201 Good Issuance",
      },
      {
        value: "202 Good Issuance Cancelation",
      },
      {
        value: "221 Consumption for project from Warehouse",
      },
      {
        value: "261 GI for order",
      },
      {
        value: "309 TF tfr.ps.mat.to mat",
      },
      {
        value: "311 TF tfr. Within Plant",
      },
      {
        value: "322 TR quality to unr.",
      },
      {
        value: "323 TF quality in plant",
      },
      {
        value: "343 Transfer Posting (un-restricted)",
      },
      {
        value: "344 Transfer Posting (Blocked)",
      },
      {
        value: "350 QI to Block",
      },
      {
        value: "555 Write off",
      },
      {
        value: "601 Stock Invoicing",
      },
      {
        value: "602 Stock Cancelation",
      },
      {
        value: "641 Outbound Delivery (Good Issuance)",
      },
      {
        value: "642 Outbound Delivery (Good Issuance) Cancelation",
      },
    ];

    return (
      <View>
        <KeyboardAvoidingView>
          <ImageBackground
            source={Images.SessionScreen.background}
            style={{ width: "100%", height: "100%" }}
          >
            <View style={styles.contentContainer}>
              <ScrollView>
                <Text style={styles.titleCaption}>{"Session ID "}</Text>
                <View style={styles.valueContainer}>
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    <TextInput
                      style={styles.textInputGrey}
                      editable={false}
                      value={this.state.sessionId}
                    ></TextInput>
                    {/* {this.state.userName.length > 0 && */}
                    {this.state.userName.length > 0 && this.state.selectedMovType != "Select Movement Type" &&
                    this.state.description.length > 0 ? (
                      <TouchableHighlight
                        style={styles.StartSession}
                        underlayColor="#fff"
                        onPress={this.btnStartSave}
                      >
                        <Text style={[styles.StartSessionText]}>
                          {this.state.isStartSession ? "Start" : "Save"}
                        </Text>
                      </TouchableHighlight>
                    ) : null}
                  </View>
                </View>

                <Text style={styles.titleCaption}>{"Movement Type "}</Text>
                <View style={styles.valueContainer}>
                  <Dropdown
                    style={styles.dropdown}
                    //label={this.state.selectedMovType}
                    data={this.state.arrMovementType}
                    disabled={!this.state.isStartSession}
                    //valueExtractor={({ value }) => value}
                    //onChangeText={(value) => { this.onChangeTextPress('value', value) }}
                    value={this.state.selectedMovType}
                    onChangeText={(value) => this.onChangeTextPress(value)}
                  />
                </View>

                <Text style={styles.titleCaption}>{"User Name "}</Text>
                <View style={styles.valueContainer}>
                  <TextInput
                    //style={styles.textInput}
                    onFocus={this.handleUserFocus}
                    // style={this.state.isUserNameEnabled ? styles.textInput:styles.textInputGreyUserDesc}
                    style={this.state.userNameFocus ? styles.textInputFocus :styles.textInput}
                    editable={this.state.isUserNameEnabled}
                    value={this.state.userName}
                    placeholder="Enter User Name"
                    //onChangeText={(userName) => this.setState({ userName })}
                    onChangeText={(value) => this.onChangeUserText(value)}
                    onSubmitEditing={() => { this.secondTextInput.focus(); }}
                    blurOnSubmit={false}
                  ></TextInput>
                </View>

                <Text style={styles.titleCaption}>{"Description "}</Text>
                <View style={styles.valueContainer}>
                  <TextInput
                    //style={styles.textInput}
                    onFocus={this.handleDesFocus}
                    // style={this.state.isDescEnabled ? styles.textInput:styles.textInputGreyUserDesc}
                    style={this.state.descFoucus ? styles.textInputFocus :styles.textInput}
                    editable={this.state.isDescEnabled}
                    value={this.state.description}
                    placeholder="Enter Description"
                    //onChangeText={(description) =>this.setState({ description })}
                    onChangeText={(value) => this.onChangeDescText(value)}
                    ref={(input) => { this.secondTextInput = input; }}
                  ></TextInput>
                </View>
                {/* {this.state.isScanEnabled ? ( */}
                <View>
                  <Text style={styles.titleCaption}>{"Barcode "}</Text>
                  <View style={styles.valueContainer}>
                    {
                      this.state.isManualAllowed ?
                      <TextInput
                      style={
                        !this.state.scanData == ""
                          ? styles.textInputBarcodeColored
                          : styles.textInputBarcode
                      }
                      editable={true}
                      value={this.state.scanData}
                      onChangeText={(value) =>
                        this.onChangeScannedTextPress(value)
                      }
                    ></TextInput>
                      :
                        // <View pointerEvents="none">
                        <View >
                          <TextInput
                            style={
                              !this.state.scanData == ""
                                ? styles.textInputBarcodeColored
                                : styles.textInputBarcode
                            }
                            //caretHidden={true}//Hide Cursor Pointer
                            multiline={true}
                            numberOfLines={3}
                            scrollEnabled={true}
                            editable={false}
                            value={this.state.scanData}
                          ></TextInput>
                        </View>


                    }
                  </View>
                </View>
                {/* ) : null} */}
              </ScrollView>
            </View>

            <View style={{ flex: 0.2 }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                {!this.state.isManualButtonEnabled ? (
                  <View style={{ flex: 0.2 }}></View>
                ) : (
                  <TouchableHighlight
                    style={styles.Manual}
                    underlayColor="#fff"
                    onPress={this.btnManual_Click}
                  >
                    <Text style={[styles.ManualText]}> {"Manual"}</Text>
                  </TouchableHighlight>
                )}
                {!this.state.isManualAllowed ? (
                  <View style={{ flex: 0.2 }}></View>
                ) : (
                  <TouchableHighlight
                    style={styles.Manual}
                    underlayColor="#fff"
                    onPress={this.btnManualSave_Click}
                  >
                    <Text style={[styles.ManualText]}> {"Save"}</Text>
                  </TouchableHighlight>
                )}
                {/* {this.state.isScanEnabled ? ( */}
                <Text
                  style={{
                    flex: 0.5,
                    textAlign: "right",
                    marginTop: 8,
                    marginRight: 10,
                  }}
                >
                  {"Scan Count : "}
                  {this.state.scanCount}
                </Text>
                {/* ) : null} */}
              </View>

              <Text
                style={
                  this.state.isSuccess
                    ? styles.scannedMessageGreen
                    : styles.scannedMessageRed
                }
              >
                {this.state.message}
              </Text>
            </View>
          </ImageBackground>
        </KeyboardAvoidingView>
      </View>
    );
  }
} //end of P5SessionScreen class

// Make the Component available to other parts of the application
export default P5SessionScreen;
