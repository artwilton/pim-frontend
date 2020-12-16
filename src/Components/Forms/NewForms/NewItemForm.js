import React, {Component} from 'react';

class NewItemForm extends Component {
  state = {
    name: '',
    description: '',
    notes: '',
    barcode: '',
    container_id: '',
    container_name: '',
    category_id: '',
    category_name: '',
  };

  newItemFormHandler = (text, name) => {
    this.setState({[name]: text}, () => console.log(this.state));
  };

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
        <TextInput
          onChangeText={(text) => this.newItemFormHandler(text, 'name')}
          placeholder={'Item Name'}
          value={this.state.name}
        />
      </View>
    );
  }
}

export default NewItemForm;
