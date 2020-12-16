import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import { styles } from '../../Styles'

class LargeCard extends Component {
    render () {
        return (
            <View>
                <TouchableOpacity onPress={() => this.props.buttonRouteHandler(this.props.routeName)} style={styles.button}>
                    <Text>{this.props.title}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default LargeCard;