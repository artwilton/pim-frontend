import React, {Component} from 'react';

import {Picker} from '@react-native-picker/picker';
import {
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

class EditContainerScreen extends Component {
  state = {
    name: '',
    description: '',
    notes: '',
    percent_used: '',
    barcode: '',
    type: {},
    photo: {},
    originalPhoto: {}
  };

  componentDidMount() {
    console.log('clicked obj', this.props.route.params.clickedObj);
    let {
      id,
      name,
      description,
      notes,
      percent_used,
      barcode,
      type,
      photo
    } = this.props.route.params.clickedObj;
    this.setState(
      {
        id,
        name,
        description,
        notes,
        percent_used,
        barcode,
        type,
        photo
      },
      () => console.log('mounted state', this.state),
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

  renderTypeValues = () => {
    return this.props.types.map((obj) => (
      <Picker.Item key={obj.id} label={obj.name} value={obj} />
  ));
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
          onChangeText={(text) => this.localFormHandler(text, 'name')}
          placeholder={'Container Name'}
          value={this.state.name}
        />
        <TextInput
          onChangeText={(text) => this.localFormHandler(text, 'description')}
          placeholder={'Description'}
          value={this.state.description}
        />
        <TextInput
          onChangeText={(text) => this.localFormHandler(text, 'notes')}
          placeholder={'Notes (optional)'}
          value={this.state.notes}
        />
        <TextInput
          onChangeText={(text) => this.localFormHandler(text, 'percent_used')}
          placeholder={'Percent Used'}
          value={this.state.percent_used ? this.state.percent_used.toString() : null}
        />
        <TextInput
          onChangeText={(text) => this.localFormHandler(text, 'barcode')}
          placeholder={'Barcode (optional)'}
          value={this.state.barcode}
        />
        <Text> Select Type: </Text>
        <Picker
          selectedValue={this.state.type}
          style={{height: 50, width: 300}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({type: itemValue})
          }>
          {this.renderTypeValues()}
        </Picker>
        <TouchableOpacity
        onPress={() => this.props.containerFormHandler(this.state, 'edit') }
        style={this.props.style.button}>
          <Text>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export default EditContainerScreen;