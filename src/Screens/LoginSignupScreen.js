import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { styles } from  '../Styles'
import { Input, Button, ButtonGroup } from 'react-native-elements'

class LoginSignupScreen extends Component {
  state = {
    selectedIndex: 0,
    signup: false,
    name: '',
    email: '',
    password: ''
  };

  updateIndex = (selectedIndex) => {
    this.setState({selectedIndex})
  }

  localAuthHandler = () => {
    this.props.loginAuthHandler(this.state.email);
  };

  localSignupHandler = () => {
    this.props.signupHandler(this.state);
  };

  loginSignupFormHandler = (text, name) => {
    this.setState({[name]: text}, () => console.log(this.state));
  };

  render() {

    const buttons = ['Login', 'Signup']
    const { selectedIndex } = this.state

    return (
      <>
      <View style={{padding: 10}}>
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{height: 60}}
          textStyle={{fontSize: 18}}
        />
      </View>
      <View style={styles.container}>

        {selectedIndex === 1 ?
            <Input
            onChangeText={(text) => this.loginSignupFormHandler(text, 'name')}
            placeholder={'Name'}
            value={this.state.name}
            // onEndEditing={Keyboard.dismiss}
            />
         :
            null
         }
        
        <Input
            onChangeText={(text) => this.loginSignupFormHandler(text, 'email')}
            placeholder={'Email'}
            value={this.state.email}
            keyboardType={'email-address'}
            // onEndEditing={Keyboard.dismiss}
        />
        <Input
            onChangeText={(text) => this.loginSignupFormHandler(text, 'password')}
            placeholder={'Password'}
            value={this.state.password}
            secureTextEntry={true}
            // onEndEditing={Keyboard.dismiss}
        />

        {selectedIndex === 0 ?
          <Button title={'Login'} onPress={this.localAuthHandler}>
          </Button>
          :
          <Button title={'Signup'} onPress={this.localSignupHandler}>
          </Button>

        }
        
      </View>
      </>
    );
  }
}

export default LoginSignupScreen;
