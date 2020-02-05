import React, { Component } from 'react';
import { View, Linking, Text, Platform, StyleSheet, ScrollView, TouchableHighlight, Image, TouchableOpacity, Dimensions } from "react-native";
import { Button, Switcher, SegmentedControlButton, B, P, Input, Spinner, H4 } from 'nachos-ui';
import Checkbox from 'react-simple-checkbox';
import { ThemeProvider, Card } from "nachos-ui";
import { string } from 'prop-types';
import Loader from './components/loader.js'
import Blackout from './components/blackOut.js'
import TopSection from './components/topSection.js'
import PDFViewer from 'pdf-viewer-reactjs';
import { PDFReader } from 'react-read-pdf';
import { MobilePDFReader } from 'react-read-pdf';
const ENTRIES1 = require('./config.js').ENTRIES_ALL


const axios = require('axios');


class pdfView extends Component {

  state = {
    checked: false,
    showstatus: 'Show More',
    status: false,
    startDate: new Date(),
    modalopenhide: false,
    modalVisible: false,
    leadNo: "null",
    entries: ENTRIES1,
    windowHeight: Dimensions.get("window").height,
    windowWidth: Dimensions.get("window").width,
    loading: false,
    modalinputs: [
      {
        title: '',
        id: 99,
        b_title: '',
        heading: '',
        title2: '',
        details: '',
        subheadings: [
          {
            offers: [''],
            contentoffer: [''],
          },
        ],
        knowmoreinfo: '',
        knowmoreinfoLink: ''
      }
    ],

  }

  handleResize = () => this.setState({
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth
  });


  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  componentWillMount() {
    this.setState({ modalinputs: this.props.navigation.state.params.knowmore })
  }
  componentDidMount() {

    if (window.addEventListener) {
      window.addEventListener('resize', this.handleResize)
      this.handleResize();
      window.scrollTo(0, 0)
    }
  }

  componentWillUnmount() {
    if (window.removeEventListener) {
      window.removeEventListener('resize', this.handleResize)
    }
  }
  onChange(ev) {
    this.setState({ checked: ev });
  }
  homepage = () => {
    this.props.navigation.navigate("product")
  }
  openModal(knowmore) {
    if (knowmore)
      this.setState({ modalVisible: true, modalopenhide: true, modalinputs: knowmore });
    else
      this.setState({ modalVisible: true, modalopenhide: true });
  }
  closeModal() {
    this.setState({ modalVisible: false, modalopenhide: false });
  }

  onSubmit = () => {
    console.log("submit")
    var that = this;
    var config = this.state.elements_profile
    if (config[1].value.length == 0) {
      config[1].correct = false
      this.setState({ elements_profile: config })
    } else {
      this.setState({ loading: true })
      var config = this.state.elements_profile
      for (var i = 0; i < config.length; i++) {
        if (config[i].type == 'radio') {
          console.log(config[i].name)
          console.log(config[i].selected)
        } else {
          console.log(config[i].name)
          console.log(config[i].value)
        }
      }
      let config_header = {
        headers: { 'Content-Type': 'application/json', "Accept": "application/json" }
      }
      axios.post('http://34.69.242.121:7000/mainservice/generateLeadId', {
      }, config_header)
        .then(function (response) {
          console.log(response.data.leadNo);
          that.setState({ leadNo: response.data.leadNo, loading: false })
        })
        .catch(function (error) {
          that.setState({ loading: false })
          console.log(error);
        });
    }
  }


  savings = () => {
    this.props.navigation.navigate("product")
  }
  back = () => {
    this.props.navigation.navigate("termsConditions", this.props.navigation.state.params)
  }
  movetonextpage = () => {
    if (this.props.navigation.state.params.Aadhaar) {
      this.props.navigation.navigate("esignSuccess", this.props.navigation.state.params)
    } else {
      this.props.navigation.navigate("addMoney", this.props.navigation.state.params)
    }
  }
  ShowHideTextComponentView = () => {

    if (this.state.status == true) {
      this.setState({ status: false, showstatus: 'Show More' })
    }
    else {
      this.setState({ status: true, showstatus: 'Show Less' })
    }
  }
  render() {
    const cardStyle = { minWidth: 330, width: '80%', color: 'white', alignSelf: 'center', borderRadius: 10 }
    var margin = 0;
    var font = 14;
    var flex = 0.33;
    var scale = 0.7
    console.log(this.state.windowWidth)
    if (this.state.windowWidth < 480) {
      console.log("kkk")
      margin = 0;
      font = 12;
      fontTop: 25;
      scale = 0.5
    } else {
      console.log("hello")
      margin = 0
      font = 14;
      fontTop: 25;
    }


    return (
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

          <View style={{ justifyContent: 'center' }}>
            <TopSection name={this.props.navigation.getParam('name', 'NO-NAME')} back={() => { this.back() }} openModal={() => this.openModal()} windowWidth={this.state.windowWidth} />
            <View>
              <View style={{ marginBottom: 10 }}>
                <Card
                  style={cardStyle}
                  bodyContent={

                    <View style={{ backgroundColor: 'white', alignSelf: 'center', width: '100%', height: '700px', padding: 0, paddingTop: 20 }}>
                      <View style={{ padding: 0, }}>
                        <View style={{ marginTop: 20 }}>
                          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 5, alignSelf: 'center' }}>Application form PDF preview</Text>
                        </View>
                        <View style={{}}>
                          {/* <PDFViewer
                            navbarOnTop={true}
                            loader={true}
                            scale={scale}
                            document={{
                              css: true,
                              // url: require('./account_opening_form.pdf')
                            }}
                          /> */}
                        </View>
                      </View>
                    </View>

                  }
                />


              </View>


            </View>
            <View style={{ flexDirection: 'row', marginTop: 10, alignSelf: 'center' }}>
              <TouchableOpacity onPress={() => { this.movetonextpage() }} style={{ flex: 3, width: 50, backgroundColor: '#B02A31', borderColor: 'white', borderRadius: 20, height: 35, width: 150, cursor: 'pointer', marginBottom: 20 }}><Text style={{ fontSize: 12, color: '#696969', fontSize: font, fontWeight: '500', textAlign: 'center', color: 'white', marginTop: 8 }}>CONTINUE</Text></TouchableOpacity>
            </View>

          </View>

        </ScrollView>
      </ThemeProvider>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    alignItems: "center",
    backgroundColor: 'white'
  },
});

export default pdfView;