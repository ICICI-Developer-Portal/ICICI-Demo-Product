import React, { Component } from "react";
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";
import Loader from './components/loader.js'
import Blackout from './components/blackOut.js'
import TopNav from './TopNav'
import TopSection from './components/topSection.js'
import styles from './components/commonCss';
import { ThemeProvider } from "nachos-ui";
import ApiService from '../src/services/api-services';
import {
  BASIC_DETAILS_TITLE, INVESTMENT_OBJ_TITLE, FUND_MANAGER_TITLE, FUND_MANAGER_INTRO, SIDVKM,
  CLICK_TO_VIEW, FUND_DETAILS_TITLE, USER_ID, CLIENT_CODE
} from './constants/constants';

class fundDetails extends Component {
  state = {
    windowHeight: Dimensions.get("window").height,
    windowWidth: Dimensions.get("window").width,
    loading: false,
    fundManager: '',
    fundManagerDetails: '',
    fundObjectives: '',
    name: '',
    schemeType: '',
    schemePlan: '',
    schemeName: '',
    launchDate: '',
    displayfirstmodal: true,
  }

  handleResize = () => this.setState({
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth
  });

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
    var schemeDetails = {
      "MWIClientCode": CLIENT_CODE,
      "SchemeCode": "81191",
      "SchemeName": "UTI FTIF Series XXIII-XII (1100 Days)- Regular Plan - Growth Option",
      "infinityId": USER_ID
    }
    ApiService.auth
      .getschemedetailsService(schemeDetails)
      .then(data => {
        if (data) {
          this.setState({
            loading: false,
            fundManager: data.dataDetails.data.fundDetails.fundManager,
            fundManagerDetails: data.dataDetails.data.fundDetails.fundManagerDetails,
            fundObjectives: data.dataDetails.data.fundDetails.fundObjectives,
            name: data.dataDetails.data.fundDetails.name,
            launchDate: data.dataDetails.data.fundDetails.launchDate,
            schemeName: data.dataDetails.data.fundDetails.schemeName,
            schemeType: data.dataDetails.data.fundDetails.schemeType,
            schemePlan: data.dataDetails.data.fundDetails.schemePlan,
            amcname: data.dataDetails.data.fundDetails.amcname,
            asset: data.dataDetails.data.fundDetails.asset
          });
        }
      })
      .catch(error => {
        console.log(error)
        this.props.navigation.navigate("ErrorPage")
      });
  }
  componentWillMount() {
    var accontType = "Savings"
    this.setState({ accontType: accontType })

  }
  componentWillUnmount() {
    this.props.changeBackground('#F36414');
    if (window.removeEventListener) {
      window.removeEventListener('resize', this.handleResize)
    }
  }
  basicDetails = () => {
    this.setState({ displayfirstmodal: true })
  }

  homepage = () => {
    this.props.navigation.navigate("product", this.props.navigation.state.params)
  }
  back = () => {

    this.props.navigation.navigate('currentHoldings', this.props.navigation.state.params)
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
            <View style={styles.fundDetails_container} >
              <TopSection back={() => { this.back() }}></TopSection>
              <View>
                {this.state.windowWidth > 600 ? (
                  <View style={styles.fundDetails_section}>
                    <View style={styles.fundDetails_innerSection}>
                      <View style={styles.fundDetails_firstDiv}>
                        <View style={styles.fundmargPad}>
                          <View style={styles.fundHeading}>
                            <Text style={styles.fundHeadingtext}>{FUND_DETAILS_TITLE}</Text>
                          </View>
                          <View style={styles.fundSidelabel}>
                            <View style={{ flexDirection: 'row' }}>
                              <TouchableOpacity onPress={() => { this.basicDetails() }} style={styles.fundBasic}>
                                <Text style={styles.fndBasictext}>{BASIC_DETAILS_TITLE}</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                          <View>
                            {this.state.displayfirstmodal === true ? (
                              <View style={{ margin: 20 }}>
                                <View>
                                  <View style={{ margin: 10 }}>
                                    <Text style={styles.fundSidetext}>{this.state.name}</Text>
                                  </View>
                                  <View style={styles.fundBoldtext}>
                                    <View style={{ margin: 20 }}>
                                      <View style={{ marginBottom: 10 }}>
                                        <Text style={styles.fundTextHeading}>{INVESTMENT_OBJ_TITLE}</Text>
                                      </View>
                                      <View>
                                        <Text style={styles.fundObjective}>{this.state.fundObjectives}</Text>
                                      </View>
                                    </View>
                                  </View>
                                  <View style={{ margin: 10, backgroundColor: '#f1f1f1' }}>
                                    <View style={{ margin: 20 }}>
                                      <View style={{ marginBottom: 10 }}>
                                        <Text style={styles.fundTextHeading}>{FUND_MANAGER_TITLE}</Text>
                                      </View>
                                      <View>
                                        <Text style={styles.fundObjective}>{this.state.fundManager}</Text>
                                      </View>
                                    </View>
                                  </View>
                                  <View style={{ margin: 10, backgroundColor: '#f1f1f1' }}>
                                    <View style={{ margin: 20 }}>
                                      <View style={{ marginBottom: 10 }}>
                                        <Text style={styles.fundTextHeading}>{FUND_MANAGER_INTRO}</Text>
                                      </View>
                                      <View>
                                        <Text style={styles.fundObjective}>{this.state.fundManagerDetails}</Text>
                                      </View>
                                    </View>
                                  </View>
                                  <View style={{ flexDirection: 'row', margin: 10 }}>
                                    <View style={styles.fundTable}>
                                      <View style={{ height: 40, }}>
                                        <Text style={styles.fundTableheading}>{BASIC_DETAILS_TITLE}</Text>
                                      </View>
                                      <View style={styles.fundSecondData}>
                                        <Text style={styles.fundSecondDataColumn}>Fund house</Text>
                                        <Text style={styles.fundColumnSecond}>
                                          {this.state.schemeName}
                                        </Text>
                                      </View>
                                      <View style={styles.fundSecondData}>
                                        <Text style={styles.fundSecondDataColumn}>Launch date</Text>
                                        <Text style={styles.fundColumnSecond}>
                                          {this.state.launchDate}
                                        </Text>
                                      </View>
                                      <View style={styles.fundSecondData}>
                                        <Text style={styles.fundSecondDataColumn}>Bench mark</Text>
                                        <Text style={styles.fundColumnSecond}>
                                          {this.state.amcname}
                                        </Text>
                                      </View>
                                      <View style={styles.fundSecondData}>
                                        <Text style={styles.fundSecondDataColumn}>Fund Category</Text>
                                        <Text style={styles.fundColumnSecond}>
                                          {this.state.schemePlan}
                                        </Text>
                                      </View>
                                      <View style={styles.fundSecondData}>
                                        <Text style={styles.fundSecondDataColumn}>Fund Type</Text>
                                        <Text style={styles.fundColumnSecond}>
                                          {this.state.schemeType}
                                        </Text>
                                      </View>
                                      <View style={styles.fundSecondData}>
                                        <Text style={styles.fundSecondDataColumn}>Assets as on Date</Text>
                                        <Text style={styles.fundColumnSecond}>
                                          {this.state.asset}
                                        </Text>
                                      </View>
                                    </View>
                                  </View>
                                </View>
                              </View>
                            ) : (
                                null
                              )}
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                ) : (
                    <View style={styles.fundMobileContainer}>
                      <View style={styles.fundDetails_innerSection}>
                        <View style={styles.fundMobileCard}>
                          <View style={{ padding: 5, margin: 5 }}>
                            <View style={styles.fundHeading}>
                              <Text style={styles.fundSidetext}>{FUND_DETAILS_TITLE}</Text>
                            </View>
                            <View style={styles.fundSidelabel}>
                              <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => { this.basicDetails() }} style={styles.fundMobileBasicdetails}>
                                  <Text style={styles.fndBasictext}>{BASIC_DETAILS_TITLE}</Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                            <View>
                              {this.state.displayfirstmodal === true ? (
                                <View style={{ margin: 5 }}>
                                  <View>
                                    <View style={{ margin: 5, marginTop: 15, marginBottom: 10 }}>
                                      <Text style={styles.fundSidetext}>{this.state.name}</Text>
                                    </View>
                                    <View style={{ margin: 5, backgroundColor: '#f1f1f1' }}>
                                      <View style={{ margin: 10 }}>
                                        <View style={{ marginBottom: 10 }}>
                                          <Text style={styles.fundTextHeading}>{INVESTMENT_OBJ_TITLE}</Text>
                                        </View>
                                        <View>
                                          <Text style={styles.fundObjective}>{this.state.fundObjectives}</Text>
                                        </View>
                                      </View>
                                    </View>
                                    <View style={{ margin: 10, backgroundColor: '#f1f1f1' }}>
                                      <View style={{ margin: 20 }}>
                                        <View style={{ marginBottom: 10 }}>
                                          <Text style={styles.fundTextHeading}>{FUND_MANAGER_TITLE}</Text>
                                        </View>
                                        <View>
                                          <Text style={styles.fundObjective}>{this.state.fundManager}</Text>
                                        </View>
                                      </View>
                                    </View>
                                    <View style={{ margin: 10, backgroundColor: '#f1f1f1' }}>
                                      <View style={{ margin: 20 }}>
                                        <View style={{ marginBottom: 10 }}>
                                          <Text style={styles.fundTextHeading}>{FUND_MANAGER_INTRO}</Text>
                                        </View>
                                        <View>
                                          <Text style={styles.fundObjective}>{this.state.fundManagerDetails}}</Text>
                                        </View>
                                      </View>
                                    </View>
                                    <View>
                                      <View style={styles.fundMobileTable}>
                                        <View style={{ height: 40, }}>
                                          <Text style={styles.fundTableheading}>{BASIC_DETAILS_TITLE}</Text>
                                        </View>
                                        <View style={styles.fundSecondData}>
                                          <Text style={styles.fundMobileSecond}>Fund house</Text>
                                          <Text style={styles.fundMobileSecondColumn}>
                                            {this.state.schemeName}
                                          </Text>
                                        </View>
                                        <View style={styles.fundSecondData}>
                                          <Text style={styles.fundMobileSecond}>Launch Date</Text>
                                          <Text style={styles.fundMobileSecondColumn}>
                                            {this.state.launchDate}
                                          </Text>
                                        </View>
                                        <View style={styles.fundSecondData}>
                                          <Text style={styles.fundMobileSecond}>Bench mark</Text>
                                          <Text style={styles.fundMobileSecondColumn}>
                                            {this.state.amcname}
                                          </Text>
                                        </View>
                                        <View style={styles.fundSecondData}>
                                          <Text style={styles.fundMobileSecond}>Fund Category</Text>
                                          <Text style={styles.fundMobileSecondColumn}>
                                            {this.state.schemePlan}
                                          </Text>
                                        </View>
                                        <View style={styles.fundSecondData}>
                                          <Text style={styles.fundMobileSecond}>Fund Type</Text>
                                          <Text style={styles.fundMobileSecondColumn}>
                                            {this.state.schemeType}
                                          </Text>
                                        </View>
                                        <View style={styles.fundSecondData}>
                                          <Text style={styles.fundMobileSecond}>Assets as on Date</Text>
                                          <Text style={styles.fundMobileSecondColumn}>
                                            {this.state.asset}
                                          </Text>
                                        </View>
                                      </View>
                                    </View>
                                  </View>
                                </View>
                              ) : (
                                  null
                                )}
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
export default fundDetails;

