import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { styles } from  '../Styles'

class LoginSignupScreen extends Component {
  state = {
    signup: false,
    name: '',
    email: '',
    password: ''
  };

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
    return (
      <View>
        <Text>Login/Signup Page</Text>

        <TouchableOpacity style={styles.button} onPress={() => this.setState({signup: false})}>
          <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.setState({signup: true})}>
          <Text>Signup</Text>
        </TouchableOpacity>

        {this.state.signup ?
            <TextInput
            onChangeText={(text) => this.loginSignupFormHandler(text, 'name')}
            placeholder={'Name'}
            value={this.state.name}
            // onEndEditing={Keyboard.dismiss}
            />
         :
            null
         }
        
        <TextInput
            onChangeText={(text) => this.loginSignupFormHandler(text, 'email')}
            placeholder={'Email'}
            value={this.state.email}
            keyboardType={'email-address'}
            // onEndEditing={Keyboard.dismiss}
        />
        <TextInput
            onChangeText={(text) => this.loginSignupFormHandler(text, 'password')}
            placeholder={'Password'}
            value={this.state.password}
            secureTextEntry={true}
            // onEndEditing={Keyboard.dismiss}
        />

        {this.state.signup ?
          <TouchableOpacity onPress={this.localSignupHandler} style={styles.button}>
            <Text>Signup</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity onPress={this.localAuthHandler} style={styles.button}>
            <Text>Login</Text>
          </TouchableOpacity>

        }
        
      </View>
    );
  }
}

export default LoginSignupScreen;
