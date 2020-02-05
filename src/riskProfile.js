import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from "react-native";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";
import Loader from './components/loader.js'
import Blackout from './components/blackOut.js'
import 'chart.js'
import TopSection from './components/topSection.js'
import TopNav from './TopNav'
import styles from './components/commonCss';
import { ThemeProvider } from "nachos-ui";
import ApiService from '../src/services/api-services';
import { CLIENT_CODE, USER_ID, RISK_PROFILE_HEADING,RISK_PROFILE_HEADING_2,
  RISK_PROFILE_DESC_1, RISK_PROFILE_DESC_2, BANC_ACC_N0
} from './constants/constants';

class riskProfile extends Component {
  state = {
    windowHeight: Dimensions.get("window").height,
    windowWidth: Dimensions.get("window").width,
    loading: false,
    ProfileName: '',
    ProfileName: '',
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
            ProfileName: data['getRiskProfile '].ProfileName,
            ProfileScore: data['getRiskProfile '].ProfileScore
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

  componentWillUnmount() {
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
            <View style={{ justifyContent: 'center', minHeight: '80vh' }}>
              <View>
                <TopSection back={() => { this.back() }}></TopSection>
                {this.state.windowWidth > 600 ? (
                  <View style={style.riskProfileContainer}>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                      <View style={style.riskContainer}>
                        <View style={{ padding: 10, margin: 20 }}>
                          <View style={{ alignItems: 'center', justifyContent: 'center', margin: 10 }}>
                            <View style={{ margin: 10 }}>
                              <Text style={styles.fundSidetext}>{RISK_PROFILE_HEADING}</Text>
                            </View>
                            <Text style={style.riskHeading}>{RISK_PROFILE_HEADING_2}</Text>
                          </View>
                          <View style={style.riskProfileimage}>
                            <View style={{ margin: 10 }}>
                              <View>
                                <View style={{ alignItems: 'center', justifyContent: 'center', margin: 10 }}>
                                  <Text style={style.riskLevel}>{this.state.ProfileName}</Text>
                                </View>
                                <View style={style.riskRatingData}>
                                  {this.state.ProfileScore === '10.5' ? (
                                    <Image style={style.riskRateImage} source={require('./assets/images/Group3.png')} />
                                  ) : (
                                      null
                                    )}        
                                </View>
                                <View style={{ alignItems: 'center', justifyContent: 'center', margin: 10 }}>
                                  <Text style={style.riskHeading}>{RISK_PROFILE_DESC_1}</Text>
                                </View>
                                <View style={{ alignItems: 'center', justifyContent: 'center', margin: 10 }}>
                                  <Text style={style.riskHeadingSecondPara}>{RISK_PROFILE_DESC_2}</Text>
                                </View>
                              </View>
                            </View>

                          </View>

                        </View>
                      </View>
                    </View>
                  </View>
                ) : (
                    <View style={style.riskMobileContainer}>
                      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={style.riskMobileCard}>

                          <View style={{ padding: 10, margin: 10 }}>
                            <View style={{ alignItems: 'center', justifyContent: 'center', margin: 10 }}>
                              <View style={{ margin: 10 }}>
                                <Text style={styles.fundSidetext}>{RISK_PROFILE_HEADING}</Text>
                              </View>
                              <Text style={style.riskHeading}>{RISK_PROFILE_HEADING_2}</Text>
                            </View>
                            <View style={style.riskProfileimage}>
                              <View style={{ margin: 10 }}>
                                {this.state.RiskDetails.map((item, index) => {
                                  return (
                                    <View>
                                      <View style={{ alignItems: 'center', justifyContent: 'center', margin: 5 }}>
                                        <Text style={style.riskLevel}>{this.state.ProfileName}</Text>
                                      </View>
                                      <View style={style.riskMobileImage}>
                                        {this.state.ProfileScore === '10.5' ? (
                                          <Image style={style.riskRateImage} source={require('./assets/images/Group3.png')} />
                                        ) : (
                                            null
                                          )}
                                      </View>
                                      <View style={{ alignItems: 'center', justifyContent: 'center', margin: 10 }}>
                                        <Text style={style.riskHeading}>{RISK_PROFILE_DESC_1}</Text>
                                      </View>
                                      <View style={{ alignItems: 'center', justifyContent: 'center', margin: 10 }}>
                                        <Text style={style.riskHeading}>{RISK_PROFILE_DESC_2}</Text>
                                      </View>
                                    </View>
                                  )
                                })}
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
const style = StyleSheet.create({
  riskProfileContainer: {
    marginBottom: 10,
    width: '100%',
    alignSelf: 'center'
  },
  riskContainer: {
    width: '80%',
    height: 'auto',
    backgroundColor: 'white',
    borderRadius: 10
  },
  riskHeading: {
    fontSize: 16,
    fontFamily: 'sans-serif'
  },
  riskProfileimage: {
    width: '100%',
    height: 350,
    backgroundColor: '#f9f9f9',
    marginTop: 10
  },
  riskLevel: {
    fontSize: 20,
    fontFamily: 'sans-serif',
    color: '#557f6e',
    fontWeight: '600'
  },
  riskRatingData: {
    width: '95%',
    height: 150,
    marginLeft: 20,
    marginRight: 20
  },
  riskRateImage: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    resizeMode: 'contain'
  },
  riskHeadingSecondPara: {
    fontSize: 16,
    fontFamily: 'sans-serif',
    textAlign: 'center'
  },
  riskMobileContainer: {
    marginBottom: 10,
    width: '100%',
    alignSelf: 'center',
    marginTop: 30
  },
  riskMobileCard: {
    width: '90%',
    height: 'auto',
    backgroundColor: 'white',
    borderRadius: 10
  },
  riskMobileImage: {
    width: '95%',
    height: 100,
    marginLeft: 10,
    marginRight: 10
  },
  assetAllocationDonut: {
    fontSize: 16,
    fontFamily: 'sans-serif',
    fontWeight: '600',
    margin: 10,
    marginTop: 20,
    marginBottom: 20
  }
});
export default riskProfile;

