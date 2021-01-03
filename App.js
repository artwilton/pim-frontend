import 'react-native-gesture-handler';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
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
    case 'Home':
      return 'Home';
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
    types: [],
    filteredItems: [],
    filteredCategories: [],
    filteredContainers: [],
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
    let { items, containers, categories, types, user_profile_photo} = userData
    this.setState({ items, containers, categories, types, filteredItems: items, user_profile_photo });

  }

  formDataNullCheck = (formData, name, value) => {

    console.log('formData, name, value', formData, name, value)
    
    if ((!name.match('photo') && value ) || (!!name.match('photo') && value.type)) {
      formData.append(name, value);
    } else if (!name.match('photo') && !value ) {
      formData.append(name, '');
    }
  }

  // Item Fetch and Form Handler Functions
  itemFormHandler = (itemObj, fetchType) => {

    let { id, name, description, notes, barcode, container, category, photo } = itemObj

    console.log('itemObj', itemObj)

    const formData = new FormData();
 
    this.formDataNullCheck(formData, 'item[name]', name);
    this.formDataNullCheck(formData, 'item[description]', description);
    this.formDataNullCheck(formData, 'item[notes]', notes);
    this.formDataNullCheck(formData, 'item[barcode]', barcode);
    this.formDataNullCheck(formData, 'item[container_id]', container.id);
    this.formDataNullCheck(formData, 'item[category_id]', category.id);
    this.formDataNullCheck(formData, 'item[photo]', {
      name: photo.fileName,
      type: photo.type,
      uri: Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
    });

    switch(fetchType) {
      case 'edit':
        this.editItemFetch(formData, itemObj);
        break;
      case 'add':
        this.addItemFetch(formData, itemObj);
        break;
      default:
        console.log('Error: invalid fetchType')
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

  removeHandler = (obj, inputType) => {

    switch(inputType) {
      case 'Item':
        this.removeItem(obj);
        break;
      case 'Category':
        this.removeCategory(obj);
        break;
      case 'Container':
        this.removeContainer(obj);
        break;
      case 'Type':
        this.removeType(obj);
        break;
      case 'User':
        this.removeUser(obj);
        break;
      default:
        console.log('Error: invalid input type')
    } 

    
  }

  removeItem = async (item) => {

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
    await navigate(`ItemIndex`);

  }

  // Category Fetch and Form Handler Functions

  categoryFormHandler = (categoryObj, fetchType) => {

    let { name, description, photo } = categoryObj

    console.log('categoryObj', categoryObj)

    const formData = new FormData();
 
    this.formDataNullCheck(formData, 'category[name]', name);
    this.formDataNullCheck(formData, 'category[description]', description);
    this.formDataNullCheck(formData, 'category[photo]', {
      name: photo.fileName,
      type: photo.type,
      uri: Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
    });

    switch(fetchType) {
      case 'edit':
        this.editCategoryFetch(formData, categoryObj);
        break;
      case 'add':
        this.addCategoryFetch(formData, categoryObj);
        break;
      default:
        console.log('Error: invalid fetchType')
    } 

  };

  addCategoryFetch = async (formData) => {

    // try {
     let resp = await fetch(`http://10.0.2.2:3000/api/v1/users/${this.state.currentUserId}/categories/new`, {
       method: "POST",
       body: formData
     });
     let data = await resp.json();
   // } catch(error) {
   //   console.log('upload error', error)
   // }

   console.log('category add response', data)

    this.setState({
      categories: [...this.state.categories, data],
      filteredCategories: [...this.state.categories, data]
      },
      ()=> navigate('CategoryIndex')
    )
   
}

  editCategoryFetch = async (formData, categoryObj) => {

  // try {
    let resp = await fetch(`http://10.0.2.2:3000/api/v1/categories/${categoryObj.id}/`, {
      method: 'PUT',
      body: formData
    });
    let data = await resp.json();
  // } catch(error) {
  //   console.log('upload error', error)
  // }
  const filteredObj = {description: data.description, id: data.id, name: data.name, photo: {uri: data.photo ? data.photo.uri : null}}

  let indexOfCategory = this.state.categories.findIndex(category => category.id === data.id)
  let updatedCategories = [...this.state.categories]
  updatedCategories[indexOfCategory] = filteredObj

  this.setState({categories: updatedCategories, filteredCategories: updatedCategories}, () => navigate('CategoryShow', {clickedObj: filteredObj}))  ;

  }

  removeCategory = async (category) => {

    // try {
      let resp = await fetch(`http://10.0.2.2:3000/api/v1/users/${this.state.currentUserId}/user_categories/${category.id}`, {
        method: "DELETE"
      })

      // let data = await resp.json();
    // } catch(error) {
    //   console.log('delete error', error)
    // }

    let updatedCategories = [...this.state.categories]
    let indexOfCategory = this.state.categories.findIndex(oldCategory => oldCategory.id === category.id)
    updatedCategories.splice(indexOfCategory, 1)
    this.setState({ categories: updatedCategories, filteredCategories: updatedCategories }, ()=> navigate(`CategoryIndex`));

  }

  containerFormHandler = (containerObj, fetchType) => {

    let { name, description, notes, percent_used, barcode, type, photo } = containerObj

    console.log('containerObj', containerObj)

    const formData = new FormData();
 
    this.formDataNullCheck(formData, 'container[name]', name);
    this.formDataNullCheck(formData, 'container[description]', description);
    this.formDataNullCheck(formData, 'container[notes]', notes);
    this.formDataNullCheck(formData, 'container[percent_used]', percent_used);
    this.formDataNullCheck(formData, 'container[barcode]', barcode);
    this.formDataNullCheck(formData, 'container[type_id]', type.id);
    this.formDataNullCheck(formData, 'container[photo]', {
      name: photo.fileName,
      type: photo.type,
      uri: Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
    });

    switch(fetchType) {
      case 'edit':
        this.editContainerFetch(formData, containerObj);
        break;
      case 'add':
        this.addContainerFetch(formData, containerObj);
        break;
      default:
        console.log('Error: invalid fetchType')
    } 

  };

  // Container Fetch and Form Handler Functions
  
  addContainerFetch = async (formData) => {

    // try {
     let resp = await fetch(`http://10.0.2.2:3000/api/v1/users/${this.state.currentUserId}/containers/new`, {
       method: "POST",
       body: formData
     });
     let data = await resp.json();
   // } catch(error) {
   //   console.log('upload error', error)
   // }

   console.log('container add response', data)

    this.setState({
      containers: [...this.state.containers, data],
      filteredContainers: [...this.state.containers, data]
      },
      ()=> navigate('ContainerIndex')
    )
   
}

  editContainerFetch = async (formData, containerObj) => {

  // try {
    let resp = await fetch(`http://10.0.2.2:3000/api/v1/containers/${containerObj.id}/`, {
      method: 'PUT',
      body: formData
    });
    let data = await resp.json();
  // } catch(error) {
  //   console.log('upload error', error)
  // }
  const filteredObj = {id: data.id, name: data.name, description: data.description, notes: data.notes, percent_used: data.percent_used, barcode: data.barcode, type: data.type, photo: {uri: data.photo ? data.photo.uri : null}}

  let indexOfContainer = this.state.containers.findIndex(container => container.id === data.id)
  let updatedContainers = [...this.state.containers]
  updatedContainers[indexOfContainer] = filteredObj

  this.setState({containers: updatedContainers, filteredContainers: updatedContainers}, () => navigate('ContainerShow', {clickedObj: filteredObj}));

  }

  removeContainer = async (container) => {

    // try {
      let resp = await fetch(`http://10.0.2.2:3000/api/v1/users/${this.state.currentUserId}/user_containers/${container.id}`, {
        method: "DELETE"
      })

      // let data = await resp.json();
    // } catch(error) {
    //   console.log('delete error', error)
    // }

    let updatedContainers = [...this.state.containers]
    let indexOfContainer = this.state.containers.findIndex(oldContainer => oldContainer.id === container.id)
    updatedContainers.splice(indexOfContainer, 1)
    this.setState({ containers: updatedContainers, filteredContainers: updatedContainers }, ()=> navigate(`ContainerIndex`));

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

  // Nav Tab Screens
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

  // Nav Stack Screens and Render
  render () {
      return (
        <NavigationContainer ref={navigationRef}>
          
          <Stack.Navigator initialRouteName="Login">
            {this.state.currentUserId !== '' ? (
              <>
                <Stack.Screen name="HomeScreen"
                  component={this.HomeTabs}
                  options={({ route }) => ({
                    headerTitle: getHeaderTitle(route),
                  })}
                />
                <Stack.Screen name="ItemIndex" options={{headerLeft: (props) => (<HeaderBackButton {...props} onPress={() => {navigate('Home')}}/>), title: 'Items'}}>
                  {props => <IndexScreen
                  {...props}
                  setSearchType={this.setSearchType}
                  searchValue={this.state.searchValue}
                  searchHandler={this.searchHandler}
                  items={this.filteredItems()}
                  style={styles} /> }
                </Stack.Screen>
                
                <Stack.Screen name="ContainerIndex" options={{headerLeft: (props) => (<HeaderBackButton {...props} onPress={() => {navigate('Home')}}/>), title: 'Containers'}}>
                  {props => <IndexScreen {...props} containers={this.state.containers} style={styles}></IndexScreen>}
                </Stack.Screen>

                <Stack.Screen name="CategoryIndex" options={{headerLeft: (props) => (<HeaderBackButton {...props} onPress={() => {navigate('Home')}}/>), title: 'Categories'}}>
                  {props => <IndexScreen {...props} categories={this.state.categories} style={styles}></IndexScreen>}
                </Stack.Screen>
                
                <Stack.Screen name="ItemShow">
                  {props => <ShowScreen {...props} searchHandler={this.searchHandler} removeHandler={this.removeHandler} inputType={'Item'} style={styles}></ShowScreen>}
                </Stack.Screen>

                <Stack.Screen name="ContainerShow">
                  {props => <ShowScreen {...props} searchHandler={this.searchHandler} removeHandler={this.removeHandler} inputType={'Container'} style={styles}></ShowScreen>}
                </Stack.Screen>

                <Stack.Screen name="CategoryShow">
                  {props => <ShowScreen {...props} searchHandler={this.searchHandler} removeHandler={this.removeHandler} inputType={'Category'} style={styles}></ShowScreen>}
                </Stack.Screen>

                <Stack.Screen name="AddItem">
                  {props => <AddItemScreen {...props} itemFormHandler={this.itemFormHandler} containers={this.state.containers} categories={this.state.categories} style={styles} ></AddItemScreen> }
                </Stack.Screen>

                <Stack.Screen name="AddContainer">
                  {props => <AddContainerScreen {...props} containerFormHandler={this.containerFormHandler} types={this.state.types} style={styles} ></AddContainerScreen> }
                </Stack.Screen>

                <Stack.Screen name="AddCategory" >
                  {props => <AddCategoryScreen {...props} categoryFormHandler={this.categoryFormHandler} style={styles} ></AddCategoryScreen> }
                </Stack.Screen>
                
                <Stack.Screen name="ItemEdit" options={{ title: 'Edit Item' }}>
                    {props => <EditItemScreen {...props} itemFormHandler={this.itemFormHandler} inputType={'Item'} containers={this.state.containers} categories={this.state.categories} style={styles}></EditItemScreen>}
                </Stack.Screen>

                <Stack.Screen name="ContainerEdit" options={{ title: 'Edit Container' }}>
                    {props => <EditContainerScreen {...props} containerFormHandler={this.containerFormHandler} types={this.state.types} inputType={'Container'} style={styles}></EditContainerScreen>}
                </Stack.Screen>

                <Stack.Screen name="CategoryEdit" options={{ title: 'Edit Category' }}>
                    {props => <EditCategoryScreen {...props} categoryFormHandler={this.categoryFormHandler} inputType={'Category'} style={styles}></EditCategoryScreen>}
                </Stack.Screen>

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
