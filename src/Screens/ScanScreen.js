import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  Keyboard,
  TouchableOpacity,
} from 'react-native';

class ScanScreen extends Component {
    render () {
        return (
            <View>
                <Text>
                    Scan Screen
                </Text>
                <Text>--------------------------------------------------------------------------------------</Text>
                <View>
                    <Text>BODY</Text>
                </View>
                <Text>--------------------------------------------------------------------------------------</Text>
            </View>
        )
    }
}

export default ScanScreen;