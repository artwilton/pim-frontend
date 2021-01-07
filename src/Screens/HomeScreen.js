import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { RecentItems } from '../Components'
import { Button, Icon } from 'react-native-elements';

function HomeScreen({ currentUserName, navigation, style, items, logoutHandler }) {
    return (
        <View style={style.container}>
                <Text style={{fontSize: 20, textAlign: 'center'}}>
                    {`Recent Items`}
                </Text>
                <View style={{paddingBottom: 15}}>
                {items.length ? <RecentItems items={items} navigation={navigation}></RecentItems> : <Text style={{fontSize: 30}}>Loading Recent Items</Text>}
                </View>
                <View>
                    <Button containerStyle={{paddingVertical: 4}} titleStyle={{fontSize: 20}} icon={<Icon name="layers" type="material-community" size={30} color="white" />} title={'  Items'} onPress={() => navigation.navigate('ItemIndex')} style={style.button}/>
                    {/* <Button onPress={() => navigation.navigate('Shared')} style={style.button}>
                        <Text>Shared</Text>
                    </Button> */}
                    <Button containerStyle={{paddingVertical: 4}} titleStyle={{fontSize: 20}} icon={<Icon name="box-open" type="font-awesome-5" size={20} color="white" />} title={'  Containers'} onPress={() => navigation.navigate('ContainerIndex')}/>
                    <Button containerStyle={{paddingVertical: 4}} titleStyle={{fontSize: 20}} icon={<Icon name="layers-search" type="material-community" size={30} color="white" />} title={' Categories'} onPress={() => navigation.navigate('CategoryIndex')}/>
                    <Button containerStyle={{paddingVertical: 20}} titleStyle={{fontSize: 18}} title={'Logout'} onPress={() => logoutHandler()}/>
                </View>
            </View>
    )
}

export default HomeScreen;