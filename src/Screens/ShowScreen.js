import React, {Component} from 'react';
import {Text, View, ScrollView, Image, TouchableOpacity} from 'react-native';

function imageSourceCheck (clickedObj) {
  let imageSource = {}

  clickedObj.photo.uri ?
    imageSource = {uri: `http://10.0.2.2:3000${clickedObj.photo.uri}`}
  :
    imageSource = require('../../src/assets/img/default_item_photo.png')

  return imageSource
}

function ShowScreen(props) {
  const { clickedObj } = props.route.params;
  
  return (
    <ScrollView>
        <View>
              <Image
                style={props.style.fullSizePhoto}
                source={imageSourceCheck(clickedObj)}
              />
          <Text> Name: {clickedObj.name} </Text>
          <Text> Description: {clickedObj.description} </Text>

          {props.inputType === 'Item' ? (
              <>
              <Text> BarCode: {clickedObj.barcode} </Text>
              <Text> Container: {clickedObj.container.name} </Text>
              <Text> Category: {clickedObj.category.name} </Text>
              </>
          ) : null}

          {props.inputType === 'Container' ? (
            <>
              <Text> BarCode: {clickedObj.barcode} </Text>
            </>
          ) : null}

        </View>
        <View>
          <TouchableOpacity
            style={props.style.button}
            onPress={() => props.navigation.navigate(`${props.inputType}Edit`, {clickedObj: clickedObj})}
          >
            <Text>Edit {props.inputType}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={props.style.button}
            onPress={
              async () => { await props.removeItem(clickedObj, props.inputType)}
             }>
            <Text>Delete {props.inputType}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
  );
}

export default ShowScreen;
