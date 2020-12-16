import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  Keyboard,
  TouchableOpacity,
} from 'react-native';

import Footer from '../Components/Footer/Footer'
import { LargeCard } from '../Components/Body';

class HomeScreen extends Component {
    render () {
        return (
            <View>
                <Text>
                    {`Hi ${this.props.currentUserName}`}
                </Text>
                <Text>--------------------------------------------------------------------------------------</Text>
                <View>
                    <LargeCard title={'All Items'} buttonRouteHandler={this.props.buttonRouteHandler} routeName={'AllItems'}></LargeCard>
                    <LargeCard title={'Shared Items'} buttonRouteHandler={this.props.buttonRouteHandler} routeName={'shared'}></LargeCard>
                    <LargeCard title={'Containers'} buttonRouteHandler={this.props.buttonRouteHandler} routeName={'AllContainers'}></LargeCard>
                    <LargeCard title={'Categories'} buttonRouteHandler={this.props.buttonRouteHandler} routeName={'AllCategories'}></LargeCard>
                </View>
                <Text>--------------------------------------------------------------------------------------</Text>
                <View>
                    <Footer buttonRouteHandler={this.props.buttonRouteHandler}></Footer>
                </View>
            </View>
        )
    }
}

export default HomeScreen;