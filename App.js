/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { AddScreen, ContainedItemsScreen, EditScreen, HomeScreen, IndexScreen, LoginSignupScreen, NewScreen, ScanScreen, ShowScreen } from './src/Screens' ;

class App extends Component {

  state = {
    currentUserId: null,
    currentUserName: ''
  }

  loginAuthHandler = (email) => {
    console.log(email)
    // fetch(`http://localhost:3000/api/v1/users/`)
    //   .then((r) => r.json())
    //   .then((data) => {
    //     data.forEach((user) => {
    //       if (email === user.email) {
    //         this.setCurrentUser(user)
    //         this.props.history.push(`/home`)
    //       }
    //     });
    //   });
  };

  signupHandler = (userObj) => {
    console.log(userObj)
    // const { name, email, password } = userObj;
    // fetch("http://localhost:3000/api/v1/users", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accepts: "application/json",
    //   },
    //   body: JSON.stringify({ name, email, password }),
    // })
    //   .then((resp) => resp.json())
    //   .then((data) => {
    //     this.setCurrentUser(data)
    //     this.props.history.push(`/home`)
    //   });
  };

  setCurrentUser = user => {
    this.setState({ currentUserId: user.id }, this.fetchUserItems);
    this.setState({ currentUserName: user.name });
  }

  async fetchUserItems() {

    let itemResponse = await fetch(
      `http://localhost:3000/api/v1/users/${this.state.currentUserId}/items`
    );
    let items = await itemResponse.json();
    this.setState({ userItems: items });

  }

  render () {
      return (
        <SafeAreaView>
          <>
            <LoginSignupScreen loginAuthHandler={this.loginAuthHandler} signupHandler={this.signupHandler}/>
          </>
        </SafeAreaView>
          
      )
  }
}

// const App: () => React$Node = () => {
//   return (
//     <>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//           style={styles.scrollView}>
//           <Header />
//           {global.HermesInternal == null ? null : (
//             <View style={styles.engine}>
//               <Text style={styles.footer}>Engine: Hermes</Text>
//             </View>
//           )}
//           <View style={styles.body}>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Step One</Text>
//               <Text style={styles.sectionDescription}>
//                 Edit <Text style={styles.highlight}>App.js</Text> to change this
//                 screen and then come back to see your edits.
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>See Your Changes</Text>
//               <Text style={styles.sectionDescription}>
//                 <ReloadInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Debug</Text>
//               <Text style={styles.sectionDescription}>
//                 <DebugInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Learn More</Text>
//               <Text style={styles.sectionDescription}>
//                 Read the docs to discover what to do next:
//               </Text>
//             </View>
//             <LearnMoreLinks />
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </>
//   );
// };

export default App;
