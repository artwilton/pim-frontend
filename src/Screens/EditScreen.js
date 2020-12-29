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

function EditScreen (props) {
    return (
        <ScrollView>
            <Text>
                Edit {props.inputType}
            </Text>
            <Text>--------------------------------------------------------------------------------------</Text>
            <View>
                <EditItemForm editItem={props.editItem} clickedObj={props.route.params.clickedObj} containers={props.containers} categories={props.categories} ></EditItemForm>
            </View>
        </ScrollView>
    )
}

export default EditScreen;