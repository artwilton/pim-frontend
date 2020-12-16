import React, {Component} from 'react';
import { AddButton, HomeButton, ScanButton } from './Buttons';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from  '../../Styles'

class Footer extends Component {

    render () {
        return (
            <View>
                <View>
                    <TouchableOpacity style={styles.footerButton} onPress={() => this.props.buttonRouteHandler('Home')}>
                        <Text>Home Button</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.footerButton} onPress={() => this.props.buttonRouteHandler('Scan')}>
                        <Text>Scan Button</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.footerButton} onPress={() => this.props.buttonRouteHandler('Add')}>
                        <Text>Add Button</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


export default Footer;