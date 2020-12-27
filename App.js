import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



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

  HomeTabs = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home">
          {props => <HomeScreen {...props} style={styles} currentUserName={this.state.currentUserName}/>}
        </Tab.Screen>
        <Tab.Screen name="Scan" component={ScanScreen} />
        
        <Tab.Screen name="Add">
          {props => <AddScreen {...props} addItem={this.addItem} containers={this.state.containers} categories={this.state.categories} setClickedObj={this.setClickedObj} style={styles}/>}
        </Tab.Screen>
      </Tab.Navigator>
    );
  }

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

  formDataNullCheck = (formData, name, value) => {

    if ((name !== 'photo' && value ) || (name === 'photo' && value.uri)) {
      formData.append(name, value);
    } else if (name !== 'photo' && !value ) {
      formData.append(name, '');
    }
  }

  editItemPhoto = (itemObj) => {

    let { name, description, notes, barcode, selected_container, selected_category, newPhoto } = itemObj

    const formData = new FormData();
 
    this.formDataNullCheck(formData, 'name', name);
    this.formDataNullCheck(formData, 'description', description);
    this.formDataNullCheck(formData, 'notes', notes);
    this.formDataNullCheck(formData, 'barcode', barcode);
    this.formDataNullCheck(formData, 'container_id', selected_container.id);
    this.formDataNullCheck(formData, 'category_id', selected_category.id);
    this.formDataNullCheck(formData, 'photo', {
      name: newPhoto.fileName,
      type: newPhoto.type,
      uri: Platform.OS === 'android' ? newPhoto.uri : newPhoto.uri.replace('file://', ''),
    });

    console.log(formData)

    fetch(`http://10.0.2.2:3000/api/v1/items/${this.state.clickedObj.id}/${this.state.currentUserId}`, {
      method: 'PUT',
      body: formData
    })

    .then(response => response.json())  
    .then((data) => {
      this.setState({ items: data.items },
      ()=> this.setState({ filteredItems: data },
      ()=> this.setState({currentPage: 'AllItems'})  )
      );
    })
    .catch((error) => {
      console.log('upload error', error);
    });
   
  }

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

  setClickedObj = (obj = {}) => {
    this.setState({clickedObj: obj}, ()=> console.log('clickedObj', this.state.clickedObj.name))
  }

  tempRouting = () => {

    let route = ''

    switch(this.state.currentPage) {
      case 'Login':
        route = <LoginSignupScreen style={styles} loginAuthHandler={this.loginAuthHandler} signupHandler={this.signupHandler}/>
        break;
      case 'Home':
        route = <HomeScreen setClickedObj={this.setClickedObj} style={styles} currentUserName={this.state.currentUserName}></HomeScreen>
        break;
      case 'Scan':
        route = <ScanScreen setClickedObj={this.setClickedObj} style={styles}></ScanScreen>
        break;
      case 'Add':
        route = <AddScreen addItem={this.addItem} containers={this.state.containers} categories={this.state.categories} setClickedObj={this.setClickedObj} style={styles}></AddScreen>
        break;
      case 'AllItems':
        route = <IndexScreen
        setSearchType={this.setSearchType}
        inputType={'Item'}
        searchValue={this.state.searchValue}
        searchHandler={this.searchHandler}
        items={this.filteredItems()}
        setClickedObj={this.setClickedObj}
        style={styles}></IndexScreen>
        break;
      case 'AllContainers':
        route = <IndexScreen inputType={'Container'} containers={this.state.containers} setClickedObj={this.setClickedObj} style={styles}></IndexScreen>
        break;
      case 'AllCategories':
        route = <IndexScreen inputType={'Category'}  categories={this.state.categories} setClickedObj={this.setClickedObj} style={styles}></IndexScreen>
        break;
      case 'ItemShow':
        route = <ShowScreen removeItem={this.removeItem} inputType={'Item'} clickedObj={this.state.clickedObj} setClickedObj={this.setClickedObj} style={styles}></ShowScreen>
        break;
      case 'ItemEdit':
        route = <EditScreen editItemPhoto={this.editItemPhoto} editItem={this.editItem} inputType={'Item'} clickedObj={this.state.clickedObj} setClickedObj={this.setClickedObj} containers={this.state.containers} categories={this.state.categories} style={styles}></EditScreen>
        break;
      case 'ContainerShow':
        route = <ShowScreen inputType={'Container'} clickedObj={this.state.clickedObj} setClickedObj={this.setClickedObj} style={styles}></ShowScreen>
        break;
      case 'ContainerEdit':
        route = <EditScreen inputType={'Container'} clickedObj={this.state.clickedObj} setClickedObj={this.setClickedObj} style={styles}></EditScreen>
        break;
      case 'CategoryShow':
        route = <ShowScreen inputType={'Category'} clickedObj={this.state.clickedObj} setClickedObj={this.setClickedObj} style={styles}></ShowScreen>
        break;
      case 'CategoryEdit':
        route = <EditScreen inputType={'Category'} clickedObj={this.state.clickedObj} setClickedObj={this.setClickedObj} style={styles}></EditScreen>
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
        <NavigationContainer>
          
          <Stack.Navigator initialRouteName="Home">

            <Stack.Screen name="Login">
              {props => <LoginSignupScreen {...props} style={styles} loginAuthHandler={this.loginAuthHandler} signupHandler={this.signupHandler}/>}
            </Stack.Screen>
            <Stack.Screen name="Home" component={this.HomeTabs} />
            <Stack.Screen name="AllItems" component={IndexScreen} />
            <Stack.Screen name="AllContainers" component={IndexScreen} />
            <Stack.Screen name="AllCategories" component={IndexScreen} />
            <Stack.Screen name="ItemShow" component={ShowScreen} />
            <Stack.Screen name="ItemEdit" component={EditScreen} />
            <Stack.Screen name="ContainerShow" component={ShowScreen} />
            <Stack.Screen name="ContainerEdit" component={EditScreen} />
            <Stack.Screen name="CategoryShow" component={ShowScreen} />
            <Stack.Screen name="CategoryEdit" component={EditScreen} />        
          </Stack.Navigator>
        </NavigationContainer>
          
          // <SafeAreaView>
            
          //     {this.tempRouting()}
          // </SafeAreaView>
      )
  }
}

export default App;
