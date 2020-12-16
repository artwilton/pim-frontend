/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from "react";
import {
  Alert,
  SafeAreaView,
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
import { styles } from './src/Styles'

class App extends Component {

  state = {
    currentUserId: '',
    currentUserName: '',
    // Temp Routing
    currentPage: 'Login',
    items: [],
    containers: [],
    categories: [],
    filteredItems: [],
    searchValue: []
  }

  // Temp Auth Functions

  loginAuthHandler = (email) => {
    fetch(`http://10.0.2.2:3000/api/v1/users/`)
      .then((r) => r.json())
      .then((data) => {
        data.forEach((user) => {
          if (email === user.email) {
            this.setCurrentUser(user)
            this.setState({currentPage: 'Home'})
          }
        });
      });
  };

  signupHandler = (userObj) => {
    const { name, email, password } = userObj;
    fetch("http://10.0.2.2:3000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        this.setCurrentUser(data)
      });
      this.setState({currentPage: 'Home'})
  };

  setCurrentUser = user => {
    this.setState({ currentUserId: user.id }, this.fetchUser);
    this.setState({ currentUserName: user.name });
  }

  // Fetch

  async fetchUser() {

    let userResponse = await fetch(
      `http://10.0.2.2:3000/api/v1/users/${this.state.currentUserId}/items`
    );
    let userData = await userResponse.json();
    let { items, containers, categories} = userData
    this.setState({ items, containers, categories, filteredItems: items }, ()=> console.log(this.state));

  }

  addItem = (item) => {
    let { name, description, notes, barcode, container_id, category_id } = item
    fetch(`http://localhost:3000/api/v1/users/${this.state.currentUserId}/items/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        notes,
        barcode,
        container_id,
        category_id
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ items: [...this.state.items, item] }, () =>
          console.log(this.state.items)
        );
      });
  };

  // Routing

  buttonRouteHandler = link => {
    this.setState({currentPage: link})
  }

  tempRouting = () => {

    let route = ''

    switch(this.state.currentPage) {
      case 'Login':
        route = <LoginSignupScreen style={styles} loginAuthHandler={this.loginAuthHandler} signupHandler={this.signupHandler}/>
        break;
      case 'Home':
        route = <HomeScreen buttonRouteHandler={this.buttonRouteHandler} style={styles} currentUserName={this.state.currentUserName}></HomeScreen>
        break;
      case 'Scan':
        route = <ScanScreen buttonRouteHandler={this.buttonRouteHandler} style={styles}></ScanScreen>
        break;
      case 'Add':
        route = <AddScreen buttonRouteHandler={this.buttonRouteHandler} style={styles}></AddScreen>
        break;
      case 'AllItems':
        route = <IndexScreen
        searchValue={this.state.searchValue}
        searchHandler={this.searchHandler}
        items={this.filteredItems()}
        buttonRouteHandler={this.buttonRouteHandler}
        style={styles}></IndexScreen>
        break;
      case 'AllContainers':
        route = <IndexScreen containers={this.state.containers} buttonRouteHandler={this.buttonRouteHandler} style={styles}></IndexScreen>
        break;
      case 'AllCategories':
        route = <IndexScreen categories={this.state.categories} buttonRouteHandler={this.buttonRouteHandler} style={styles}></IndexScreen>
        break;
      default:
        route = <LoginSignupScreen style={styles} loginAuthHandler={this.loginAuthHandler} signupHandler={this.signupHandler}/>
    }

    return route
  }

  // Search

  searchHandler = searchText => {
    this.setState({searchValue: searchText})
  }

  filteredItems = () => {
    return this.state.items.filter(item => item.name.toLowerCase().includes(this.state.searchValue.toString().toLowerCase()))
  }

  render () {
      return (
        <SafeAreaView>
            {this.tempRouting()}
        </SafeAreaView>
          
      )
  }
}

export default App;
