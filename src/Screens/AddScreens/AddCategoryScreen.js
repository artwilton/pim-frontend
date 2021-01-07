import React, {Component} from 'react';
import { Text, ScrollView, View, Image, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { Input, Button } from 'react-native-elements'

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
        maxHeight: 400,
        maxWidth: 400,
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
          placeholder={'Description'}
          value={this.state.description}
        />
        <Button containerStyle={{paddingVertical: 5}} title={'Submit'} onPress={() => this.props.categoryFormHandler(this.state, 'add')}/>
        </View>
      </ScrollView>
    );
  }
}

export default NewCategoryForm;
