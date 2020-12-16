import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
} from 'react-native';

import Footer from '../Components/Footer/Footer'

class IndexScreen extends Component {

    inputTypeCheck = () => {
        let objToRender = []
        if (this.props.items) {
            objToRender = this.props.items
        } else if (this.props.containers) {
            objToRender = this.props.containers
        } else if (this.props.categories) {
            objToRender = this.props.categories
        }
        return objToRender
    }

    renderCards = () => {
        


        return this.inputTypeCheck().map((obj) => (
            <Text key={obj.id}>{this.props.inputType}: {obj.name}</Text>
        ));
      };

    render () {
        return (
            <ScrollView>
                    {this.renderCards()}
                    <View>
                    <Footer buttonRouteHandler={this.props.buttonRouteHandler}></Footer>
                    </View>
            </ScrollView>
        )
    }
}

export default IndexScreen;