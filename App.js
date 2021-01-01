import 'react-native-gesture-handler';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { navigationRef, navigate } from './RootNavigation';

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

import { AddScreenMain, AddItemScreen, AddContainerScreen, AddCategoryScreen, ContainedItemsScreen, EditCategoryScreen, EditContainerScreen, EditItemScreen, EditTypeScreen, EditUserScreen, HomeScreen, IndexScreen, LoginSignupScreen, NewScreen, ScanScreen, ShowScreen } from './src/Screens' ;
import { styles } from './src/Styles'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Used for getting correct header for nested Tab Navigation
function getHeaderTitle(route) {

  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

  switch (routeName) {
    case 'Scan':
      return 'Scan';
    case 'Add':
      return 'Add';
  }
}

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
    this.setState({ currentUserId: user.id, currentUserName: user.name }, this.fetchUser);
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

  
  formDataNullCheck = (formData, name, value) => {
    
    if ((name !== 'photo' && value ) || (name === 'photo' && value.type)) {
      formData.append(name, value);
    } else if (name !== 'photo' && !value ) {
      formData.append(name, '');
    }
  }

  itemFormHandler = (itemObj, type) => {

    let { id, name, description, notes, barcode, container, category, photo } = itemObj

    console.log('itemObj', itemObj)

    const formData = new FormData();
 
    this.formDataNullCheck(formData, 'name', name);
    this.formDataNullCheck(formData, 'description', description);
    this.formDataNullCheck(formData, 'notes', notes);
    this.formDataNullCheck(formData, 'barcode', barcode);
    this.formDataNullCheck(formData, 'container_id', container.id);
    this.formDataNullCheck(formData, 'category_id', category.id);
    this.formDataNullCheck(formData, 'photo', {
      name: photo.fileName,
      type: photo.type,
      uri: Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
    });

    switch(type) {
      case 'edit':
        this.editItemFetch(formData, itemObj);
        break;
      case 'add':
        this.addItemFetch(formData, itemObj);
        break;
      default:
        console.log('Error: invalid form type')
    } 

  };

  addItemFetch = async (formData) => {

       // try {
        let resp = await fetch(`http://10.0.2.2:3000/api/v1/users/${this.state.currentUserId}/items/new`, {
          method: "POST",
          body: formData
        });
        let data = await resp.json();
      // } catch(error) {
      //   console.log('upload error', error)
      // }

      await console.log('uploaded item', data)

      await this.setState({ items: [...this.state.items, data]});
      await this.setState({ filteredItems: this.state.items });
      await navigate('ItemIndex');
  }

  editItemFetch = async (formData, itemObj) => {

    // try {
      let resp = await fetch(`http://10.0.2.2:3000/api/v1/items/${itemObj.id}/${this.state.currentUserId}`, {
        method: 'PUT',
        body: formData
      });
      let data = await resp.json();
    // } catch(error) {
    //   console.log('upload error', error)
    // }

    await this.setState({ items: data.items });
    await this.setState({ filteredItems: this.state.items });
    await navigate('ItemShow', {clickedObj: this.state.items.find(item => item.id === itemObj.id)});
  }

  removeItem = async (item, inputType) => {

    // try {
      let resp = await fetch(`http://10.0.2.2:3000/api/v1/users/${this.state.currentUserId}/user_items/${item.id}`, {
        method: "DELETE"
      })
  
      let data = await resp.json();
    // } catch(error) {
    //   console.log('delete error', error)
    // }
    await this.setState({ items: data.items });
    await this.setState({ filteredItems: this.state.items });
    await navigate(`${inputType}Index`);

  }

  // Routing

  setClickedObj = (obj = {}) => {
    this.setState({clickedObj: obj}, ()=> console.log('clickedObj', this.state.clickedObj.name))
  }

  tempRouting = () => {

    let route = ''

    switch(this.state.currentPage) {
      
      case 'ItemIndex':
        route = <IndexScreen
        setSearchType={this.setSearchType}
        inputType={'Item'}
        searchValue={this.state.searchValue}
        searchHandler={this.searchHandler}
        items={this.filteredItems()}
        setClickedObj={this.setClickedObj}
        style={styles}></IndexScreen>
        break;
      case 'ContainerIndex':
        route = <IndexScreen inputType={'Container'} containers={this.state.containers} setClickedObj={this.setClickedObj} style={styles}></IndexScreen>
        break;
      case 'CategoryIndex':
        route = <IndexScreen inputType={'Category'}  categories={this.state.categories} setClickedObj={this.setClickedObj} style={styles}></IndexScreen>
        break;
      case 'ItemShow':
        route = <ShowScreen removeItem={this.removeItem} inputType={'Item'} clickedObj={this.state.clickedObj} setClickedObj={this.setClickedObj} style={styles}></ShowScreen>
        break;
      case 'ItemEdit':
        route = <EditScreen itemFormHandler={this.itemFormHandler} inputType={'Item'} clickedObj={this.state.clickedObj} setClickedObj={this.setClickedObj} containers={this.state.containers} categories={this.state.categories} style={styles}></EditScreen>
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

  HomeTabs = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home">
          {props => <HomeScreen {...props} style={styles} currentUserName={this.state.currentUserName}/>}
        </Tab.Screen>
        <Tab.Screen name="Scan" component={ScanScreen} />
        
        <Tab.Screen name="Add">
          {props => <AddScreenMain {...props} style={styles}/>}
        </Tab.Screen>
      </Tab.Navigator>
    );
  }

  render () {
      return (
        <NavigationContainer ref={navigationRef}>
          
          <Stack.Navigator initialRouteName="Login">
            {this.state.currentUserId !== '' ? (
              <>
                <Stack.Screen name="Home"
                  component={this.HomeTabs}
                  options={({ route }) => ({
                    headerTitle: getHeaderTitle(route),
                  })}
                />
                <Stack.Screen name="ItemIndex">
                  {props => <IndexScreen
                  {...props}
                  setSearchType={this.setSearchType}
                  searchValue={this.state.searchValue}
                  searchHandler={this.searchHandler}
                  items={this.filteredItems()}
                  style={styles} /> }
                </Stack.Screen>
                
                <Stack.Screen name="ContainerIndex">
                  {props => <IndexScreen {...props} containers={this.state.containers} style={styles}></IndexScreen>}
                </Stack.Screen>

                <Stack.Screen name="CategoryIndex">
                  {props => <IndexScreen {...props} categories={this.state.categories} style={styles}></IndexScreen>}
                </Stack.Screen>
                
                <Stack.Screen name="ItemShow">
                  {props => <ShowScreen {...props} searchHandler={this.searchHandler} removeItem={this.removeItem} inputType={'Item'} style={styles}></ShowScreen>}
                </Stack.Screen>

                <Stack.Screen name="ContainerShow">
                  {props => <ShowScreen {...props} searchHandler={this.searchHandler} removeItem={this.removeItem} inputType={'Container'} style={styles}></ShowScreen>}
                </Stack.Screen>

                <Stack.Screen name="CategoryShow">
                  {props => <ShowScreen {...props} searchHandler={this.searchHandler} removeItem={this.removeItem} inputType={'Category'} style={styles}></ShowScreen>}
                </Stack.Screen>

                <Stack.Screen name="AddItem">
                  {props => <AddItemScreen {...props} itemFormHandler={this.itemFormHandler} containers={this.state.containers} categories={this.state.categories} style={styles} ></AddItemScreen> }
                </Stack.Screen>

                <Stack.Screen name="AddContainer">
                  {props => <AddContainerScreen {...props} itemFormHandler={this.itemFormHandler} containers={this.state.containers} categories={this.state.categories} style={styles} ></AddContainerScreen> }
                </Stack.Screen>

                <Stack.Screen name="AddCategory">
                  {props => <AddCategoryScreen {...props} itemFormHandler={this.itemFormHandler} containers={this.state.containers} categories={this.state.categories} style={styles} ></AddCategoryScreen> }
                </Stack.Screen>
                
                <Stack.Screen name="ItemEdit">
                    {props => <EditItemScreen {...props} itemFormHandler={this.itemFormHandler} inputType={'Item'} containers={this.state.containers} categories={this.state.categories} style={styles}></EditItemScreen>}
                </Stack.Screen>
                
                <Stack.Screen name="ContainerEdit" component={EditContainerScreen} />
                <Stack.Screen name="CategoryEdit" component={EditCategoryScreen} />
              </>
            ) : (
              <>
                <Stack.Screen name="Login">
                  {props => <LoginSignupScreen {...props} style={styles} loginAuthHandler={this.loginAuthHandler} signupHandler={this.signupHandler}/>}
                </Stack.Screen>
              </>
            )            
            }
                    
          </Stack.Navigator>
        </NavigationContainer>
          
          // <SafeAreaView>
            
          //     {this.tempRouting()}
          // </SafeAreaView>
      )
  }
}

export default App;
