import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  Keyboard,
  TouchableOpacity,
} from 'react-native';

import NewItemForm from '../Components/Forms/NewForms/NewItemForm'

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
                    <NewItemForm addItem={this.props.addItem} containers={this.props.containers} categories={this.props.categories} ></NewItemForm>
                </View>
            </View>
        )
    }
}

export default AddScreen;