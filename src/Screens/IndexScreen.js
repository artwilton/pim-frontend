import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
} from 'react-native';

// import { LargeCard } from '../Components/Body';

class IndexScreen extends Component {

    renderCards = () => {
        return this.props.items.map((item) => (
            <Text key={item.id}>{item.name}</Text>
        ));
      };

    render () {
        return (
            <ScrollView>
                <View>
                    {this.renderCards()}
                </View>
            </ScrollView>
        )
    }
}

export default IndexScreen;