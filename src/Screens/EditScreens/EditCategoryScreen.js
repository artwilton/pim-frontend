import React, {Component} from 'react';

import {Picker} from '@react-native-picker/picker';
import {
  Text,
  View,
  ScrollView,
  Keyboard,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Input, Button } from 'react-native-elements'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

class EditCategoryScreen extends Component {
  state = {
    id: '',
    name: '',
    description: '',
    photo: {},
    originalPhoto: {}
  };

  componentDidMount() {
    console.log('edit form clicked obj', this.props.route.params.clickedObj);
    let {
      id,
      name,
      description,
      photo,
    } = this.props.route.params.clickedObj;
    this.setState(
      {
        id,
        name,
        description,
        photo,
      },
      () => console.log('edit form mounted state', this.state),
    );
  }

  // Local Form Handler
  localFormHandler = (text, name) => {
    this.setState({[name]: text});
  };

  // Camera and Upload Functions

  cameraTakePhoto = () => {
    return launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      this.addImageCheck
    );
  };

  uploadPhoto = () => {
    return launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      this.addImageCheck
    );
  };

  // Handle setting the correct photo and originalPhoto state
  addImageCheck = (response) => {
    const orignalPhotoObj = {
      uri: (this.state.photo.uri && this.state.photo.uri.startsWith('/')) ?
        this.state.photo.uri
      :
        '../../../src/assets/img/default_item_photo.png'
    }
    this.setState({photo: response, originalPhoto: orignalPhotoObj});
  }

  // Handle correct source for Image component
  imageSourceCheck = () => {
    let imageSource = {}

    if (this.state.originalPhoto.uri) {
      imageSource = {uri: this.state.photo.uri}
    } else if (this.state.photo.uri) {
      imageSource = {uri: `http://10.0.2.2:3000${this.state.photo.uri}`}
    } else {
      imageSource = require('../../../src/assets/img/default_item_photo.png')
    }
    
    return imageSource
  }

  render() {
    return (
      <ScrollView>
        <View style={this.props.style.container}>
          <View style={{alignItems: 'center'}}>
            <Image
              style={this.props.style.fullSizePhoto}
              source={this.imageSourceCheck()}
            />
          </View>
          <Button containerStyle={{paddingVertical: 5}} title={'Take New Photo'} onPress={() => this.cameraTakePhoto()}/>
          <Button containerStyle={{paddingVertical: 5}} title={'Upload Photo'} onPress={() => this.uploadPhoto()}/>
          <Input
            onChangeText={(text) => this.localFormHandler(text, 'name')}
            placeholder={'Category Name'}
            value={this.state.name}
          />
          <Input
            onChangeText={(text) => this.localFormHandler(text, 'description')}
            placeholder={'Category Description'}
            value={this.state.description}
          />
          <Button containerStyle={{paddingVertical: 5}} title={'Save Changes'} onPress={() => this.props.categoryFormHandler(this.state, 'edit') }/>
        </View>
      </ScrollView>
    );
  }
}

export default EditCategoryScreen;