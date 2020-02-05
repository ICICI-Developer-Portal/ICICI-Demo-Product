import React from 'react';
import { View } from "react-native";

const blackOut = (props) => {
	if(props.modalopenhide){
		return (
            <View
	            style={{
	              position: 'fixed',
	              minHeight: 'auto',
	              zIndex: 9,
	              width: '100%',

	              marginLeft: 'auto',
	              marginRight: 'auto',
	              left: 0,
	              right: 0,
	              marginTop: 'auto',
	              marginBottom: 'auto',
	              top: 0,
	              bottom: 0,
	              width: '100%',
	              alignItems: 'center', justifyContent: 'center', alignSelf: 'center', backgroundColor: 'rgba(0, 0, 0, 0.9)', borderColor: 'transparent', borderWidth: 1,
	            }}
	          >
	            <View style={{ padding: 20 }}>
	              <View style={{ zIndex: 10, opacity: 0.2 }} />
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

export default blackOut;


