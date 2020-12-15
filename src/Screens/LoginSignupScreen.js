import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  View,
  Keyboard,
  TouchableOpacity,
} from 'react-native';

class LoginSignupScreen extends Component {
  state = {
    signup: false,
    name: '',
    email: '',
    password: ''
  };

  localAuthHandler = () => {
    // event.preventDefault();
    this.props.loginAuthHandler(this.state.email);
  };

  localSignupHandler = () => {
    // event.preventDefault();
    this.props.signupHandler(this.state);
  };

  loginSignupFormHandler = (text, name) => {
    this.setState({[name]: text}, () => console.log(this.state));
  };

  render() {
    return (
      <View>
        <Text>Login/Signup Page</Text>

        <TouchableOpacity style={styles.button}>
          <Text onPress={() => this.setState({signup: false})} >Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text onPress={() => this.setState({signup: true})}>Signup</Text>
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

         <TouchableOpacity style={styles.button}>
            {this.state.signup ?
                <Text onPress={this.localSignupHandler}>Signup</Text>
                :
                <Text onPress={this.localAuthHandler}>Login</Text>
             }
        </TouchableOpacity>
        
        
      </View>

      //   <div id="login">
      //       <h1>Login</h1>
      //     <form onSubmit={this.localLoginHandler}>
      //       <label>Email</label><br/>
      //       <input
      //         type="text"
      //         value={this.state.email}
      //         name="email"
      //         onChange={this.loginSignupFormHandler}
      //       ></input><br/><br/>
      //       <label>Password</label><br/>
      //       <input type="password"></input><br/><br/>
      //       <input type="submit" value="Login" id="l-btn"/>
      //     </form>
      //     { this.props.currentUserId === null ? null : <p>You were logged in successfully!</p>}
      //   </div>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: '80%',
  },
});

export default LoginSignupScreen;
