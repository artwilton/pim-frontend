import React, {Component} from 'react';

import {Picker} from '@react-native-picker/picker';
import {
  Text,
  TextInput,
  View,
  ScrollView,
  Keyboard,
  TouchableOpacity,
  Image,
} from 'react-native';
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
  editCategoryFormHandler = (text, name) => {
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
        <Image
          style={this.props.style.fullSizePhoto}
          source={this.imageSourceCheck()}
        />
        <TouchableOpacity
          onPress={() => this.cameraTakePhoto()}
          style={this.props.style.button}>
          <Text>Take New Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.uploadPhoto()}
          style={this.props.style.button}>
          <Text>Upload Photo</Text>
        </TouchableOpacity>
        <TextInput
          onChangeText={(text) => this.editCategoryFormHandler(text, 'name')}
          placeholder={'Item Name'}
          value={this.state.name}
        />
        <TextInput
          onChangeText={(text) => this.editCategoryFormHandler(text, 'description')}
          placeholder={'Item Description'}
          value={this.state.description}
        />
        <TouchableOpacity
        onPress={() => this.props.itemFormHandler(this.state, 'edit') }
        style={this.props.style.button}>
          <Text>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export default EditCategoryScreen;