import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

function AddScreenMain ({navigation, style })  {
    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('AddItem')} style={style.largeButton}>
                <Text>Add Item</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AddContainer')} style={style.largeButton}>
                <Text>Add Container</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AddCategory')} style={style.largeButton}>
                <Text>Add Category</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddScreenMain;