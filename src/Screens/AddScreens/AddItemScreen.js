import React, {Component} from 'react';

import {Picker} from '@react-native-picker/picker';
import { Text, TextInput, View, Keyboard, TouchableOpacity } from 'react-native';

class NewItemForm extends Component {
  state = {
    name: '',
    description: '',
    notes: '',
    barcode: '',
    container: {},
    category: {}
  };

  componentDidMount() {
    this.setState({container: this.props.containers[0], category: this.props.categories[0]})
  }

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

  render() {
    return (
      <View>
        <Text>New Item Form</Text>
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
        <TouchableOpacity onPress={() => this.props.addItem(this.state)} style={this.props.style.button}>
            <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default NewItemForm;
