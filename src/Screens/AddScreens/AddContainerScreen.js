import React, {Component} from 'react';
import { Text, ScrollView, View, Image, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { Input, Button } from 'react-native-elements'

class NewContainerForm extends Component {
  state = {
    name: '',
    description: '',
    notes: '',
    percent_used: null,
    barcode: null,
    type: {},
    photo: {}
  };

  componentDidMount() {
    this.setState({type: this.props.types[0]})
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

  imageSourceCheck = () => {
    let imageSource = {}
    this.state.photo.uri ?
    imageSource = {uri: this.state.photo.uri}
    :
    imageSource = require('../../../src/assets/img/default_item_photo.png')
    
    return imageSource
  }

  localFormHandler = (text, name) => {
    this.setState({[name]: text});
  };

  renderTypeValues = () => {
    return this.props.types.map((obj) => (
      <Picker.Item key={obj.id} label={obj.name} value={obj} />
  ));
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
          placeholder={'Container Name'}
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
          onChangeText={(text) => this.localFormHandler(text, 'percent_used')}
          placeholder={'Percent Used'}
          value={this.state.percent_used}
        />
        <Input
          onChangeText={(text) => this.localFormHandler(text, 'barcode')}
          placeholder={'Barcode (optional)'}
          value={this.state.barcode}
        />
        <Text> Select Container Type: </Text>
        <Picker
          selectedValue={this.state.type}
          style={{height: 50, width: 300}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({type: itemValue})
          }>
          {this.renderTypeValues()}
        </Picker>
        <Button containerStyle={{paddingVertical: 5}} title={'Submit'} onPress={() => this.props.containerFormHandler(this.state, 'add')}/>
        </View>
      </ScrollView>
    );
  }
}

export default NewContainerForm;
