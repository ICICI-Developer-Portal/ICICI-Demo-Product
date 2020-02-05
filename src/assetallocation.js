import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Picker, View, Text, Platform, StyleSheet, Linking, ScrollView, TouchableHighlight, Image, TouchableOpacity, Dimensions } from "react-native";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";
import { TsdevDonutChart } from 'tsdev-react-donut-chart';
import PinInput from 'react-pin-input';
import Loader from './components/loader.js'
import Blackout from './components/blackOut.js'
import { LineChart, PieChart } from 'react-chartkick'
import 'chart.js'
import TopSection from './components/topSection.js'
import TopNav from './TopNav'
import DomainName from './serverConfig/serverconfig.js';
import DonutChart from 'react-donut-chart';
import { ThemeProvider, Card, Spinner, Input } from "nachos-ui";
import { withRouter } from "react-router-dom";
import ApiService from '../src/services/api-services';
import { ASSET_ALLOCATION_DESC, ASSET_ALLOCATION_RESULTS,ASSET_ALLOCATION_DETAILS, USER_ID, BANC_ACC_N0,
  CLIENT_CODE, ASSET_ALLOCATION_TITLE } from "./constants/constants";


class assetallocation extends Component {

  state = {
    windowHeight: Dimensions.get("window").height,
    windowWidth: Dimensions.get("window").width,
    loading: false,
    scheme_category: [],
    asset_type: [],
  }

  handleResize = () => this.setState({
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth
  });

  componentDidMount() {
    this.setState({
      loading: true
    });
    if(this.props.navigation.state.params == undefined){
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
            asset_type: data[`fetch/assetallocation`].asset_type,
            scheme_category:  data[`fetch/assetallocation`].scheme_category
          });
        }
      })
      .catch(error => {
        console.log(error)
        // this.props.navigation.navigate("ErrorPage")
      });
  }

  componentWillMount() {
    console.log(this.props.navigation.state.params)
  }

  componentWillUnmount() {
    this.props.changeBackground('#F36414');
    if (window.removeEventListener) {
      window.removeEventListener('resize', this.handleResize)
    }
  }

  homepage = () => {
    this.props.navigation.navigate("product", this.props.navigation.state.params)
  }
  back = () => {
    this.props.navigation.navigate('LandingPage', this.props.navigation.state.params)
  }


  render() {
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
        <TopNav navigation = {this.props.navigation} />
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

          <View style={{ justifyContent: 'center', minHeight: '80vh' }}>

            <View>
            <TopSection  back={()=>{this.back()}}></TopSection>
              {this.state.windowWidth > 600 ? (

                <View className="assetallocationcontainer" >
                  <View className="investnowcontainerallign">
                    <View className="assetallocationInnercontainer">
                      <View style={{ padding: 10, margin: 20 }}>
                        <View style={{ margin: 10 }} className="currentholdingcontainerallign">
                          <View style={{ margin: 10 }}>
                            <Text className="assetallocationText1" >{ASSET_ALLOCATION_RESULTS}</Text>
                          </View>
                          <Text className="assetallocationText2">{ASSET_ALLOCATION_DESC}</Text>
                        </View>
                        <View className="assetallocationcontainer2" >
                        <View style={{ marginTop: 30 }}>
                            <View style={{ flexDirection: 'row' }}>
                              <View style={{ width: '50%' }}>
                                <View>
                                  <Text className="assetallocationText3" >{ASSET_ALLOCATION_TITLE}</Text>
                                </View>
                                {this.state.asset_type.map((item, index) => {
                                  return (
                                    <View>
                                      <PieChart suffix="%" donut={true} data={this.state.asset_type[index]} />
                                    </View>
                                  )
                                })}
                              </View>
                              <View style={{ width: '50%' }}>
                                <View>
                                  <Text   className="assetallocationText3" >{ASSET_ALLOCATION_DETAILS}</Text>
                                </View>
                                {this.state.scheme_category.map((item, index) => {
                                  return (
                                    <View>
                                      <PieChart suffix="%" donut={true} data={this.state.scheme_category[index]} />
                                    </View>
                                  )
                                })}
                              </View>
                            </View>
                          </View>

                        </View>
                       
                       
                      </View>
                    </View>
                  </View>
                </View>
              ) : (

                  <View className="assetallocationcontainer">
                    <View className="investnowcontainerallign">
                      <View className="assetallocationInnercontainer" style={{width:'90%'}}>

                        <View style={{ padding: 10, margin: 10 }}>
                          <View className="currentholdingcontainerallign" style={{margin: 10 }}>
                            <View style={{ margin: 10 }}>
                              <Text className="assetallocationText1">{ASSET_ALLOCATION_RESULTS}</Text>
                            </View>
                            <Text className="assetallocationText2">{ASSET_ALLOCATION_DESC}</Text>
                          </View>
                          <View className="assetallocationcontainer2"  >
                            
                          <View>
                              <View >

                                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                  <View>
                                    <Text className="assetallocationText3">{ASSET_ALLOCATION_TITLE}</Text>
                                  </View>
                                  
                                  {this.state.asset_type.map((item, index) => {
                                    return (
                                      <View>

                                        <PieChart suffix="%" donut={true} data={this.state.asset_type[index]} />

                                      </View>
                                    )
                                  })}
                                 
                                </View>
                                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                  <View>
                                    <Text className="assetallocationText3">{ASSET_ALLOCATION_DETAILS}</Text>
                                  </View>
                                  {this.state.scheme_category.map((item, index) => {
                                    return (
                                      <View>

                                        <PieChart donut={true} suffix="%" data={this.state.scheme_category[index]} />

                                      </View>
                                    )
                                  })}
                                  
                                </View>
                              </View>
                            </View>
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
const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    alignItems: "center",
    backgroundColor: 'white'
  },
  color1: {
    color: 'yellow',
    backgroundColor: 'yellow'
  }

});
export default assetallocation;

