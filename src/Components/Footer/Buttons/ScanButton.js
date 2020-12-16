import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from  '../../../Styles'

class ScanButton extends Component {
    render() {
        return (
            <View>
                <TouchableOpacity style={styles.button}>
                <Text onPress={this.props.buttonHandler}>Scan Button</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default ScanButton;