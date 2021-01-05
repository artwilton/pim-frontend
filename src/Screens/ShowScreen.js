import React, {Component, useEffect} from 'react';
import {Text, View, ScrollView, Image, TouchableOpacity} from 'react-native';

class ShowScreen extends React.Component {
  
  componentDidMount() {
    const { clickedObj } = this.props.route.params;
    this.props.navigation.setOptions({ title: clickedObj.name })
  }
  // componentWillUnmount() {
  //   this.props.searchHandler('')
  // }
  
  imageSourceCheck = (clickedObj) => {
    let imageSource = {}
  
    clickedObj.photo.uri ?
      imageSource = {uri: `http://10.0.2.2:3000${clickedObj.photo.uri}`}
    :
      imageSource = require('../../src/assets/img/default_item_photo.png')
  
    return imageSource
  }
  
  render () {

    const { clickedObj } = this.props.route.params;
    
    return (
      
      <ScrollView>
        <View>
          {this.props.inputType !== 'Item' ? 
            <TouchableOpacity
              style={this.props.style.button}
              onPress={() => this.props.navigation.navigate(`${this.props.inputType}Items`, {clickedObj})}
            >
              <Text>Show Items In {this.props.inputType}</Text>
            </TouchableOpacity>
            :
            null
            
          }
        <Image
          style={this.props.style.fullSizePhoto}
          source={this.imageSourceCheck(clickedObj)}
        />
        <Text> Name: {clickedObj.name} </Text>
        <Text> Description: {clickedObj.description} </Text>

        {this.props.inputType === 'Item' ? (
            <>
            <Text> Notes: {clickedObj.notes} </Text>
            <Text> BarCode: {clickedObj.barcode} </Text>
            <Text> Container: {clickedObj.container.name} </Text>
            <Text> Category: {clickedObj.category.name} </Text>
            </>
        ) : null}

        {this.props.inputType === 'Container' ? (
          <>
            <Text> Notes: {clickedObj.notes} </Text>
            <Text> Percent Used: {clickedObj.percent_used} </Text>
            <Text> BarCode: {clickedObj.barcode} </Text>
            <Text> Type: {clickedObj.type.name} </Text>
          </>
        ) : null}
  
        </View>
        <View>
          <TouchableOpacity
            style={this.props.style.button}
            onPress={() => this.props.navigation.navigate(`${this.props.inputType}Edit`, {clickedObj: clickedObj})}
          >
            <Text>Edit {this.props.inputType}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={this.props.style.button}
            onPress={
              async () => { await this.props.removeHandler(clickedObj, this.props.inputType)}
              }>
            <Text>Delete {this.props.inputType}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

}

export default ShowScreen;
