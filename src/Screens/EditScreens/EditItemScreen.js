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
    console.log('clicked obj', this.props.route.params.clickedObj);
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
      () => console.log('mounted state', this.state),
    );
  }

  cameraTakePhoto = () => {
    return launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
        const orignalPhotoObj = {uri: this.state.photo.uri}
        this.setState({photo: response, originalPhoto: orignalPhotoObj});
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
        const orignalPhotoObj = {uri: this.state.photo.uri}
        this.setState({photo: response, originalPhoto: orignalPhotoObj}, ()=> console.log(this.state));
      },
    );
  };

  editItemFormHandler = (text, name) => {
    this.setState({[name]: text});
  };

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

  imageSourceCheck = () => {
    let imageSource = {}
    this.state.originalPhoto.uri ?
    imageSource = {uri: this.state.photo.uri}
    :
    imageSource = {uri: `http://10.0.2.2:3000${this.state.photo.uri}`}

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
          onChangeText={(text) => this.editItemFormHandler(text, 'name')}
          placeholder={'Item Name'}
          value={this.state.name}
        />
        <TextInput
          onChangeText={(text) => this.editItemFormHandler(text, 'description')}
          placeholder={'Item Description'}
          value={this.state.description}
        />
        <TextInput
          onChangeText={(text) => this.editItemFormHandler(text, 'notes')}
          placeholder={'Item Notes (optional)'}
          value={this.state.notes}
        />
        <TextInput
          onChangeText={(text) => this.editItemFormHandler(text, 'barcode')}
          placeholder={'Barcode (optional)'}
          value={this.state.barcode}
        />
        <Text> Select Container: </Text>
        <Picker
          selectedValue={this.state.container}
          style={{height: 50, width: 300}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({container: itemValue}, () =>
              console.log('containers', this.state.container),
            )
          }>
          {this.renderContainerValues()}
        </Picker>
        <Text> Select Category: </Text>
        <Picker
          selectedValue={this.state.category}
          style={{height: 50, width: 300}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({category: itemValue})
          }>
          {this.renderCategoryValues()}
        </Picker>
        <TouchableOpacity
        onPress={() => this.props.editItem(this.state) }>
          <Text>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export default EditItemScreen;