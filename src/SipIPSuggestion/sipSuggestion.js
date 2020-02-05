import React, { Component } from 'react';
import TopNav from '../TopNav';
import TopSection from '../components/topSection.js';
import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { ThemeProvider } from "nachos-ui";
import './sipSuggestion.css';
import ApiService from '../services/api-services';
import {
  SUGGESTIONS, SCHEME_NAME_SUGGESTIONS, ACTION_TYPE,
  SIP_MIN_AMT, MIN_AMT, SIP_START_DATE, ADD_TO_CART, CLIENT_CODE
} from './../constants/constants';
class sipSuggestions extends Component {
  state = {
    windowHeight: Dimensions.get("window").height,
    windowWidth: Dimensions.get("window").width,
    loading: false,
    dataSource: [],
  }



  componentDidMount() {
    this.setState({
      loading: true,
    });
    if (this.props.navigation.state.params == undefined) {
      this.props.navigation.state.params = {}
    }
    var currentHoldingsData = {
      "Client_Code": CLIENT_CODE,
      "Goal_ID": "1",
      "Type": "2",
      "CallType": "1",
      "SubType": "2",
      "InvAmount": this.props.navigation.getParam('SipAmount', this.props.navigation.state.params.SIPamount)[0],
      "SIPInvAmount": this.props.navigation.getParam('SipAmount', this.props.navigation.state.params.SIPamount)[0],
      "Source_Platform": "Mobile",
      "Is_Retail_Flag": "1",
      "Risk_Profile_Name": "Balanced",
      "Bal_Flag": 0
    }
    ApiService.auth
      .rebalancingdetailsService(currentHoldingsData)
      .then(data => {
        if (data) {
          this.setState({
            loading: false,
            dataSource: data.RBDetails
          });
        }
      })
      .catch(error => {
        console.log(error)
        this.props.navigation.navigate("ErrorPage")
      });
  }


  componentWillMount() {
    this.props.changeBackground('#F36414');
  }
  back = () => {
    this.props.navigation.navigate('Sip', this.props.navigation.state.params)
  }
  sipsugsubmit = () => {
    this.props.navigation.navigate('nomineeDetails', {
      title: 'Suggestions'
    })
  }

  selectedAccount() {
    this.props.navigation.navigate("fundDetails", this.props.navigation.state.params)
  }

  render() {
    const { navigation } = this.props;
    const { dataSource } = this.state;
    const cardStyle = { minWidth: 800, width: '100%', color: 'white', alignSelf: 'center', borderRadius: 20 }
    var margin = 0;
    var font = 14;
    var flex = 0.33;
    var width = "80%"
    console.log(this.state.windowWidth)
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
          <ScrollView style={{ backgroundColor: '#F36414' }}>
            <View>
              <TopSection back={() => { this.back() }}></TopSection>
              <View>
                {this.state.windowWidth > 600 ? (

                  <View className="currentholdingcontainer">
                    <View className="currentholdingcontainerallign" >
                      <View className="currentholdinginnercontainer">

                        <View className="currentholdingborder" style={{ height: 350 }} >
                          <View className="Landingallignment" style={{ marginBottom: 30 }}>
                            <Text className="productmobileheaderstyle" >{SUGGESTIONS}</Text>
                          </View>
                          <ScrollView>
                            <View>
                              {dataSource.map((item, index) => {
                                return (
                                  <View>
                                    <View className="currentholdingHeaderView" >
                                      <View className="currentholdingHeaderposition">
                                        <Text className="currentholdingHeaderText">{item.asset_type}</Text></View>
                                      <View className="currentholdingHeaderposition2">
                                        <Text className="currentholdingHeaderText">Rs.{navigation.getParam('SipAmount', this.props.navigation.state.params.SIPamount)}</Text></View>
                                    </View>
                                    <View style={{ margin: 5 }}>
                                      <View style={{ flexDirection: 'row' }}>
                                        <View className="currentholdingbuttonView">
                                          <Text className="siptablehead">{SCHEME_NAME_SUGGESTIONS}</Text>
                                        </View>
                                        <View className="currentholdingbuttonView">
                                          <Text className="siptablehead">{ACTION_TYPE}</Text>
                                        </View>
                                        <View className="currentholdingbuttonView">
                                          <Text className="siptablehead">{SIP_MIN_AMT}</Text>
                                        </View>
                                        <View className="currentholdingbuttonView">
                                          <Text className="siptablehead">{MIN_AMT}</Text>
                                        </View>
                                        <View className="currentholdingbuttonView">
                                          <Text className="siptablehead">{SIP_START_DATE}</Text>
                                        </View>
                                      </View>
                                    </View>
                                    <View>
                                      <View>
                                        <View >
                                          <TouchableOpacity className="button"
                                            onPress={() => { this.selectedAccount() }}
                                          >
                                            <View style={{ flexDirection: 'row' }}>
                                              <View className="sipcolumnsButton">
                                                <Text className="sipsugFirstcolumn">{item.scheme_name}</Text>
                                              </View>
                                              <View className="sipcolumnsButton">
                                                <Text className="sipsugFirstcolumn">{item.actiontype}</Text>
                                              </View>
                                              <View className="sipcolumnsButton">
                                                <Text className="sipsugFirstcolumn">{item.sip_mn_amt}</Text>
                                              </View>
                                              <View className="sipcolumnsButton">
                                                <Text className="sipsugFirstcolumn">{item.min_amt}</Text>
                                              </View>
                                              <View className="sipcolumnsButton">
                                                <Text className="sipsugFirstcolumn">{item.sip_start_date}</Text>
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
                        </View>
                        <View className="sipSuggestion_modalButton">
                          <TouchableOpacity onPress={() => { this.sipsugsubmit() }} className="sipSuggestionaddCart">
                            <Text className="sipSuggestionButton">{ADD_TO_CART}</Text></TouchableOpacity>
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
                              <Text className="productmobileheaderstyle">{SUGGESTIONS}</Text>
                            </View>
                            <View>
                              {dataSource.map((item) => {
                                return (
                                  <View>
                                    <View className="currentholdingHeaderView">
                                      <View className="currentholdingHeaderposition"><Text className="currentholdingHeaderText">{item.headername}</Text></View>
                                    </View>
                                    <View style={{ margin: 10 }}>
                                      <View>
                                        <View style={{ margin: 5, borderColor: 'grey', borderWidth: 1 }}>
                                          <TouchableOpacity className="button" onPress={() => { this.selectedAccount(item.ProductHeading) }}  >

                                            <View style={{ margin: 10, }}>
                                              <Text style={{ fontSize: 16, fontFamily: 'sans-serif', }}>SBI Equity Hybrid Fund -Growth</Text>
                                              <Text className="currentholdingbuttonText">{item.productname}</Text>
                                            </View>
                                            <View style={{ margin: 10, }}>
                                              <Text style={{ fontSize: 16, fontFamily: 'sans-serif', }}>Investment Amt (Rs.)</Text>
                                              <Text className="currentholdingbuttonText">{item.investmentamt}</Text>
                                            </View>
                                            <View style={{ margin: 10, }}>
                                              <Text style={{ fontSize: 16, fontFamily: 'sans-serif', }}>Current Fund Value (Rs.)</Text>
                                              <Text className="currentholdingbuttonText">{item.currentfundamt}</Text>
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
    )
  }
}
export default sipSuggestions;
