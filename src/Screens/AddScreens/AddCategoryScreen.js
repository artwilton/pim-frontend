import React, {Component} from 'react';
import { Text, TextInput, ScrollView, View, Image, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

class NewCategoryForm extends Component {
  state = {
    name: '',
    description: '',
    photo: {}
  };

  cameraTakePhoto = () => {
    return launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
        this.setState({photo: response});
      },
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
      (response) => {
        this.setState({photo: response});
      },
    );
  };

  localFormHandler = (text, name) => {
    this.setState({[name]: text});
  };

  imageSourceCheck = () => {
    let imageSource = {}
    this.state.photo.uri ?
    imageSource = {uri: this.state.photo.uri}
    :
    imageSource = require('../../../src/assets/img/default_item_photo.png')
    
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
          <Text>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.uploadPhoto()}
          style={this.props.style.button}>
          <Text>Upload Photo</Text>
        </TouchableOpacity>
        <TextInput
          onChangeText={(text) => this.localFormHandler(text, 'name')}
          placeholder={'Category Name'}
          value={this.state.name}
        />
        <TextInput
          onChangeText={(text) => this.localFormHandler(text, 'description')}
          placeholder={'Description'}
          value={this.state.description}
        />
        <TouchableOpacity onPress={() => this.props.categoryFormHandler(this.state, 'add')} style={this.props.style.button}>
            <Text>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export default NewCategoryForm;
