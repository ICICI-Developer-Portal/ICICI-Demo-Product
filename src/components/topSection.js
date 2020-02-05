import React, { Component } from 'react';
import { View, Linking, Text, TextInput, Platform, StyleSheet, ScrollView, TouchableHighlight, Image, TouchableOpacity, Dimensions } from "react-native";
import { Button, Switcher, SegmentedControlButton, B, P, Input, Spinner, H4 } from 'nachos-ui'

const topSection = (props) => {
	if(props.windowWidth > 850){
		return (
            <View style={{width:'100%', marginBottom: 5, marginBottom: 15, marginTop: 15, marginLeft: 40, marginRight: 40, alignItems: 'center', flexDirection: 'row' }}>
              <View style={{ backgroundColor: '#F36414', alignSelf: 'center', width: 45, height: 45, borderRadius: 35, }}>
                <TouchableOpacity onClick={() => props.back()} style={{ resizeMode: 'contain', width: '100%', height: '100%',alignItems:'center',justifyContent:'center' }}>
                  <Image style={{ width: '65%', height: '65%', alignSelf: 'center', resizeMode: 'contain' }} source={require('../assets/images/backicon.png')} />
                </TouchableOpacity>
              </View>
              
            </View>
		)
	}else{
        return(
          <View style={{width:'100%'}}>
            <View style={{ marginBottom: 5, marginBottom: 15, marginTop: 15, marginLeft: 40, marginRight: 40, alignItems: 'center', flexDirection: 'row' }}>
              <View style={{ backgroundColor: '#F36414', alignSelf: 'center', width: 40, height: 40, borderRadius: 35, }}>
                <TouchableOpacity onClick={() => props.back()} style={{ resizeMode: 'contain', width: '100%', height: '100%',alignItems:'center',justifyContent:'center'  }}>
                  <Image style={{ width: '65%', height: '65%', alignSelf: 'center', resizeMode: 'contain' }} source={require('../assets/images/backicon.png')} />
                </TouchableOpacity>
              </View>
             

            </View>
           
           </View>
        )

	}
} 

export default topSection;