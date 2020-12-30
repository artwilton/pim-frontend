import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import { AddCategoryScreen, AddContainerScreen, AddItemScreen, AddTypeScreen} from '../../Screens'

function AddScreenMain (props) {
    return (
        <View>
            <Text>
                Add Screen
            </Text>
            <Text>--------------------------------------------------------------------------------------</Text>
            <View>
                <AddItemScreen addItem={props.addItem} containers={props.containers} categories={props.categories} style={props.style}></AddItemScreen>
            </View>
        </View>
    )
}

export default AddScreenMain;