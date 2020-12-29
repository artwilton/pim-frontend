import React, {Component} from 'react';

import {Picker} from '@react-native-picker/picker';
import {
  Text,
  TextInput,
  View,
  Keyboard,
  TouchableOpacity,
  Image,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {styles} from '../../../Styles';

class EditItemForm extends Component {
  state = {
    id: '',
    name: '',
    description: '',
    notes: '',
    barcode: '',
    selected_container: {},
    selected_category: {},
    photo: '',
    newPhoto: {},
  };

  componentDidMount() {
    console.log('clicked obj', this.props.clickedObj);
    let {
      id,
      name,
      description,
      notes,
      barcode,
      container,
      category,
      photo,
    } = this.props.clickedObj;
    this.setState(
      {
        id,
        name,
        description,
        notes,
        barcode,
        selected_container: container,
        selected_category: category,
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
        this.setState({newPhoto: response});
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
        this.setState({newPhoto: response});
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

  render() {
    return (
      <View>
        <Image
          style={styles.fullSizePhoto}
          source={{
            uri: `http://10.0.2.2:3000${this.state.photo}`,
          }}
        />
        <TouchableOpacity
          onPress={() => this.cameraTakePhoto()}
          style={styles.button}>
          <Text>Take New Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.uploadPhoto()}
          style={styles.button}>
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
          selectedValue={this.state.selected_container}
          style={{height: 50, width: 300}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({selected_container: itemValue}, () =>
              console.log('containers', this.state.selected_container),
            )
          }>
          {this.renderContainerValues()}
        </Picker>
        <Text> Select Category: </Text>
        <Picker
          selectedValue={this.state.selected_category}
          style={{height: 50, width: 300}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({selected_category: itemValue})
          }>
          {this.renderCategoryValues()}
        </Picker>
        <TouchableOpacity
          onPress={() => this.props.editItem(this.state)}
          style={styles.button}>
          <Text>Save Changes</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default EditItemForm;
