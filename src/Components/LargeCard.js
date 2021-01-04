import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


function LargeCard( props, {navigation} ) {

    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate(props.routeName)} style={styles.button}>
                <Text>{props.title}</Text>
            </TouchableOpacity>
        </View>
    )

}

export default LargeCard;