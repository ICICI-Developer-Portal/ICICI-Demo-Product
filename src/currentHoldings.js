import React, { Component } from "react";
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";
import Loader from './components/loader.js'
import Blackout from './components/blackOut.js'
import TopSection from './components/topSection.js'
import { ThemeProvider } from "nachos-ui";
import TopNav from './TopNav';
import ApiService from '../src/services/api-services';
import {
  CURRENT_HOLDINGS, CURRENT_FUND_VALUE_AMT, CLIENT_CODE, USER_ID,
  NAV_VALUE, FUND_TYPE, ABSOLUTE_RETURN, INVESTMENT_AMT, SCHEME_NAME, BANC_ACC_N0
} from './constants/constants';


class currentHoldings extends Component {
  state = {
    windowHeight: Dimensions.get("window").height,
    windowWidth: Dimensions.get("window").width,
    loading: false,
    dataSource: [],
    totalInvestment: ''
  }

  componentDidMount() {
    this.setState({
      loading: true
    });
    if (this.props.navigation.state.params == undefined) {
      this.props.navigation.state.params = {}
    }
    if (window.addEventListener) {
      window.addEventListener('resize', this.handleResize)
      this.handleResize();
    }
    var currentHoldingsData = {
      "ClientCode": CLIENT_CODE,
      "infinityId": USER_ID,
      "AccountId": BANC_ACC_N0,
      "Source_Platform": "Mobile",
      "Is_Retail_Flag": "1"
    }
    ApiService.auth
      .fetchportfolioService(currentHoldingsData)
      .then(data => {
        if (data) {
          this.setState({
            loading: false,
            dataSource: data.getportfoliomf.dataDetails.data.scheme,
            totalInvestment: data.getportfoliomf.dataHead.grandTotal
          });
        }
      })
      .catch(error => {
        this.props.navigation.navigate("ErrorPage")
      });
  }

  componentWillMount() {
    this.props.changeBackground('#F36414');
  }

  handleResize = () => this.setState({
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth
  });

  componentWillUnmount() {
    if (window.removeEventListener) {
      window.removeEventListener('resize', this.handleResize)
    }
  }

  selectedAccount() {
    this.props.navigation.navigate("fundDetails", this.props.navigation.state.params)
  }
  back = () => {
    this.props.navigation.navigate('LandingPage', this.props.navigation.state.params)
  }

  homepage = () => {
    this.props.navigation.navigate("LandingPage", this.props.navigation.state.params)
  }


