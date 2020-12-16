import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from  '../../../Styles'

class HomeButton extends Component {
    render() {
        return (
            <View>
                <TouchableOpacity style={styles.button}>
                <Text onPress={() => this.props.buttonHandler('home')}>Home Button</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default HomeButton;