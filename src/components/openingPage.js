import React, { Component } from "react";
import { View, Text, ScrollView, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./../style.css";
import Loader from './loader.js'
import Blackout from './blackOut.js'
import TopNav from './../TopNav'
import { ThemeProvider } from "nachos-ui";
import { withRouter } from "react-router-dom";
import { MUTUAL_FUNDS, START_BTN, WELCOME_TO_TEXT, ICICI_API_BANKING } from "../constants/constants";

class openingPage extends Component {
 
  state = {
    windowHeight: Dimensions.get("window").height,
    windowWidth: Dimensions.get("window").width,
    loading: false,
    otpmodal: false,
  }
 
  handleResize = () => this.setState({
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth
  });
 
 
  componentWillMount() {
    this.props.navigation.state.params = {}
    this.props.changeBackground('#F36414');
    }
 
  componentWillUnmount() {
    if (window.removeEventListener) {
      window.removeEventListener('resize', this.handleResize)
    }
  }
 

 
  openProductpage = () => {
    this.setState({
      loading: true
    });  
    this.props.navigation.navigate("product", this.props.navigation.state.params)
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
 
        <Loader loading={this.state.loading} windowWidth={this.state.windowWidth}/>
        <Blackout modalopenhide={this.state.modalopenhide} />
        <ScrollView style={{ backgroundColor: '#F36414' }}>
          <View style={style.login_container}>
            <View>
              <View style={(this.state.windowWidth > 767) ? style.productcontainer : style.mobileProductcontainer}>
                <View style={style.productcontainerallign}>
                  <View style={style.productinnercontainer}>
                    <View>
                      <View style={style.productborder}>
                          <View>
                            <View style={style.productmobileheader_view}>
                              <Text style={style.productmobileheaderstyleWelcome}>{WELCOME_TO_TEXT}
                                </Text>
                                <Text style={style.productmobileheaderstylefirst}>{ICICI_API_BANKING}
                                </Text>
                                <Text style={style.productmobileheaderstylesecond}>{MUTUAL_FUNDS}
                                </Text>
                            </View>
                            <View style={style.productotp_ModalbuttonView}>
                              <TouchableOpacity onPress={() => { this.openProductpage() }} style={style.productmobileConfirmbutton}>
                                <Text style={style.productConfirmtext}>{START_BTN}</Text></TouchableOpacity>
                            </View>
                          </View>
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
    height :'80vh'
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
  productmobileheaderstylefirst: {
    fontSize: 20,
    fontWeight: 600,
    fontFamily: 'sans-serif',
    marginBottom: '1%'
  },
  productmobileheaderstylesecond: {
    fontSize: 20,
    fontWeight: 600,
    fontFamily: 'sans-serif',
    marginBottom: '1%'
  },
  productmobileheaderstyleWelcome: {
    fontSize: 20,
    fontWeight: 600,
    fontFamily: 'sans-serif',
    marginBottom: '6%'
  },
  productmobileheaderstyles: {
    fontSize: 18,
    fontWeight: 600,
    fontFamily: 'sans-serif',
    color: '#a9a9a9',
    marginBottom: '4%'
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
 
export default withRouter(openingPage);