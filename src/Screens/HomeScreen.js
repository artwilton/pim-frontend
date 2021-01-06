import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { RecentItems } from '../Components'
import { Button } from 'react-native-elements';

function HomeScreen({ currentUserName, navigation, style, items, logoutHandler }) {
    return (
        <View style={style.container}>
                <Text style={{fontSize: 20}}>
                    {`${currentUserName}'s Recent Items`}
                </Text>
                {items.length ? <RecentItems items={items} navigation={navigation}></RecentItems> : <Text style={{fontSize: 30}}>Loading Recent Items</Text>}
                <View>
                    <Button containerStyle={{paddingVertical: 5}} title={'Items'} onPress={() => navigation.navigate('ItemIndex')} style={style.button}>
                    </Button>
                    {/* <Button onPress={() => navigation.navigate('Shared')} style={style.button}>
                        <Text>Shared</Text>
                    </Button> */}
                    <Button containerStyle={{paddingVertical: 5}} title={'Containers'} onPress={() => navigation.navigate('ContainerIndex')}>
                    </Button>
                    <Button containerStyle={{paddingVertical: 5}} title={'Categories'} onPress={() => navigation.navigate('CategoryIndex')}>
                    </Button>
                    <Button containerStyle={{paddingVertical: 40}} title={'Logout'} onPress={() => logoutHandler()}>
                    </Button>
                </View>
            </View>
    )
}

export default HomeScreen;