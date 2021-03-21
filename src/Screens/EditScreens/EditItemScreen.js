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
import { styles } from '../../Styles';

const defaultPhoto = '../../../src/assets/img/default_item_photo.png'

class EditItemScreen extends Component {
  state = {
    id: '',
    name: '',
    description: '',
    notes: '',
    barcode: '',
    container: {},
    category: {},
    photo: {},
    originalPhoto: {}
  };

  componentDidMount() {
    console.log('edit form clicked obj', this.props.route.params.clickedObj);
    let {
      id,
      name,
      description,
      notes,
      barcode,
      container,
      category,
      photo,
    } = this.props.route.params.clickedObj;
    this.setState(
      {
        id,
        name,
        description,
        notes,
        barcode,
        container,
        category,
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
        defaultPhoto
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
      imageSource = require(defaultPhoto)
    }
    
    return imageSource
  }

  // Include all containers and categories a user has in form
  renderContainerValues = () => {
    return this.props.containers.map((obj) => (
      <Picker.Item key={obj.id} label={obj.name} value={obj} />
    ));
  };

  renderCategoryValues = () => {
    return this.props.categories.map((obj) => (
      <Picker.Item key={obj.id} label={obj.name} value={obj} />
    ));
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={{alignItems: 'center'}}>
            <Image
              style={styles.fullSizePhoto}
              source={this.imageSourceCheck()}
            />
          </View>
          <Button containerStyle={{paddingVertical: 5}} title={'Take New Photo'} onPress={() => this.cameraTakePhoto()}/>
          <Button containerStyle={{paddingVertical: 5}} title={'Upload Photo'} onPress={() => this.uploadPhoto()}/>
          <Input
            onChangeText={(text) => this.localFormHandler(text, 'name')}
            placeholder={'Item Name'}
            value={this.state.name}
          />
          <Input
            onChangeText={(text) => this.localFormHandler(text, 'description')}
            placeholder={'Description'}
            value={this.state.description}
          />
          <Input
            onChangeText={(text) => this.localFormHandler(text, 'notes')}
            placeholder={'Notes (optional)'}
            value={this.state.notes}
          />
          <Input
            onChangeText={(text) => this.localFormHandler(text, 'barcode')}
            placeholder={'Barcode (optional)'}
            value={this.state.barcode}
          />
          <Text style={{fontSize: 15}}> Select Container: </Text>
          <Picker
            selectedValue={this.state.container}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({container: itemValue})
            }>
            {this.renderContainerValues()}
          </Picker>
          <Text style={{fontSize: 15}}> Select Category: </Text>
          <Picker
            selectedValue={this.state.category}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({category: itemValue})
            }>
            {this.renderCategoryValues()}
          </Picker>
          <Button containerStyle={{paddingVertical: 5}} title={'Save Changes'} onPress={() => this.props.itemFormHandler(this.state, 'edit') }/>
        </View>
      </ScrollView>
    );
  }
}

export default EditItemScreen;