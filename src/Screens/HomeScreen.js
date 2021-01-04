import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { RecentItems } from '../Components'

function HomeScreen({ currentUserName, navigation, style, items, logoutHandler }) {
    return (
        <View>
                <Text style={{fontSize: 20}}>
                    {`${currentUserName}'s Recent Items`}
                </Text>
                {items.length ? <RecentItems items={items}></RecentItems> : <Text style={{fontSize: 30}}>Loading Recent Items</Text>}
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('ItemIndex')} style={style.button}>
                        <Text>Items</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={() => navigation.navigate('Shared')} style={style.button}>
                        <Text>Shared</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity onPress={() => navigation.navigate('ContainerIndex')} style={style.button}>
                        <Text>Containers</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('CategoryIndex')} style={style.button}>
                        <Text>Categories</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => logoutHandler()} style={style.button}>
                        <Text>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
    )
}

export default HomeScreen;