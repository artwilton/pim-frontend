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
  Image,
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
    clickedObj: {},
    items: [],
    containers: [],
    categories: [],
    filteredItems: [],
    user_profile_photo: '',
    searchValue: '',
    searchType: 'Name'
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
    let { items, containers, categories, user_profile_photo} = userData
    this.setState({ items, containers, categories, filteredItems: items, user_profile_photo });

  }

  addItem = (item) => {
    let { name, description, notes, barcode, container, category } = item
    fetch(`http://10.0.2.2:3000/api/v1/users/${this.state.currentUserId}/items/new`, {
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
        container_id: container.id,
        category_id: category.id
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ items: [...this.state.items, data] },
        ()=> this.setState({ filteredItems: this.state.items })
        );
      });
  };

  editItem = (item) => {
    let { name, description, notes, barcode, selected_container, selected_category } = item
    fetch(`http://10.0.2.2:3000/api/v1/items/${this.state.clickedObj.id}/${this.state.currentUserId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        notes,
        barcode,
        container_id: selected_container.id,
        category_id: selected_category.id
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ items: data.items },
        ()=> this.setState({ filteredItems: data },
        ()=> this.setState({currentPage: 'AllItems'})  )
        );
      });
  };

  removeItem = (item) => {
    fetch(`http://10.0.2.2:3000/api/v1/users/${this.state.currentUserId}/user_items/${item.id}`, {
      method: "DELETE",
    })

      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ items: data.items },
        ()=> this.setState({ filteredItems: this.state.items }, 
        ()=> this.setState({currentPage: 'AllItems'}))
        );
      });
  }

  // Routing

  buttonRouteHandler = (link, obj = {}) => {
    this.setState({currentPage: link, clickedObj: obj}, ()=> console.log(this.state.clickedObj.name))
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
        route = <AddScreen addItem={this.addItem} containers={this.state.containers} categories={this.state.categories} buttonRouteHandler={this.buttonRouteHandler} style={styles}></AddScreen>
        break;
      case 'AllItems':
        route = <IndexScreen
        setSearchType={this.setSearchType}
        inputType={'Item'}
        searchValue={this.state.searchValue}
        searchHandler={this.searchHandler}
        items={this.filteredItems()}
        buttonRouteHandler={this.buttonRouteHandler}
        style={styles}></IndexScreen>
        break;
      case 'AllContainers':
        route = <IndexScreen inputType={'Container'} containers={this.state.containers} buttonRouteHandler={this.buttonRouteHandler} style={styles}></IndexScreen>
        break;
      case 'AllCategories':
        route = <IndexScreen inputType={'Category'}  categories={this.state.categories} buttonRouteHandler={this.buttonRouteHandler} style={styles}></IndexScreen>
        break;
      case 'ItemShow':
        route = <ShowScreen removeItem={this.removeItem} inputType={'Item'} clickedObj={this.state.clickedObj} buttonRouteHandler={this.buttonRouteHandler} style={styles}></ShowScreen>
        break;
      case 'ItemEdit':
        route = <EditScreen editItem={this.editItem} inputType={'Item'} clickedObj={this.state.clickedObj} buttonRouteHandler={this.buttonRouteHandler} containers={this.state.containers} categories={this.state.categories} style={styles}></EditScreen>
        break;
      case 'ContainerShow':
        route = <ShowScreen inputType={'Container'} clickedObj={this.state.clickedObj} buttonRouteHandler={this.buttonRouteHandler} style={styles}></ShowScreen>
        break;
      case 'ContainerEdit':
        route = <EditScreen inputType={'Container'} clickedObj={this.state.clickedObj} buttonRouteHandler={this.buttonRouteHandler} style={styles}></EditScreen>
        break;
      case 'CategoryShow':
        route = <ShowScreen inputType={'Category'} clickedObj={this.state.clickedObj} buttonRouteHandler={this.buttonRouteHandler} style={styles}></ShowScreen>
        break;
      case 'CategoryEdit':
        route = <EditScreen inputType={'Category'} clickedObj={this.state.clickedObj} buttonRouteHandler={this.buttonRouteHandler} style={styles}></EditScreen>
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
    return (
      this.state.searchType === 'Name' ?
      this.state.items.filter(item => item.name.toLowerCase().includes(this.state.searchValue.toString().toLowerCase()))
      :
      this.state.items.filter(item => item.category.name.toLowerCase().includes(this.state.searchValue.toString().toLowerCase()))
    )
  }

  setSearchType = searchType => {
    this.setState({searchType: searchType}, () => console.log(this.state.searchType))
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
