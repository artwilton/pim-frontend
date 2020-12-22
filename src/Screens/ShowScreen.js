import React, {Component} from 'react';

import {Text, View, ScrollView, Image, TouchableOpacity} from 'react-native';

import Footer from '../Components/Footer/Footer';

class ShowScreen extends Component {
  render() {
    console.log('clicke object', this.props.clickedObj)
    return (
      <ScrollView>
        <View>
            {this.props.clickedObj.photo ?
              <Image
                style={this.props.style.fullSizePhoto}
                source={{uri: `http://10.0.2.2:3000${this.props.clickedObj.photo}`}}
              />
            :
              null
            }
          <Text> Name: {this.props.clickedObj.name} </Text>
          <Text> Description: {this.props.clickedObj.description} </Text>

          {this.props.inputType === 'Item' ? (
              <>
              <Text> BarCode: {this.props.clickedObj.barcode} </Text>
              <Text> Container: {this.props.clickedObj.container.name} </Text>
              <Text> Category: {this.props.clickedObj.category.name} </Text>
              </>
          ) : null}

          {this.props.inputType === 'Container' ? (
            <>
              <Text> BarCode: {this.props.clickedObj.barcode} </Text>
            </>
          ) : null}

        </View>
        <View>
          <TouchableOpacity
            style={this.props.style.footerButton}
            onPress={() =>
              this.props.buttonRouteHandler(
                `${this.props.inputType}Edit`,
                this.props.clickedObj,
              )
            }>
            <Text>Edit {this.props.inputType}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={this.props.style.footerButton}
            onPress={() => this.props.removeItem(this.props.clickedObj)}>
            <Text>Delete {this.props.inputType}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Footer buttonRouteHandler={this.props.buttonRouteHandler}></Footer>
        </View>
      </ScrollView>
    );
  }
}

export default ShowScreen;
