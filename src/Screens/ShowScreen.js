import React, {Component, useEffect} from 'react';
import {Text, View, ScrollView, Image, TouchableOpacity} from 'react-native';
import { SearchBar, Button } from 'react-native-elements';
import { styles } from '../Styles';

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
          {this.props.inputType !== 'Item' ?
            <SearchBar
            onFocus={() => this.props.navigation.navigate(`${this.props.inputType}Items`, {clickedObj})}
            placeholder={`Search For Items In ${this.props.inputType}`}
            />
            :
            null
            
          }
        <View style={styles.container}>
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
  
        <Button containerStyle={{paddingVertical: 5}} title={`Edit ${this.props.inputType}`} onPress={() => this.props.navigation.navigate(`${this.props.inputType}Edit`, {clickedObj: clickedObj})}/>
        <Button containerStyle={{paddingVertical: 5}} title={`Delete ${this.props.inputType}`} onPress={
          async () => { await this.props.removeHandler(clickedObj, this.props.inputType)}
        }/>
        </View>
      </ScrollView>
    );
  }

}

export default ShowScreen;
