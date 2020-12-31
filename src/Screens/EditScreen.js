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
import EditItemScreen from './EditScreens/EditItemScreen';

function EditScreen (props) {
    return (
        <ScrollView>
            <Text>
                Edit {props.inputType}
            </Text>
            <Text>--------------------------------------------------------------------------------------</Text>
            <View>
                <EditItemScreen itemFormHandler={props.itemFormHandler} clickedObj={props.route.params.clickedObj} containers={props.containers} categories={props.categories} ></EditItemScreen>
            </View>
        </ScrollView>
    )
}

export default EditScreen;