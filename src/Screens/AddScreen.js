import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  Keyboard,
  TouchableOpacity,
} from 'react-native';

import Footer from '../Components/Footer/Footer'

class AddScreen extends Component {
    render () {
        return (
            <View>
                <Text>
                    Add Screen
                </Text>
                <Text>--------------------------------------------------------------------------------------</Text>
                <View>
                    <Text>BODY</Text>
                </View>
                <Text>--------------------------------------------------------------------------------------</Text>
                <View>
                    <Footer buttonRouteHandler={this.props.buttonRouteHandler}></Footer>
                </View>
            </View>
        )
    }
}

export default AddScreen;