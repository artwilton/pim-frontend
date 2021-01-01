import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LargeCard } from '../Components/Body';

function HomeScreen({ currentUserName, navigation, style }) {
    return (
        <View>
                <Text>
                    {`Hi ${currentUserName}`}
                </Text>
                <Text>--------------------------------------------------------------------------------------</Text>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('ItemIndex')} style={style.button}>
                        <Text>All Items</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Shared')} style={style.button}>
                        <Text>Shared</Text>
                    </TouchableOpacity><TouchableOpacity onPress={() => navigation.navigate('ContainerIndex')} style={style.button}>
                        <Text>All Containers</Text>
                    </TouchableOpacity><TouchableOpacity onPress={() => navigation.navigate('CategoryIndex')} style={style.button}>
                        <Text>All Categories</Text>
                    </TouchableOpacity>
                </View>
                <Text>--------------------------------------------------------------------------------------</Text>
            </View>
    )
}

export default HomeScreen;