import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from  '../../../Styles'

class AddButton extends Component {
    render() {
        return (
            <View>
                <TouchableOpacity style={styles.button}>
                <Text onPress={this.props.buttonRouteHandler('Home')}>Add Button</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default AddButton;