  render() {
    const { dataSource } = this.state;
    const cardStyle = { minWidth: 800, width: '100%', color: 'white', alignSelf: 'center', borderRadius: 20 }
    var margin = 0;
    var font = 14;
    var flex = 0.33;
    var width = "80%"
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
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
        <TopNav navigation={this.props.navigation} />
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
          <Loader loading={this.state.loading} />
          <Blackout modalopenhide={this.state.modalopenhide} />
          <ScrollView style={{ backgroundColor: '#F36414' }}>
            <View className="currentholding_container">
              <TopSection back={() => { this.back() }}></TopSection>
              <View>
                {this.state.windowWidth > 600 ? (
                  <View className="currentholdingcontainer">
                    <View className="currentholdingcontainerallign" >
                      <View className="currentholdinginnercontainer">
                        <View className="currentholdingborder" >
                          <View className="Landingallignment" style={{ marginBottom: 30 }}>
                            <Text className="productmobileheaderstyle" >{CURRENT_HOLDINGS}</Text>
                          </View>
                          <ScrollView>
                            <View>
                              {dataSource.map((item, index) => {
                                return (
                                  <View>
                                    <View className="currentholdingHeaderView" >
                                      <View className="currentholdingHeaderposition">
                                        <Text className="currentholdingHeaderText">{item.assetClassName}</Text></View>
                                    </View>
                                    <View style={{ margin: 10 }}>
                                      <View>
                                        <View style={{ margin: 5 }}>
                                          <TouchableOpacity className="button" onPress={() => { this.selectedAccount() }}  >
                                            <View style={{ flexDirection: 'row' }}>
                                              <View className="currentholdingbuttonView">
                                                <Text style={{ fontSize: 16, fontFamily: 'sans-serif', }}>{SCHEME_NAME}</Text>
                                                <Text className="currentholdingbuttonText">{item.schemeName}</Text>
                                              </View>
                                              <View style={{ margin: 10, }}>
                                                <Text style={{ fontSize: 16, fontFamily: 'sans-serif', }}>{ABSOLUTE_RETURN}</Text>
                                                <Text className="currentholdingbuttonText">{item.absoluteReturn}</Text>
                                              </View>
                                              <View style={{ margin: 10, }}>
                                                <Text style={{ fontSize: 16, fontFamily: 'sans-serif', }}>{FUND_TYPE}</Text>
                                                <Text className="currentholdingbuttonText">{item.fundOption}</Text>
                                              </View>
                                              <View style={{ margin: 10, }}>
                                                <Text style={{ fontSize: 16, fontFamily: 'sans-serif', }}>{NAV_VALUE}</Text>
                                                <Text className="currentholdingbuttonText">{item.latestNAV}</Text>
                                              </View>
                                              <View className="currentholdingbuttonView">
                                                <Text style={{ fontSize: 16, fontFamily: 'sans-serif', }}>{INVESTMENT_AMT}</Text>
                                                <Text className="currentholdingbuttonText">{item.costofCurrentInvestment}</Text>
                                              </View>
                                              <View className="currentholdingbuttonView">
                                                <Text style={{ fontSize: 16, fontFamily: 'sans-serif', }}>{CURRENT_FUND_VALUE_AMT}</Text>
                                                <Text className="currentholdingbuttonText">{item.currentFundValue}</Text>
                                              </View>
                                            </View>
                                          </TouchableOpacity>
                                        </View>
                                      </View>
                                    </View>
                                  </View>
                                )
                              })}
                            </View>
                          </ScrollView>
                          <View className="totalInvestmentheading" style={{ marginBottom: 30 }}>
                            <Text style={{ fontSize: 16, fontFamily: 'sans-serif', fontWeight: 20 }}>Total Investment</Text>
                            <Text className="totalinvestment">{this.state.totalInvestment}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                ) : (
                    <View className="currentholdingcontainer" style={{ marginTop: 20 }}>
                      <View className="currentholdingcontainerallign">
                        <View style={{ width: '80%' }} className="currentholdinginnercontainer">

                          <View className="currentholdingborder">
                            <View className="Landingallignment" style={{ marginBottom: 30 }}>
                              <Text className="productmobileheaderstyle">{CURRENT_HOLDINGS}</Text>
                            </View>
                            <View>
                              {dataSource.map((item) => {
                                return (
                                  <View>
                                    <View className="currentholdingHeaderView">
                                      <View className="currentholdingHeaderposition"><Text className="currentholdingHeaderText">{item.assetClassName}</Text></View>
                                      <View className="currentholdingHeaderposition2"><Text className="currentholdingHeaderText">{item.headeramount}</Text></View>
                                    </View>
                                    <View style={{ margin: 10 }}>
                                      <View>
                                        <View style={{ margin: 5, borderColor: 'grey', borderWidth: 1 }}>
                                          <TouchableOpacity className="button" onPress={() => { this.selectedAccount(item.ProductHeading) }}  >

                                            <View style={{ margin: 10, }}>
                                              <Text style={{ fontSize: 16, fontFamily: 'sans-serif', }}>{SCHEME_NAME}</Text>
                                              <Text className="currentholdingbuttonText">{item.schemeName}</Text>
                                            </View>
                                            <View style={{ margin: 10, }}>
                                              <Text style={{ fontSize: 16, fontFamily: 'sans-serif', }}>{ABSOLUTE_RETURN}</Text>
                                              <Text className="currentholdingbuttonText">{item.absoluteReturn}</Text>
                                            </View>
                                            <View style={{ margin: 10, }}>
                                              <Text style={{ fontSize: 16, fontFamily: 'sans-serif', }}>{FUND_TYPE}</Text>
                                              <Text className="currentholdingbuttonText">{item.fundOption}</Text>
                                            </View>
                                            <View style={{ margin: 10, }}>
                                              <Text style={{ fontSize: 16, fontFamily: 'sans-serif', }}>{NAV_VALUE}</Text>
                                              <Text className="currentholdingbuttonText">{item.latestNAV}</Text>
                                            </View>
                                            <View style={{ margin: 10, }}>
                                              <Text style={{ fontSize: 16, fontFamily: 'sans-serif', }}>{INVESTMENT_AMT}</Text>
                                              <Text className="currentholdingbuttonText">{item.costofCurrentInvestment}</Text>
                                            </View>
                                            <View style={{ margin: 10, }}>
                                              <Text style={{ fontSize: 16, fontFamily: 'sans-serif', }}>{CURRENT_FUND_VALUE_AMT}</Text>
                                              <Text className="currentholdingbuttonText">{item.currentFundValue}</Text>
                                            </View>
                                          </TouchableOpacity>
                                        </View>
                                      </View>
                                    </View>
                                  </View>
                                )
                              })}
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  )}
              </View>
            </View>
          </ScrollView>
        </ThemeProvider>
      </View>
    );
  }



}
export default currentHoldings;

