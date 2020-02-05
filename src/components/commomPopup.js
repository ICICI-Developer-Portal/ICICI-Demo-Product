import React, { Component } from 'react';
import Modal from 'modal-enhanced-react-native-web';
import { View,  ScrollView } from 'react-native';

class NativeModal extends Component {

  constructor(props) {
    super(props);
  

  }

  render() {
    const { isVisible, rendermodalContent, className } = this.props;
    return (
      <ScrollView style={{ flex: 1 }}>
        <View className="common_modal_container">
          <Modal
            className={className}
            isVisible={isVisible}
            // onBackdropPress={()=> this.setState({open: false})}
          >
            {rendermodalContent}
          </Modal>
        </View>
      </ScrollView>
    );
  }
}
export default NativeModal;