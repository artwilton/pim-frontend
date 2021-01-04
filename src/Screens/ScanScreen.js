import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  Keyboard,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { RNCamera } from 'react-native-camera'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'black'
    },
    scanner: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center'
    }
  })

class ScanScreen extends Component {
  
    barcodeRecognized = (barcode) => {
        const containerObj = this.props.containers.find(container => container.barcode === barcode.data)
        this.props.navigation.navigate('ContainerShow', {clickedObj: containerObj})
    };
      
      render() {
        return (
          <View style={styles.container}>
           <RNCamera
           captureAudio={false}
          ref={ref => {
            this.camera = ref;
          }}
          style={{
            flex: 1,
            width: '100%',
          }}
          onBarCodeRead={this.barcodeRecognized}
        >
        </RNCamera>
          </View>
        );
      }
}

export default ScanScreen;