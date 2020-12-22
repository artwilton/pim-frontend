import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  ScrollView,
  Keyboard,
  TouchableOpacity,
} from 'react-native';

import Footer from '../Components/Footer/Footer'
import EditItemForm from '../Components/Forms/EditForms/EditItemForm';

class EditScreen extends Component {
    
    render () {
        return (
            <ScrollView>
                <Text>
                    Edit {this.props.inputType}
                </Text>
                <Text>--------------------------------------------------------------------------------------</Text>
                <View>
                    <EditItemForm editItemPhoto={this.props.editItemPhoto} editItem={this.props.editItem} clickedObj={this.props.clickedObj} containers={this.props.containers} categories={this.props.categories} ></EditItemForm>
                </View>
                <Text>--------------------------------------------------------------------------------------</Text>
                <View>
                    <Footer buttonRouteHandler={this.props.buttonRouteHandler}></Footer>
                </View>
            </ScrollView>
        )
    }
}

export default EditScreen;