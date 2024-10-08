// Import Libraries
import {StyleSheet} from 'react-native';

// Themes
import {ApplicationStyles, Fonts, Colors, Metrics} from '../../themes';
import {colors} from 'react-native-elements';

// Create Stylesheet
const {...applicationStyles} = ApplicationStyles;
const styles = StyleSheet.create({
  ...applicationStyles,
  ...Fonts,
  logoContainer: {
    flex: 0.5,
    justifyContent: 'flex-start',
  },
  MainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  heeaderContainer: {
    flex: 0.08,
    flexDirection: 'row',
    //backgroundColor: Colors.pmiBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    //flex: 0.9,
    //flex:1,
    flex:0.80,
    flexDirection: 'column',
    //backgroundColor: '#FFF444'
  },
  valueContainer: {
    flex: 0.20,
    //  backgroundColor:Colors.darkGray
  },
  seperatorContainer: {
    flex: 0.05,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginRight: 20,
    // backgroundColor:Colors.white
  },
  passwordContainer: {
    flex: 0.2,
    flexDirection: 'row',
  },
  switchStyle: {
    marginTop: 0,
    marginRight: 2,
    //marginBottom:1
  },
  logo: {
    marginTop: 130,
    marginLeft: 100,
    width: '50%',
    height: '15%',
    resizeMode: 'contain',
  },
  icon: {
    marginLeft: 35,
    marginTop: 20,
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  dropdown: {
    // marginLeft:20,
    // marginTop: 0,
    // marginRight:12,
    // ...Fonts.description,
    // color: Colors.darkGray,
    marginTop: 4,
    marginLeft:5,
    ...Fonts.description,
    fontWeight: 'bold',
    color: Colors.black,
    height: '100%',
    // flex: 1,
    // flexDirection: 'row',
    // alignSelf: 'center',
    // justifyContent: 'space-between',
    // width: '100%',
    // borderRadius: 5,
    // backgroundColor: "#fff",
    // borderColor: '#ddd',
    // borderWidth: 1,
    // shadowColor: '#202020',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // elevation: 4
  },
  upperContainer: {
    flex: 0.45,
    //backgroundColor: Colors.darkGray
    //alignItems: 'center',
    // justifyContent: 'center',
  },
  dropdownContainer: {
    flex: 0.2,
    marginLeft: 20,
    marginRight: 20,
  },
  lowerContainer: {
    flex: 0.45,
    justifyContent: 'flex-start',
    //backgroundColor: Colors.darkGray
  },
  buttonContainer: {
    marginTop: 20,
  },
  loginBtnContainer: {
    flex: 0.25,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  loginBtnImage: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 35,
    height: 40,
    width: '85%',
    borderRadius: 5,
    position: 'absolute',
    //justifyContent: 'center',
  },
  buttonImage: {
    marginTop: 20,
    marginLeft: 35,
    height: 40,
    width: '85%',
    borderRadius: 5,
    //justifyContent: 'center',
    // alignItems: 'center'
  },
  text: {
    marginTop: 30,
    marginRight: 90,
    marginBottom: 1,
  },
  loginTextES: {
    //marginLeft:132,
    // marginRight:5,
    marginTop: 10,
    ...Fonts.description,
    color: Colors.white,
    //justifyContent: 'center',
    textAlign: 'center',
  },
  loginTextEN: {
    // marginLeft:165,
    // marginRight:5,
    marginTop: 10,
    ...Fonts.description,
    color: Colors.white,
    //justifyContent: 'center',
    textAlign: 'center',
  },
  textInputGrey: {
    flex:0.80,
    marginTop: 5,
    marginLeft: 10,
    marginBottom: 0,
    paddingBottom: 0,
    // textAlignVertical:'bottom',
    width: '98%',
    height: '70%',
    ...Fonts.description,
    fontWeight: 'bold',
    color: Colors.black,
    backgroundColor: Colors.gray,
    //borderColor: Colors.pmiBlue,
    borderColor: Colors.gray,
    borderWidth: 1,
    borderRadius: 5,
  },
  StartSession: {
    flex:0.20,
    marginLeft: 10,
    marginTop: 5,
    marginRight: 10,
    marginBottom: 0,
    paddingBottom: 0,
    alignItems: 'center',
    width: '40%',
    height: '70%',
    backgroundColor: Colors.white,
    borderRadius: 6,
    borderWidth: 1,
    //borderColor: '#f22b0c',
    borderColor: Colors.pmiBlue,
    justifyContent: 'center',
  },
  StartSessionText: {
    //color:'#1bb09d',
    color: Colors.pmiBlue,
    // marginTop:5,
    // marginLeft:8,
    // marginRight:8,
    // marginBottom:2,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textInput: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 0,
    paddingBottom: 0,
    // textAlignVertical:'bottom',
    width: '95%',
    height: '70%',
    ...Fonts.description,
    fontWeight: 'bold',
    color: Colors.black,
    //backgroundColor: Colors.white,
    backgroundColor: "transparent",
    //borderBottomWidth: 1,
    //borderBottomColor: Colors.pmiBlue,
    //borderColor: Colors.pmiBlue,
    borderColor: Colors.gray,
    borderWidth: 1,
    borderRadius: 5,
  },
  textInputFocus: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 0,
    paddingBottom: 0,
    // textAlignVertical:'bottom',
    width: '95%',
    height: '70%',
    ...Fonts.description,
    fontWeight: 'bold',
    color: Colors.black,
    //backgroundColor: Colors.white,
    backgroundColor: "transparent",
    //borderBottomWidth: 1,
    //borderBottomColor: Colors.pmiBlue,
    borderColor: Colors.pmiBlue,
    borderWidth: 1,
    borderRadius: 5,
  },
  textInputGreyUserDesc: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 0,
    paddingBottom: 0,
    // textAlignVertical:'bottom',
    width: '95%',
    height: '70%',
    ...Fonts.description,
    fontWeight: 'bold',
    color: Colors.black,
    //backgroundColor: Colors.white,
    //backgroundColor: "transparent",
    backgroundColor: Colors.gray,
    //borderBottomWidth: 1,
    //borderBottomColor: Colors.pmiBlue,
    borderColor: Colors.pmiBlue,
    borderWidth: 1,
    borderRadius: 5, 
  },
  textInputBarcode: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 0,
    paddingBottom: 0,
    // textAlignVertical:'bottom',
    width: '95%',
    //height: '88%',
    height: 88,
    ...Fonts.description,
    fontWeight: 'bold',
    color: Colors.black,
    backgroundColor: Colors.white,
    // backgroundColor: "transparent",
    // borderBottomWidth: 1,
    // borderBottomColor: Colors.pmiBlue,
    //borderColor: Colors.pmiBlue,
    borderColor: Colors.gray,
    borderWidth: 1,
    borderRadius: 5,
  },
  textInputBarcodeColored: {
    marginTop: 5,
    marginLeft: 5,
    marginBottom: 0,
    paddingBottom: 0,
    // textAlignVertical:'bottom',
    width: '98%',
    //height: '88%',
    height: 88,
    ...Fonts.description,
    fontWeight: 'bold',
    color: Colors.black,
    //backgroundColor: Colors.pmiBlue,
    backgroundColor: Colors.gray,
    //borderColor: Colors.pmiBlue,
    borderColor: Colors.gray,
    borderWidth: 1,
    borderRadius: 5,
  },
  passwordText: {
    marginTop: 10,
    marginLeft: 14,
    paddingBottom: 0,
    width: '60%',
    height: '70%',
    ...Fonts.description,
    color: Colors.white,
  },
  title: {
    textAlign: 'left',
    marginLeft: 20,
    marginTop: 0,
    marginRight: 0,
    ...Fonts.description,
    color: Colors.white,
  },
  versiontitle: {
    textAlign: 'center',
    ...Fonts.tag,
    color: Colors.white,
  },
  scannedMessageGreen: {
    flex:2,
    marginTop:15,
    //marginBottom:8,
    textAlign: 'center',
    ...Fonts.description,
    color: Colors.green,
  },
  scannedMessageRed: {
    flex:2,
    marginTop:15,
    //marginBottom:8,
    textAlign: 'center',
    ...Fonts.description,
    color: Colors.red,
  },
  usertitle: {
    marginLeft: 20,
    marginTop: 0,
    marginRight: 0,
    ...Fonts.description,
    color: Colors.black,
  },
  footerContainer: {
    // marginBottom: 20,
    // marginLeft: 0,
    // marginRight:0,
    textAlign: 'center',
    flex: 0.15,
    flexDirection: 'row',
  },
  infoContainer: {
    paddingBottom: 10,
    flex: 0.25,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  titleCaption: {
    textAlign: 'left',
    marginLeft: 10,
    marginTop: 5,
    marginRight: 0,
    ...Fonts.subDescription,
    color: Colors.black,
    fontFamily:'monospace'
  },

  titleValue: {
    textAlign: 'left',
    marginLeft: 0,
    marginTop: 4,
    marginRight: 0,
    ...Fonts.description,
    fontWeight: 'bold',
    color: Colors.black,
  },
  titleDetails: {
    //marginTop:20,
    ...Fonts.content,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
  },
  instruction: {
    //marginTop:20,
    ...Fonts.description,
    color: Colors.white,
    textAlign: 'center',
  },
  Cancel: {
    marginTop: 8,
    //marginBottom:12,
    marginLeft: 15,
    width: '30%',
    height: '50%',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    //borderColor: '#f22b0c',
    borderColor: Colors.pmiBlue,
    justifyContent: 'center',
  },
  CancelText: {
    //color:'#f22b0c',
    color: Colors.pmiBlue,
    // marginTop:5,
    // marginLeft:8,
    // marginRight:8,
    // marginBottom:2,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  Session: {
    marginTop: 8,
    //marginBottom:12,
    marginLeft: 15,
    width: '30%',
    height: '50%',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    //borderColor: '#1bb09d',
    borderColor: Colors.pmiBlue,
    justifyContent: 'center',
  },
  ButtonTxtStyle: {
    //color:'#1bb09d',
    color: Colors.pmiBlue,
    // marginTop:5,
    // marginLeft:8,
    // marginRight:8,
    // marginBottom:2,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  Manual: {
    flex:0.20,
    marginTop: 8,
    //marginBottom:12,
    alignItems: 'center',
    marginLeft: 10,
    width: '20%',
    height: '100%',
    backgroundColor: Colors.white,
    borderRadius: 6,
    borderWidth: 1,
    //borderColor: '#f22b0c',
    borderColor: Colors.pmiBlue,
    //justifyContent: 'center',
  },
  ManualText: {
    //color:'#1bb09d',
    color: Colors.pmiBlue,
    // marginTop:5,
    // marginLeft:8,
    // marginRight:8,
    // marginBottom:2,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  Reset: {
    marginTop: 8,
    //marginBottom:12,
    alignItems: 'center',
    marginLeft: 15,
    width: '30%',
    height: '50%',
    backgroundColor: Colors.pmiBlue,
    borderRadius: 6,
    borderWidth: 1,
    //borderColor: '#f22b0c',
    borderColor: Colors.pmiBlue,
    justifyContent: 'center',
  },
  ResetText: {
    //color:'#1bb09d',
    color: Colors.white,
    // marginTop:5,
    // marginLeft:8,
    // marginRight:8,
    // marginBottom:2,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  Save: {
    marginTop: 8,
    //marginBottom:12,
    alignItems: 'center',
    marginLeft: 15,
    width: '30%',
    height: '50%',
    backgroundColor: Colors.pmiBlue,
    borderRadius: 6,
    borderWidth: 1,
    //borderColor: '#f22b0c',
    borderColor: Colors.pmiBlue,
    justifyContent: 'center',
  },
  SaveText: {
    //color:'#1bb09d',
    color: Colors.white,
    // marginTop:5,
    // marginLeft:8,
    // marginRight:8,
    // marginBottom:2,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    //padding: 10,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 10,
    marginBottom: 10,
    //borderRadius: 5,
    // backgroundColor: '#FFF111',
    elevation: 2,
  },
  cancelBtnView: {
    flex: 0.3,
    flexDirection: 'column',
    backgroundColor: Colors.lightBlue,
    justifyContent: 'flex-end',
  },
  usernameView: {
    flex: 0.7,
    flexDirection: 'column',
    backgroundColor: Colors.lightBlue,
    justifyContent: 'flex-end',
  },
  userHeaderContainer: {
    flex: 0.1,
    flexDirection: 'row',
    backgroundColor: Colors.lightBlue,
    justifyContent: 'flex-end',
  },
  userContentContainer: {
    flex: 0.9,
    flexDirection: 'column',
    //backgroundColor: '#FFF444'
  },
  userCancel: {
    ...Fonts.subContent,
    marginBottom: 8,
    marginLeft: 4,
    width: 100,
    justifyContent: 'flex-start',
    color: Colors.white,
    textAlign: 'left',
  },
  titleHeader: {
    ...Fonts.subContent,
    marginBottom: 5,
    marginLeft: 5,
    width: 300,
    justifyContent: 'flex-end',
    color: Colors.white,
    fontWeight: 'bold',
  },
  dropdown1BtnStyle: {
    width: 360,
    height: 40,
    //borderBottomWidth: 1,
    //backgroundColor: Colors.cyanMain,
    backgroundColor: "transparent",
    // borderColor: Colors.cyan,
    borderColor: Colors.gray,
    borderWidth:1,
    marginRight: 0,
    borderRadius: 6
  },
  dropdown1BtnTxtStyle: {
    color: '#444',
    textAlign: 'left',
    fontSize: 17,
    marginLeft: 2,
    fontWeight:'400'
  },
  dropdown1DropdownStyle: {
    backgroundColor: '#EFEFEF'
  },
  dropdown1RowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5'
  },
  dropdown1RowTxtStyle: {
    color: '#444',
    textAlign: 'left',
    fontSize: 16
  }
});

// Make the styles available for AccountScreen
export default styles;
