import React, { Component } from 'react';
import { View, Linking, Text, TextInput, Platform, StyleSheet, ScrollView, TouchableHighlight, Image, TouchableOpacity, Dimensions } from "react-native";
import { Button, Switcher, SegmentedControlButton, B, P, Input, Spinner, H4 } from 'nachos-ui'

const loader = (props) => {
	if(props.loading){
		return (
			<View style={(props.windowWidth > 767 ? styles.loaderNormal : styles.loaderMobile)}
	          >
	            <View style={{ padding: 20 }}>
	              <Spinner style={{ zIndex: 99 }} color="#ffffff" />
	            </View>
	         </View>
		)
	}else{
		return (
			<View>
	        </View>
		)
	}
} 
const styles = StyleSheet.create({
	loaderNormal: {
		position: 'absolute',
		minHeight: 'auto',
		height: '51.5vw',
		zIndex: 10,
		width: '100%',
		alignItems: 'center', 
		justifyContent: 'center', 
		alignSelf: 'center', 
		backgroundColor: 'rgba(0,0,0,.8)', 
		borderColor: 'transparent', 
		borderWidth: 1,
	},
	loaderMobile: {
		position: 'absolute',
		minHeight: 'auto',
		height: '220vw',
		zIndex: 10,
		width: '100%',
		alignItems: 'center', 
		justifyContent: 'center', 
		alignSelf: 'center', 
		backgroundColor: 'rgba(0,0,0,.8)', 
		borderColor: 'transparent', 
		borderWidth: 1,
	}
})

export default loader;