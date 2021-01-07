import React, {Component} from 'react';
import { Text, ScrollView, View, Image, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { Input, Button } from 'react-native-elements'

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

  localFormHandler = (text, name) => {
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
        <Button containerStyle={{paddingVertical: 5}} title={'Submit'} onPress={() => this.props.itemFormHandler(this.state, 'add')}/>
        </View>
      </ScrollView>
    );
  }
}

export default NewItemForm;
