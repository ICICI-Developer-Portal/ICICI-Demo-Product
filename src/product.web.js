import React, { Component } from "react";
import { View, Text, ScrollView, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";
import PinInput from 'react-pin-input';
import Loader from './components/loader.js'
import Blackout from './components/blackOut.js'
import TopNav from './TopNav'
import { ThemeProvider, Input } from "nachos-ui";
import { withRouter } from "react-router-dom";
import {
  MOBILE_NO_ERROR, USERID_ERROR, FIXED_OTP, OTP_ERROR,
  ENTER_MOB_NO, OR, ENTER_USERID, ENTER_OTP, CONFIRM_BTN
} from './constants/constants';
import styles from './components/commonCss'
import ApiService from '../src/services/api-services';

class Product extends Component {
  state = {
    windowHeight: Dimensions.get("window").height,
    windowWidth: Dimensions.get("window").width,
    loading: false,
    mobilenumber: '',
    UserID: '',
    otpmodal: false,
    otperror: '',
    mobileotp: '',
    mobilenoerror: '',
    useriderror: '',
  }

  handleResize = () => this.setState({
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth
  });

  componentDidMount() {
    if (this.props.navigation.state.params == undefined) {
      this.props.navigation.state.params = {}
    }
    const sessionKey = sessionStorage.getItem('sessionKey');
    if (window.addEventListener) {
      window.addEventListener('resize', this.handleResize)
      this.handleResize();
    }
  }

  componentWillMount() {
    this.props.navigation.state.params = {}
    this.props.changeBackground('#F36414');
  }

  componentWillUnmount() {
    if (window.removeEventListener) {
      window.removeEventListener('resize', this.handleResize)
    }
  }

  setValueMobileNumber = (value) => {
    if ((value.length <= 12) && (value >= 0)) {
      this.setState({ mobilenumber: value })
    }
  }

  setValueUserId = (value) => {
    this.setState({ UserID: value })
  }

  openOTPmodal = () => {
    this.setState({
      loading: true
    });
    if (((this.state.mobilenumber) == '') && (this.state.UserID) == '') {
      if ((this.state.mobilenumber) == '') {
        this.setState({
          mobilenoerror: MOBILE_NO_ERROR,
          loading: false
        })
      }
      if ((this.state.UserID) == '') {
        this.setState({
          useriderror: USERID_ERROR,
          loading: false
        })
      }
    }
    else {
      if ((this.state.mobilenumber).length || (this.state.UserID).length < 13) {
        this.setState({ otpmodal: true, mobilenoerror: '', useriderror: '' })
        var jdata = {
          MobileNo: this.state.mobilenumber,
          UserID: this.state.UserID
        }
        ApiService.auth
          .login(jdata)
          .then(data => {
            if (data.validateCustomRobo.sessionKey) {
              sessionStorage.setItem('sessionKey', data.validateCustomRobo.sessionKey);
              this.setState({
                loading: false,
              });
            }
          })
          .catch(error => {
            this.props.navigation.navigate("ErrorPage")
          });
      }
    }
  }

  phoneotp = (value) => {
    this.setState({ mobileotp: value, otperror: '' })
  }

  mobileOTPcheck = () => {
    var values = [];
    values.push(this.state.mobilenumber);
    values.push(this.state.UserID);
    if (this.state.mobileotp == FIXED_OTP) {
      this.props.navigation.navigate("LandingPage", { values })
    }
    else {
      this.setState({ otperror: OTP_ERROR })
    }
  }

  render() {
    const cardStyle = { minWidth: 800, width: '100%', color: 'white', alignSelf: 'center', borderRadius: 20 }
    var margin = 0;
    var font = 14;
    var flex = 0.33;
    var width = "80%"
    if (this.state.windowWidth < 980) {
      margin = 0;
      font = 12;
      fontTop: 25;
    } else {
      margin = 0
      font = 14;
      fontTop: 25;
      width = "90%"
    }


    return (
      <View>
        <TopNav />
        <ThemeProvider
          branding={{
            textColor: "#F45F10",
            accentColor: "red",
            alternateTextColor: "#fff",
            linkColor: "#7945ef",
            disabledColor: "#f9f9fa",
            disabledDarkColor: "#b1b2c1",
            successLightColor: "#e9f9f0",
            successColor: "white",
            passiveSuccessLightColor: "#d5dff7",
            passiveSuccessColor: "#2f61d5",
            dangerLightColor: "#ffe2dc",
            dangerColor: "#ff7052",
            primaryLightColor: "#e3d9fc",
            primaryColor: "black"
          }}>

          <Loader loading={this.state.loading} windowWidth={this.state.windowWidth} />
          <Blackout modalopenhide={this.state.modalopenhide} />
          <ScrollView style={{ backgroundColor: '#F36414' }}>
            <View style={style.login_container}>
              <View>
                <View style={(this.state.windowWidth > 767) ? style.productcontainer : style.mobileProductcontainer}>
                  <View style={style.productcontainerallign}>
                    <View style={style.productinnercontainer}>
                      <View>
                        <View style={style.productborder}>
                          {this.state.otpmodal === false ? (
                            <View>
                              <View style={style.productmobileheader_view}>
                                <Text style={style.productmobileheaderstyle}>{ENTER_MOB_NO}
                                </Text>
                              </View>
                              <View style={style.productinputView}>
                                <Input placeholder='Please Enter Your Mobile Number'
                                  style={{ borderTopColor: 'transparent', height: 50, backgroundColor: '#DCDCDC', borderLeftColor: 'transparent', borderRightColor: 'transparent', }}
                                  visible='true'
                                  name="mobilenumber"
                                  value={this.state.mobilenumber}
                                  onChangeText={value => this.setValueMobileNumber(value)}
                                  keyboardType="numeric"
                                  maxLength={15}
                                ></Input>
                                <View style={styles.error_msg} >
                                  <Text style={styles.error_text}>{this.state.mobilenoerror}</Text>
                                </View>
                              </View>
                              <View style={style.productmobileheader_view}>
                                <Text style={style.productmobileheaderstyles}>{OR}
                                </Text>
                              </View>
                              <View style={style.productmobileheader_view}>
                                <Text style={style.productmobileheaderstyle}>{ENTER_USERID}
                                </Text>
                              </View>
                              <View style={style.productinputView2}>
                                <Input placeholder='Please Enter Your User ID'
                                  style={{ borderTopColor: 'transparent', height: 50, backgroundColor: '#DCDCDC', borderLeftColor: 'transparent', borderRightColor: 'transparent', }}
                                  visible='true'
                                  name="UserId"
                                  value={this.state.UserID}
                                  onChangeText={value => this.setValueUserId(value)}
                                ></Input>
                                <View style={styles.error_msg} >
                                  <Text style={styles.error_text}>{this.state.useriderror}</Text>
                                </View>
                              </View>
                              <View style={style.productotp_ModalbuttonView}>
                                <TouchableOpacity onPress={() => { this.openOTPmodal() }} style={style.productmobileConfirmbutton}>
                                  <Text style={style.productConfirmtext}>{CONFIRM_BTN}</Text></TouchableOpacity>
                              </View>
                            </View>
                          ) : (
                              <View>
                                <View style={style.productmobileheader_view}>
                                  <Text style={style.productmobileheaderstyle}>{ENTER_OTP} </Text>
                                </View>
                                <View style={style.productinputView}>
                                  <View style={style.productcontainerallign}>
                                    <PinInput
                                      length={6}
                                      initialValue=""
                                      onChange={(value, index) => {
                                        this.phoneotp(value, index)
                                        this.setState({ otperror: '' })
                                      }}
                                      type="numeric"
                                      focus={1}
                                      style={{}}
                                      inputStyle={{ borderColor: 'transparent', backgroundColor: '#DCDCDC', width: 50, height: 50, marginTop: 2 }}
                                      inputFocusStyle={{ borderColor: 'black' }}
                                      onComplete={(value, index) => { }}
                                    />
                                    <View style={style.error_msg} >
                                      <Text style={styles.error_text}>{this.state.otperror}</Text>
                                    </View>
                                  </View>
                                </View>
                                <View style={style.productotp_ModalbuttonView}>
                                  <TouchableOpacity onPress={() => { this.mobileOTPcheck() }} style={style.productmobileConfirmbutton}>
                                    <Text style={style.productConfirmtext}>{CONFIRM_BTN}</Text></TouchableOpacity>
                                </View>
                              </View>
                            )}
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </ThemeProvider>
      </View>
    );
  }
}

const style = StyleSheet.create({
  login_container: {
    justifyContent: 'center',
    height: '80vh'
  },
  productcontainer: {
    marginBottom: 10,
    width: '60%',
    alignSelf: 'center'
  },
  mobileProductcontainer: {
    marginBottom: 10,
    width: '80%',
    alignSelf: 'center'
  },
  productcontainerallign: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  productinnercontainer: {
    width: '100%',
    height: 'auto',
    backgroundColor: '#fff',
    borderRadius: 10
  },
  productborder: {
    padding: '20px',
    margin: '20px'
  },
  productmobileheader_view: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 10
  },
  productmobileheaderstyle: {
    fontSize: 20,
    fontWeight: 600,
    fontFamily: 'sans-serif'
  },
  productmobileheaderstyles: {
    fontSize: 20,
    fontWeight: 600,
    fontFamily: 'sans-serif',
    color: '#a9a9a9'
  },
  productinputView: {
    marginTop: 20,
    marginBottom: 20
  },
  productotp_ModalbuttonView: {
    flexDirection: 'row',
    marginTop: 10,
    alignSelf: 'center'
  },
  productmobileConfirmbutton: {
    flex: 3,
    backgroundColor: '#00008b',
    borderColor: '#fff',
    height: 40,
    width: 150,
    cursor: 'pointer',
    marginTop: 20,
    alignContent: 'center',
    justifyContent: 'center'
  },
  productConfirmtext: {
    fontSize: 14,
    fontWeight: 500,
    textAlign: 'center',
    color: '#fff',
    padding: '8px 0',
    fontFamily: 'sans-serif'
  }
});

export default withRouter(Product);