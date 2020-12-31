import React, {Component} from 'react';
import { Text, TextInput, ScrollView, View, Image, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

class NewItemForm extends Component {
  state = {
    name: '',
    description: '',
    notes: '',
    barcode: '',
    container: {},
    category: {},
    photo: {}
  };

  componentDidMount() {
    this.setState({container: this.props.containers[0], category: this.props.categories[0]})
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

  newItemFormHandler = (text, name) => {
    this.setState({[name]: text});
  };

  renderContainerValues = () => {
    return this.props.containers.map((obj) => (
      <Picker.Item key={obj.id} label={obj.name} value={obj} />
  ));
  }

  renderCategoryValues = () => {
    return this.props.categories.map((obj) => (
      <Picker.Item key={obj.id} label={obj.name} value={obj} />
  ));
  }

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
          <Text>Add Item Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.uploadPhoto()}
          style={this.props.style.button}>
          <Text>Upload Item Photo</Text>
        </TouchableOpacity>
        <TextInput
          onChangeText={(text) => this.newItemFormHandler(text, 'name')}
          placeholder={'Item Name'}
          value={this.state.name}
        />
        <TextInput
          onChangeText={(text) => this.newItemFormHandler(text, 'description')}
          placeholder={'Item Description'}
          value={this.state.description}
        />
        <TextInput
          onChangeText={(text) => this.newItemFormHandler(text, 'notes')}
          placeholder={'Item Notes (optional)'}
          value={this.state.notes}
        />
        <TextInput
          onChangeText={(text) => this.newItemFormHandler(text, 'barcode')}
          placeholder={'Barcode (optional)'}
          value={this.state.barcode}
        />
        <Text> Select Container: </Text>
        <Picker
          selectedValue={this.state.container}
          style={{height: 50, width: 300}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({container: itemValue}, ()=> console.log('containers', this.state.container))
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
        <TouchableOpacity onPress={() => this.props.itemFormHandler(this.state, 'add')} style={this.props.style.button}>
            <Text>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export default NewItemForm;
