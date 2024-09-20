// Import libraries to create a component
import React, { Component } from "react";
import { Text, View, ImageBackground, Alert, TouchableHighlight, KeyboardAvoidingView, TextInput, Platform, AlertIOS, BackHandler, ScrollView, Dimensions, } from "react-native";

import Dropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';

import * as RNFS from "react-native-fs";
import Moment from "moment";
import { EventRegister } from "react-native-event-listeners";
import ZebraScanner from "@nextup/react-native-zebra-scanner";

// Themes and Styles
import styles from "./styles";
import { Images, Colors } from "../../themes";
import PackageJson from "../../../package";

const { width, height } = Dimensions.get("window");
// console.log('Dimension ', width, height);

const txtPathFolder = RNFS.DocumentDirectoryPath + "/ScannedTxt/";
const txtExternalFolder = "/storage/emulated/0/Android/media/GLOW/";

// Create a component
class SessionScreen extends Component {
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
      userNameFocus: false,
      descFoucus: false
    };
  }
  handleUserFocus = () => this.setState({ userNameFocus: true, descFoucus: false })
  handleDesFocus = () => this.setState({ descFoucus: true, userNameFocus: false })

  //Added to handle device back button
  handleBackButton = () => {
    return true
  }

  componentDidMount = () => {
    try {
      ZebraScanner.on('barcodeReadSuccess', event => {
        //console.log('Received data', event);
        //this.setState({ scannedData: event.data, referenceNo: event.data });
        this.setState({ barcodeScannedData: event.data });
        var scannedCode = event.data;
        if (
          scannedCode != "" &&
          this.state.isScanEnabled &&
          !this.state.isManualAllowed
        ) {
          scannedCode = scannedCode.replace("\r\n", "");
          scannedCode = scannedCode.replace("_", "");
          scannedCode = scannedCode.replace("+", "");
          scannedCode = scannedCode.replace("-", "");
          scannedCode = scannedCode.toUpperCase();
          //console.log("Wasim ->>  ",scannedCode.indexOf("3K"),scannedCode.indexOf("3S"))
          if (scannedCode.indexOf("3K") == 0 || scannedCode.indexOf("3S") == 0) {
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
      });
    } catch (error) {
      console.log('Device is not supported');
    }

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
    this.BackListner = EventRegister.addEventListener("BackListner", (data) => {
      Alert.alert(
        "Alert",
        "Do you want to save the file?",
        [
          { text: "CANCEL", onPress: () => { }, },
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
      this.props.navigation.navigate("HomeScreen");
    } else {
      RNFS.unlink(txtPathFolder + fileName)
        .then((success) => {
          this.props.navigation.navigate("HomeScreen");
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
          RNFS.unlink(txtPathFolder + fileName)
            .then((success) => {
              this.props.navigation.navigate("HomeScreen");
            })
            .catch((err) => {
              //console.log(err.message);
            });
        })
        .catch((err) => {
          console.log("Failed to copy file");
          console.log(err.message);
        });
    } else {
      if (this.state.sessionId == "") {
        this.props.navigation.navigate("HomeScreen");
      } else {
        RNFS.unlink(txtPathFolder + fileName)
          .then((success) => {
            this.props.navigation.navigate("HomeScreen");
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

  // Method to be triggered on click of Main Button
  btnStartSave = async () => {
    if (this.state.isStartSession) {
      var timeNow = new Date().getTime().toString();
      var DateNow = Moment(new Date()).format("DD-MM-YY");
      var fileName = timeNow + ".txt";
      console.log("Wasim ->> ",fileName,timeNow,DateNow)
      this.setState({
        isStartSession: false,
        sessionId: timeNow,
        isScanEnabled: true,
        isUserNameEnabled: false,
        isDescEnabled: false,
        isManualButtonEnabled: true,
        autFocus: true,
        userNameFocus: false,
        descFoucus: false
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
          { text: "NO", onPress: () => { }, style: "Cancel" },
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
          RNFS.unlink(txtPathFolder + fileName)
            .then((success) => {
              this.props.navigation.navigate("HomeScreen");
            })
            .catch((err) => {
              //console.log(err.message);
            });
        })
        .catch((err) => {
          console.log("Failed to copy file");
          console.log(err.message);
        });
    } else {
      if (this.state.sessionId == "") {
        this.props.navigation.navigate("HomeScreen");
      } else {
        RNFS.unlink(txtPathFolder + fileName)
          .then((success) => {
            this.props.navigation.navigate("HomeScreen");
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
    this.setState({ scanData: value.replace(/\s/g, '') });
  }
  onChangeUserText(value) {
    //Handling space
    if (value.indexOf(" ") != 0) {
      this.setState({ userName: value });
    }
  }
  onChangeDescText(value) {
    //Handling space
    if (value.indexOf(" ") != 0) {
      this.setState({ description: value });
    }
  }

  showAlert(msg) {
    if (msg == undefined) {
      msg = "Unknown error";
    }
    Alert.alert("Alert", msg, [
      {
        text: "Ok",
        onPress: () => { },
      },
    ]);
  }
  btnManual_Click = async () => {
    this.setState({
      isManualAllowed: true,
      isManualButtonEnabled: false,
      scanData: ""
    });
  };
  btnManualSave_Click = async () => {
    var mScanned = this.state.scanData;
    mScanned = mScanned.replace("\r\n", "");
    mScanned = mScanned.replace("_", "");
    mScanned = mScanned.replace("+", "");
    mScanned = mScanned.replace("-", "");
    mScanned = mScanned.toUpperCase();
    if (mScanned.indexOf("3K") == 0 || mScanned.indexOf("3S") == 0) {
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
                    data={this.state.arrMovementType}
                    //defaultButtonText={this.state.selectedMovType}
                    onSelect={(selectedItem, index) => {
                      this.onChangeTextPress(selectedItem.value)
                    }}
                    disabled={this.state.arrMovementType.length > 0 ? false : true}
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

                <Text style={styles.titleCaption}>{"User Name "}</Text>
                <View style={styles.valueContainer}>
                  <TextInput
                    //style={styles.textInput}
                    onFocus={this.handleUserFocus}
                    // style={this.state.isUserNameEnabled ? styles.textInput:styles.textInputGreyUserDesc}
                    style={this.state.userNameFocus ? styles.textInputFocus : styles.textInput}
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
                    style={this.state.descFoucus ? styles.textInputFocus : styles.textInput}
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
} //end of SessionScreen class

// Make the Component available to other parts of the application
export default SessionScreen;
