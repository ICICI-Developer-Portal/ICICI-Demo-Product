import React, { Component } from 'react';
import { View, Linking, Text, TextInput, Platform, StyleSheet, ScrollView, TouchableHighlight, Image, TouchableOpacity, Dimensions } from "react-native";
import { Button, Switcher, SegmentedControlButton, B, P, Input, Spinner, H4 } from 'nachos-ui'
import { ThemeProvider, Card } from "nachos-ui";

const ProfileDetailsInput = (props) => {
    var flex = props.flex
    if(props.windowWidth > 850){
		return (
              <Card
                style={props.cardStyle}
                bodyContent={
                  <View>
                    <View style={{ backgroundColor: 'white',  alignSelf: 'center', width: '100%', borderRadius: 8 }}>

                      <View style={{ width: '100%', marginTop: 10 }}>

                        {props.elements_profile.map((item, index) => {
                          var half = Math.floor((props.elements_profile.length + 2) / 2);
                          if(index < half && item.visible) {
                            return (

                              <View>
                                {item.type == 'radio' ? (
                                  <View style={{ margin: 20, marginTop: 10 }}>
                                    <Text style={{ color: 'black', marginLeft: 10, fontWeight: '400',fontFamily:'sans-serif', fontSize: 16 }}>{item.name}</Text>


                                    {item.value.map((val, index) => {
                                      if (index < (item.value.length) / 4)
                                        return (
                                          <View style={{ flexDirection: 'row', marginTop: 40, marginRight: props.margin }}>
                                            {item.value.map((val1, index1) => {
                                              if (index1 >= 4 * index && index1 < 4 * (index + 1) && index1 < item.value.length)
                                                if (val1 != item.selected && val1.length < 8) {
                                                  flex = 0.15
                                                  return (<TouchableOpacity  onClick={() => { props.radioBtn(item.name, val1, "") }} style={{ flex: flex, margin: 6, shadowColor:"#d3d3d3", shadowOpacity:1, shadowRadius:10 ,borderColor: 'white', backgroundColor: 'white', borderWidth: 1, borderColor: 'white', borderRadius: 0, height: 35, width: 60, marginTop: -25, cursor: 'pointer' }}><Text style={{ fontSize: 12, color: '#333', fontSize: props.font, fontWeight: '600',fontFamily:'sans-serif', textAlign: 'center', marginTop: 8 }}>{val1}</Text></TouchableOpacity>)
                                                } else if (val1.length < 8) {
                                                  flex = 0.15
                                                  return (<TouchableOpacity  onClick={() => { props.radioBtn(item.name, val1, "") }} style={{ flex: flex, shadowColor:"#d3d3d3", shadowOpacity:1, shadowRadius:10 ,borderColor: 'white', margin: 6, backgroundColor: '#B02A30', borderRadius: 0, height: 35, width: 60, marginTop: -25, cursor: 'pointer' }}><Text style={{ fontSize: 12, color: 'white', fontSize: props.font, fontWeight: '600', textAlign: 'center',fontFamily:'sans-serif', marginTop: 8 }}>{val1}</Text></TouchableOpacity>)
                                                } else if (val1 != item.selected) {
                                                  flex = 0.2
                                                  return (<TouchableOpacity  onClick={() => { props.radioBtn(item.name, val1, "") }} style={{ flex: flex, margin: 6, shadowColor:"#d3d3d3", shadowOpacity:1, shadowRadius:10 ,borderColor: 'white', backgroundColor: 'white', borderWidth: 1, borderColor: 'white', borderRadius: 0, height: 35, width: 60, marginTop: -25, cursor: 'pointer' }}><Text style={{ fontSize: 12, color: '#333', fontSize: props.font, fontWeight: '600',fontFamily:'sans-serif', textAlign: 'center', marginTop: 8 }}>{val1}</Text></TouchableOpacity>)
                                                } else {
                                                  flex = 0.2
                                                  return (<TouchableOpacity  onClick={() => { props.radioBtn(item.name, val1, "") }} style={{ flex: flex, shadowColor:"#d3d3d3", shadowOpacity:1, shadowRadius:10 ,borderColor: 'white', margin: 6, backgroundColor: '#B02A30', borderRadius: 0, height: 35, width: 60, marginTop: -25, cursor: 'pointer' }}><Text style={{ fontSize: 12, color: 'white', fontSize: props.font, fontWeight: '600', textAlign: 'center',fontFamily:'sans-serif', marginTop: 8 }}>{val1}</Text></TouchableOpacity>)
                                                }
                                            })}
                                          </View>
                                        )
                                    })}


                                    {(item.dependentVisible && item.dependentView.includes(item.selected)) ? (
                                      <View style={{ marginTop: 5, borderWidth: 1, padding: 10, borderColor: 'white', marginRight: props.margin, shadowColor: "#000",
                                      shadowOffset: {
                                        width: 0,
                                        height: 0,
                                      },
                                      shadowOpacity: 0.2,
                                      shadowRadius: 4.00,
                                      
                                      elevation: 24,}}>
                                        {item.dependent.map((dependent, index) => {
                                          if (index < (item.dependent.length) / 4)
                                            return (
                                              <View style={{ flexDirection: 'row', marginTop: 30 }}>
                                                {item.dependent.map((val1, index1) => {
                                                  if (index1 >= 4 * index && index1 < 4 * (index + 1) && index1 <= item.dependent.length)
                                                    if (val1 != item.dependentSelected && val1.length < 8) {
                                                      flex = 0.2
                                                      return (<TouchableOpacity  onClick={() => { props.radioBtn(item.name, val1, item.name) }} style={{ flex: flex, shadowColor:"#d3d3d3", shadowOpacity:1, shadowRadius:10 ,borderColor: 'white', margin: 6, backgroundColor: 'white', borderWidth: 1, borderColor: 'white', borderRadius: 0, height: 35, width: 60, marginTop: -25, cursor: 'pointer' }}><Text style={{ fontSize: 12, color: '#333', fontSize: props.font, fontWeight: '600', textAlign: 'center', marginTop: 8,fontFamily:'sans-serif', }}>{val1}</Text></TouchableOpacity>)
                                                    } else if (val1.length < 8) {
                                                      flex = 0.2
                                                      return (<TouchableOpacity  onClick={() => { props.radioBtn(item.name, val1, item.name) }} style={{ flex: flex, shadowColor:"#d3d3d3", shadowOpacity:1, shadowRadius:10 ,borderColor: 'white', margin: 6, backgroundColor: '#B02A30', borderRadius: 0, height: 35, width: 60, marginTop: -25, cursor: 'pointer' }}><Text style={{ fontSize: 12, color: 'white', fontSize: props.font, fontWeight: '600', textAlign: 'center',fontFamily:'sans-serif', marginTop: 8 }}>{val1}</Text></TouchableOpacity>)
                                                    } else if (val1 != item.dependentSelected) {
                                                      flex = 0.2
                                                      return (<TouchableOpacity  onClick={() => { props.radioBtn(item.name, val1, item.name) }} style={{ flex: flex, shadowColor:"#d3d3d3", shadowOpacity:1, shadowRadius:10 ,borderColor: 'white', margin: 6, backgroundColor: 'white', borderWidth: 1, borderColor: 'white', borderRadius: 0, height: 35, width: 60, marginTop: -25, cursor: 'pointer' }}><Text style={{ fontSize: 12, color: '#333', fontSize: props.font, fontWeight: '600',fontFamily:'sans-serif', textAlign: 'center', marginTop: 8 }}>{val1}</Text></TouchableOpacity>)
                                                    } else {
                                                      flex = 0.2
                                                      return (<TouchableOpacity  onClick={() => { props.radioBtn(item.name, val1, item.name) }} style={{ flex: flex, shadowColor:"#d3d3d3", shadowOpacity:1, shadowRadius:10 ,borderColor: 'white', margin: 6, backgroundColor: '#B02A30', borderRadius: 0, height: 35, width: 60, marginTop: -25, cursor: 'pointer' }}><Text style={{ fontSize: 12, color: 'white', fontSize: props.font, fontWeight: '600', textAlign: 'center',fontFamily:'sans-serif', marginTop: 8 }}>{val1}</Text></TouchableOpacity>)
                                                    }
                                                })}
                                              </View>
                                            )
                                        })}
                                      </View>
                                    ) : (<View></View>)}

                                  </View>
                                ) : (

                                    <View style={{ margin: 20, marginTop: 10 }}>
                                      <Text style={{ color: 'black', marginLeft: 10, fontWeight: '400',fontFamily:'sans-serif', fontSize: 16 }}>{item.name}<Text style={{ color: 'black',  fontWeight: '400',fontFamily:'sans-serif', fontSize: 16 }}> (in years)</Text><Text style={{color:'red'}}>*</Text></Text>
                                      <View style={{ marginRight: props.margin }}>
                                        <TextInput
                                         style={{width: '-webkit-fill-available', marginLeft: 10,height:44,borderColor:'transparent',borderBottomColor: '#dadada', borderWidth:0.5}}
                                         // style={props.inputStyle}
                                          placeholder='PLEASE ENTER YOUR AGE'
                                          maxLength={2}
                                          value={props.elements_profile[1]["value"]}
                                          onChangeText={(value) => { props.inputChange(item.name, value) }}
                                        />
                                        {item.correct ? (<View />) : (<Text style={{ color: 'red', margin: 5, marginLeft: 5 }}>Enter Your Age</Text>)}
                                      </View>
                                    </View>

                                  )}

                              </View>
                            )
                          }

                        }

                        )}


                      </View>
                      <View style={{ width: '100%', marginTop: 10 }}>

                        {props.elements_profile.map((item, index) => {
                          var half = Math.floor((props.elements_profile.length + 2) / 2);
                           if (index >= half && item.visible) {
                            return (

                              <View>
                                {item.type == 'radio' ? (
                                  <View style={{ margin: 20, marginTop: 0,marginBottom:0 }}>
                                    <Text style={{ color: 'black', marginLeft: 10, fontWeight: '400',fontFamily:'sans-serif', fontSize: 16 }}>{item.name}</Text>


                                    {item.value.map((val, index) => {
                                      if (index < (item.value.length + 2) / 3)
                                        return (
                                          <View style={{ flexDirection: 'row', marginTop:40, marginRight: props.margin }}>
                                            {item.value.map((val1, index1) => {
                                              if (index1 >= 4 * index && index1 < 4 * (index + 1) && index1 <= item.value.length)
                                                if (val1 != item.selected && val1.length < 8) {
                                                  flex = 0.2
                                                  return (<TouchableOpacity  onClick={() => { props.radioBtn(item.name, val1, "") }} style={{ flex: flex, margin: 6, shadowColor:"#d3d3d3", shadowOpacity:1, shadowRadius:10 ,borderColor: 'white', backgroundColor: 'white', borderWidth: 1, borderColor: 'white', borderRadius: 0, height: 35, width: 60, marginTop: -25, cursor: 'pointer' }}><Text style={{ fontFamily:'sans-serif',fontSize: 12, color: '#333', fontSize: props.font, fontWeight: '600', textAlign: 'center', marginTop: 8 }}>{val1}</Text></TouchableOpacity>)
                                                } else if (val1.length < 8) {
                                                  flex = 0.2
                                                  return (<TouchableOpacity  onClick={() => { props.radioBtn(item.name, val1, "") }} style={{ flex: flex, shadowColor:"#d3d3d3", shadowOpacity:1, shadowRadius:10 ,borderColor: 'white', margin: 6, backgroundColor: '#B02A30', borderRadius: 0, height: 35, width: 60, marginTop: -25, cursor: 'pointer' }}><Text style={{ fontFamily:'sans-serif',fontSize: 12, color: 'white', fontSize: props.font, fontWeight: '600', textAlign: 'center', marginTop: 8 }}>{val1}</Text></TouchableOpacity>)
                                                } else if (val1 != item.selected) {
                                                  flex = 0.2
                                                  return (<TouchableOpacity  onClick={() => { props.radioBtn(item.name, val1, "") }} style={{ flex: flex, margin: 6, shadowColor:"#d3d3d3", shadowOpacity:1, shadowRadius:10 ,borderColor: 'white', backgroundColor: 'white', borderWidth: 1, borderColor: 'white', borderRadius: 0, height: 35, width: 60, marginTop: -25, cursor: 'pointer' }}><Text style={{fontFamily:'sans-serif',fontSize: 12, color: '#333', fontSize: props.font, fontWeight: '600', textAlign: 'center', marginTop: 8 }}>{val1}</Text></TouchableOpacity>)
                                                } else {
                                                  flex = 0.2
                                                  return (<TouchableOpacity  onClick={() => { props.radioBtn(item.name, val1, "") }} style={{ flex: flex, shadowColor:"#d3d3d3", shadowOpacity:1, shadowRadius:10 ,borderColor: 'white', margin: 6, backgroundColor: '#B02A30', borderRadius: 0, height: 35, width: 60, marginTop: -25, cursor: 'pointer' }}><Text style={{fontFamily:'sans-serif', fontSize: 12, color: 'white', fontSize: props.font, fontWeight: '600', textAlign: 'center', marginTop: 8 }}>{val1}</Text></TouchableOpacity>)
                                                }
                                            })}
                                          </View>
                                        )
                                    })}

                                    {(item.dependentVisible && item.dependentView.includes(item.selected)) ? (
                                      <View style={{ marginTop: 5, borderWidth: 1, padding: 10, borderColor: 'white', marginRight: 0, borderRadius: 10, backgroundColor: '#F6F6F6' }}>
                                        <View style={{ flexDirection: 'row', marginTop: 30 }}>
                                          {item.dependent.map((dependent, index) => {
                                            if (dependent != item.dependentSelected && dependent.length < 8) {
                                              flex = 0.2
                                              return (<TouchableOpacity  onClick={() => { this.radioBtn(item.name, dependent, item.name) }} style={{ flex: flex, shadowColor:"#d3d3d3", shadowOpacity:1, shadowRadius:10 ,borderColor: 'white', margin: 6, backgroundColor: 'white', borderWidth: 1, borderColor: 'white', borderRadius: 0, height: 35, width: 60, marginTop: -25, cursor: 'pointer' }}><Text style={{ fontSize: 12, color: '#333', fontSize: props.font, fontWeight: '600', textAlign: 'center', fontFamily:'sans-serif',marginTop: 8 }}>{dependent}</Text></TouchableOpacity>)
                                            } else if (dependent.length < 8) {
                                              flex = 0.2
                                              return (<TouchableOpacity  onClick={() => { this.radioBtn(item.name, dependent, item.name) }} style={{ flex: flex, shadowColor:"#d3d3d3", shadowOpacity:1, shadowRadius:10 ,borderColor: 'white', margin: 6, backgroundColor: '#B02A30', borderRadius: 0, height: 35, width: 60, marginTop: -25, cursor: 'pointer' }}><Text style={{ fontSize: 12, color: 'white', fontSize: props.font, fontWeight: '600', textAlign: 'center',fontFamily:'sans-serif', marginTop: 8 }}>{dependent}</Text></TouchableOpacity>)
                                            } else if (dependent != item.dependentSelected) {
                                              flex = 0.2
                                              return (<TouchableOpacity  onClick={() => { this.radioBtn(item.name, dependent, item.name) }} style={{ flex: flex, shadowColor:"#d3d3d3", shadowOpacity:1, shadowRadius:10 ,borderColor: 'white', margin: 6, backgroundColor: 'white', borderWidth: 1, borderColor: 'white', borderRadius: 0, height: 35, width: 60, marginTop: -25, cursor: 'pointer' }}><Text style={{ fontSize: 12, color: '#333', fontSize: props.font, fontWeight: '600',fontFamily:'sans-serif', textAlign: 'center', marginTop: 8 }}>{dependent}</Text></TouchableOpacity>)
                                            } else {
                                              flex = 0.2
                                              return (<TouchableOpacity  onClick={() => { this.radioBtn(item.name, dependent, item.name) }} style={{ flex: flex, shadowColor:"#d3d3d3", shadowOpacity:1, shadowRadius:10 ,borderColor: 'white', margin: 6, backgroundColor: '#B02A30', borderRadius: 0, height: 35, width: 60, marginTop: -25, cursor: 'pointer' }}><Text style={{ fontSize: 12, color: 'white', fontSize: props.font, fontWeight: '600', textAlign: 'center', fontFamily:'sans-serif',marginTop: 8 }}>{dependent}</Text></TouchableOpacity>)
                                            }
                                          })}
                                        </View>
                                      </View>
                                    ) : (<View></View>)}

                                  </View>
                                ) : (

                                    <View style={{ margin: 40, marginTop: 10 }}>
                                      <Text style={{ color: 'black', marginTop: -20, marginLeft: 10,fontFamily:'sans-serif', fontWeight: '400' }}>{item.name}</Text>
                                      <View style={{ marginTop: 40, marginRight: props.margin }}>
                                        <Input
                                          style={props.inputStyle}
                                          placeholder='Please Enter your Age'
                                          maxLength={2}
                                          value={this.state.elements_profile[1]["value"]}
                                          onChangeText={(value) => { this.inputChange(item.name, value) }}
                                        />
                                        {item.correct ? (<View />) : (<Text style={{ color: 'red', margin: 5, marginLeft: 10 }}>Enter Your Age</Text>)}
                                      </View>
                                    </View>

                                  )}

                              </View>
                            )
                          }

                        }

                        )}


                      </View>
                    </View>
                  </View>}
              />
		)
  }else{
    var font = 12;
    var flex = 0.4
    if(props.windowWidth < 380){
      font = 10;
    }
    var margin = 0;
    const cardStyle = { minWidth: 330, width: '90%', color: 'white', alignSelf: 'center', borderRadius: 10 }
    const inputStyle = { width: '100%', flex: 1, marginLeft: 8, marginRight:8, shadowColor:"#d3d3d3", shadowOpacity:1, shadowRadius:10 ,borderColor: 'transparent',borderBottomColor: '#dadada',  }

    return(
              <Card
                style={cardStyle}
                bodyContent={
                  <View style={{ backgroundColor: 'white', alignSelf: 'center', width: '100%' }}>

                    <View style={{ width: '100%', marginTop: 0, height:'100%' }}>
                      {props.elements_profile.map((item, index) => {

                        if (index > 0 && item.visible) {
                          return (
                            <View>
                              {item.type == 'radio' ? (
                                <View style={{ margin: 20, marginTop: 0 }}>
                                  <Text style={{ color: 'black', marginLeft: 10, fontWeight: '400',fontFamily:'sans-serif', fontSize: 16 }}>{item.name}</Text>


                                  {item.value.map((val, index) => {
                                    if (index < (item.value.length) / 3)
                                      return (
                                        <View style={{ flexDirection: 'row', marginTop: 40, marginRight: margin }}>
                                          {item.value.map((val1, index1) => {
                                            if (index1 >= 3 * index && index1 < 3 * (index + 1) && index1 < item.value.length)
                                              if (val1 != item.selected && val1.length < 8) {
                                                flex = 0.4
                                                return (<TouchableOpacity  onClick={() => { props.radioBtn(item.name, val1, "") }} style={{ flex: flex, margin: 6, shadowColor:"#d3d3d3", shadowOpacity:1, shadowRadius:10 ,borderColor: 'white', backgroundColor: 'white', borderWidth: 1, borderColor: 'white', borderRadius: 0, height: 35, width: 60, marginTop: -25, cursor: 'pointer' }}><Text style={{ fontSize: 12, color: '#333', fontSize: font, fontWeight: '600', textAlign: 'center',fontFamily:'sans-serif', marginTop: 10 }}>{val1}</Text></TouchableOpacity>)
                                              } else if (val1.length < 8) {
                                                flex = 0.4
                                                return (<TouchableOpacity  onClick={() => { props.radioBtn(item.name, val1, "") }} style={{ flex: flex, shadowColor:"#d3d3d3", shadowOpacity:1, shadowRadius:10 ,borderColor: 'white', margin: 6, backgroundColor: '#B02A30', borderRadius: 0, height: 35, width: 60, marginTop: -25, cursor: 'pointer' }}><Text style={{ fontSize: 12, color: 'white', fontSize: font, fontWeight: '600', textAlign: 'center',fontFamily:'sans-serif', marginTop: 10 }}>{val1}</Text></TouchableOpacity>)
                                              } else if (val1 != item.selected) {
                                                flex = 0.6
                                                return (<TouchableOpacity  onClick={() => { props.radioBtn(item.name, val1, "") }} style={{ flex: flex, margin: 6, shadowColor:"#d3d3d3", shadowOpacity:1, shadowRadius:10 ,borderColor: 'white', backgroundColor: 'white', borderWidth: 1, borderColor: 'white', borderRadius: 0, height: 35, width: 60, marginTop: -25, cursor: 'pointer' }}><Text style={{ fontSize: 12, color: '#333', fontSize: font, fontWeight: '600',fontFamily:'sans-serif', textAlign: 'center', marginTop: 10 }}>{val1}</Text></TouchableOpacity>)
                                              } else {
                                                flex = 0.6
                                                return (<TouchableOpacity  onClick={() => { props.radioBtn(item.name, val1, "") }} style={{ flex: flex, shadowColor:"#d3d3d3", shadowOpacity:1, shadowRadius:10 ,borderColor: 'white', margin: 6, backgroundColor: '#B02A30', borderRadius: 0, height: 35, width: 60, marginTop: -25, cursor: 'pointer' }}><Text style={{ fontSize: 12, color: 'white', fontSize: font, fontWeight: '600', textAlign: 'center', fontFamily:'sans-serif',marginTop: 10 }}>{val1}</Text></TouchableOpacity>)
                                              }
                                          })}
                                        </View>
                                      )
                                  })}


                                  {(item.dependentVisible && item.dependentView.includes(item.selected)) ? (
                                    <View style={{ marginTop: 5, borderWidth: 1, borderColor: 'white', padding: 10, marginRight: 20, borderRadius: 10, backgroundColor: '#F6F6F6' }}>
                                      {item.dependent.map((dependent, index) => {
                                        if (index < (item.dependent.length) / 3)
                                          return (
                                            <View style={{ flexDirection: 'row', marginTop: 30 }}>
                                              {item.dependent.map((val1, index1) => {
                                                if (index1 >= 3 * index && index1 < 3 * (index + 1) && index1 <= item.dependent.length)
                                                  if (val1 != item.dependentSelected && val1.length < 8) {
                                                    flex = 0.4
                                                    return (<TouchableOpacity  onClick={() => { props.radioBtn(item.name, val1, item.name) }} style={{ flex: flex, shadowColor:"#d3d3d3", shadowOpacity:1, shadowRadius:10 ,borderColor: 'white', margin: 6, backgroundColor: 'white', borderWidth: 1, borderColor: 'white', borderRadius: 0, height: 35, width: 60, marginTop: -25, cursor: 'pointer' }}><Text style={{ fontSize: 12, color: '#333', fontSize: font, fontWeight: '600',fontFamily:'sans-serif', textAlign: 'center', marginTop: 10 }}>{val1}</Text></TouchableOpacity>)
                                                  } else if (val1.length < 8) {
                                                    flex = 0.4
                                                    return (<TouchableOpacity  onClick={() => { props.radioBtn(item.name, val1, item.name) }} style={{ flex: flex, shadowColor:"#d3d3d3", shadowOpacity:1, shadowRadius:10 ,borderColor: 'white', margin: 6, backgroundColor: '#B02A30', borderRadius: 0, height: 35, width: 60, marginTop: -25, cursor: 'pointer' }}><Text style={{ fontSize: 12, color: 'white', fontSize: font, fontWeight: '600', textAlign: 'center',fontFamily:'sans-serif', marginTop: 10 }}>{val1}</Text></TouchableOpacity>)
                                                  } else if (val1 != item.dependentSelected) {
                                                    flex = 0.6
                                                    return (<TouchableOpacity  onClick={() => { props.radioBtn(item.name, val1, item.name) }} style={{ flex: flex, shadowColor:"#d3d3d3", shadowOpacity:1, shadowRadius:10 ,borderColor: 'white', margin: 6, backgroundColor: 'white', borderWidth: 1, borderColor: 'white', borderRadius: 0, height: 35, width: 60, marginTop: -25, cursor: 'pointer' }}><Text style={{ fontSize: 12, color: '#333', fontSize: font,fontFamily:'sans-serif', fontWeight: '600', textAlign: 'center', marginTop: 10 }}>{val1}</Text></TouchableOpacity>)
                                                  } else {
                                                    flex = 0.6
                                                    return (<TouchableOpacity  onClick={() => { props.radioBtn(item.name, val1, item.name) }} style={{ flex: flex, shadowColor:"#d3d3d3", shadowOpacity:1, shadowRadius:10 ,borderColor: 'white', margin: 6, backgroundColor: '#B02A30', borderRadius: 0, height: 35, width: 60, marginTop: -25, cursor: 'pointer' }}><Text style={{ fontSize: 12, color: 'white', fontSize: font, fontWeight: '600', textAlign: 'center',fontFamily:'sans-serif', marginTop: 10 }}>{val1}</Text></TouchableOpacity>)
                                                  }
                                              })}
                                            </View>
                                          )
                                      })}
                                    </View>
                                  ) : (<View></View>)}

                                </View>
                              ) : (

                                  <View style={{ margin: 20, marginTop: 0, }}>
                                  <Text style={{ color: 'black', marginLeft: 10, fontWeight: '400',fontFamily:'sans-serif', fontSize: 16 }}>{item.name}</Text>
                                    <View style={{ marginTop: 10 }}>
                                      <Input
                                        style={inputStyle}
                                        placeholder='Please Enter your Age'
                                        maxLength={2}
                                        value={props.elements_profile[1]["value"]}
                                        onChangeText={(value) => { props.inputChange(item.name, value) }}
                                      />
                                      {item.correct ? (<View />) : (<Text style={{ color: 'red', margin: 5, marginLeft: 10 }}>Enter Your Age</Text>)}
                                    </View>
                                  </View>

                                )}

                            </View>

                          )
                        } else if(item.visible) {

                          return (
                            <View>
                              {item.type == 'radio' ? (
                                <View style={{ margin: 20, marginTop: 40 }}>
                                  <Text style={{ color: 'black', marginLeft: 10, fontWeight: '400',fontFamily:'sans-serif', fontSize: 16 }}>{item.name}</Text>


                                  {item.value.map((val, index) => {
                                    if (index < (item.value.length) / 3)
                                      return (
                                        <View style={{ flexDirection: 'row', marginTop: 40, marginRight: margin }}>
                                          {item.value.map((val1, index1) => {
                                            if (index1 >= 3 * index && index1 < 3 * (index + 1) && index1 < item.value.length)
                                              if (val1 != item.selected && val1.length < 8) {
                                                flex = 0.4
                                                return (<TouchableOpacity  onClick={() => { props.radioBtn(item.name, val1, "") }} style={{ flex: flex, margin: 6, shadowColor:"#d3d3d3", shadowOpacity:1, shadowRadius:10 ,borderColor: 'white', backgroundColor: 'white', borderWidth: 1, borderColor: 'white', borderRadius: 0, height: 35, width: 60, marginTop: -25, cursor: 'pointer' }}><Text style={{ fontSize: 12,fontFamily:'sans-serif', color: '#333', fontSize: font, fontWeight: '600', textAlign: 'center', marginTop: 10 }}>{val1}</Text></TouchableOpacity>)
                                              } else if (val1.length < 8) {
                                                flex = 0.4
                                                return (<TouchableOpacity  onClick={() => { props.radioBtn(item.name, val1, "") }} style={{ flex: flex, shadowColor:"#d3d3d3", shadowOpacity:1, shadowRadius:10 ,borderColor: 'white', margin: 6, backgroundColor: '#B02A30', borderRadius: 0, height: 35, width: 60, marginTop: -25, cursor: 'pointer' }}><Text style={{ fontSize: 12, color: 'white',fontFamily:'sans-serif', fontSize: font, fontWeight: '600', textAlign: 'center', marginTop: 10 }}>{val1}</Text></TouchableOpacity>)
                                              } else if (val1 != item.selected) {
                                                flex = 0.6
                                                return (<TouchableOpacity  onClick={() => { props.radioBtn(item.name, val1, "") }} style={{ flex: flex, margin: 6, shadowColor:"#d3d3d3", shadowOpacity:1, shadowRadius:10 ,borderColor: 'white', backgroundColor: 'white', borderWidth: 1, borderColor: 'white', borderRadius: 0, height: 35, width: 60, marginTop: -25, cursor: 'pointer' }}><Text style={{ fontSize: 12,fontFamily:'sans-serif', color: '#333', fontSize: font, fontWeight: '600', textAlign: 'center', marginTop: 10 }}>{val1}</Text></TouchableOpacity>)
                                              } else {
                                                flex = 0.6
                                                return (<TouchableOpacity activeOpacity={1} onClick={() => { props.radioBtn(item.name, val1, "") }} style={{ flex: flex, shadowColor:"#d3d3d3", shadowOpacity:1, shadowRadius:10 ,borderColor: 'white', margin: 6, backgroundColor: '#B02A30', borderRadius: 0, height: 35, width: 60, marginTop: -25, cursor: 'pointer' }}><Text style={{ fontSize: 12, color: 'white',fontFamily:'sans-serif', fontSize: font, fontWeight: '600', textAlign: 'center', marginTop: 10 }}>{val1}</Text></TouchableOpacity>)
                                              }
                                          })}
                                        </View>
                                      )
                                  })}


                                  {(item.dependentVisible && item.dependentView.includes(item.selected)) ? (
                                    <View style={{ marginTop: 5, borderWidth: 1, borderColor: 'white', padding: 10, marginRight: 20, borderRadius: 10, backgroundColor: '#F6F6F6' }}>
                                      {item.dependent.map((dependent, index) => {
                                        if (index < (item.dependent.length) / 3)
                                          return (
                                            <View style={{ flexDirection: 'row', marginTop: 30 }}>
                                              {item.dependent.map((val1, index1) => {
                                                if (index1 >= 3 * index && index1 < 3 * (index + 1) && index1 <= item.dependent.length)
                                                  if (val1 != item.dependentSelected && val1.length < 8) {
                                                    flex = 0.4
                                                    return (<TouchableOpacity  onClick={() => { props.radioBtn(item.name, val1, item.name) }} style={{ flex: flex, shadowColor:"#d3d3d3", shadowOpacity:1, shadowRadius:10 ,borderColor: 'white', margin: 6, backgroundColor: 'white', borderWidth: 1, borderColor: 'white', borderRadius: 0, height: 35, width: 60, marginTop: -25, cursor: 'pointer' }}><Text style={{ fontSize: 12,fontFamily:'sans-serif', color: '#333', fontSize: font, fontWeight: '600', textAlign: 'center', marginTop: 10 }}>{val1}</Text></TouchableOpacity>)
                                                  } else if (val1.length < 8) {
                                                    flex = 0.4
                                                    return (<TouchableOpacity  onClick={() => { props.radioBtn(item.name, val1, item.name) }} style={{ flex: flex, shadowColor:"#d3d3d3", shadowOpacity:1, shadowRadius:10 ,borderColor: 'white', margin: 6, backgroundColor: '#B02A30', borderRadius: 0, height: 35, width: 60, marginTop: -25, cursor: 'pointer' }}><Text style={{ fontSize: 12,fontFamily:'sans-serif', color: 'white', fontSize: font, fontWeight: '600', textAlign: 'center', marginTop: 10 }}>{val1}</Text></TouchableOpacity>)
                                                  } else if (val1 != item.dependentSelected) {
                                                    flex = 0.6
                                                    return (<TouchableOpacity  onClick={() => { props.radioBtn(item.name, val1, item.name) }} style={{ flex: flex, shadowColor:"#d3d3d3", shadowOpacity:1, shadowRadius:10 ,borderColor: 'white', margin: 6, backgroundColor: 'white', borderWidth: 1, borderColor: 'white', borderRadius: 0, height: 35, width: 60, marginTop: -25, cursor: 'pointer' }}><Text style={{ fontSize: 12, fontFamily:'sans-serif',color: '#333', fontSize: font, fontWeight: '600', textAlign: 'center', marginTop: 10 }}>{val1}</Text></TouchableOpacity>)
                                                  } else {
                                                    flex = 0.6
                                                    return (<TouchableOpacity  onClick={() => { props.radioBtn(item.name, val1, item.name) }} style={{ flex: flex, shadowColor:"#d3d3d3", shadowOpacity:1, shadowRadius:10 ,borderColor: 'white', margin: 6, backgroundColor: '#B02A30', borderRadius: 0, height: 35, width: 60, marginTop: -25, cursor: 'pointer' }}><Text style={{ fontSize: 12,fontFamily:'sans-serif', color: 'white', fontSize: font, fontWeight: '600', textAlign: 'center', marginTop: 10 }}>{val1}</Text></TouchableOpacity>)
                                                  }
                                              })}
                                            </View>
                                          )
                                      })}
                                    </View>
                                  ) : (<View></View>)}

                                </View>
                              ) : (

                                  <View style={{ margin: 20, marginTop: 0 }}>
                                    <View style={{ marginTop: 30, marginRight: 0 }}>
                                    <Text style={{ color: 'black', marginLeft: 10, fontWeight: '400',fontFamily:'sans-serif', fontSize: 16 }}>{item.name}</Text>
                                      <Input
                                        style={inputStyle}
                                        placeholder='Please Enter your Age'
                                        maxLength={2}
                                        value={props.elements_profile[1]["value"]}
                                        onChangeText={(value) => { props.inputChange(item.name, value) }}
                                      />
                                      {item.correct ? (<View />) : (<Text style={{ color: 'red', margin: 5, marginLeft: 10 }}>Enter Your Age</Text>)}
                                    </View>
                                  </View>

                                )}

                            </View>

                          )





                        }
                      })}

                    </View>

                  </View>}
              />

    )
  }
} 

export default ProfileDetailsInput;