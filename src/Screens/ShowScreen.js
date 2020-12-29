import React, {Component} from 'react';
import {Text, View, ScrollView, Image, TouchableOpacity} from 'react-native';
import Footer from '../Components/Footer/Footer';

function ShowScreen(props) {
  const { clickedObj } = props.route.params;
  return (
    <ScrollView>
        <View>
            {clickedObj.photo ?
              <Image
                style={props.style.fullSizePhoto}
                source={{uri: `http://10.0.2.2:3000${clickedObj.photo}`}}
              />
            :
              null
            }
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
            style={props.style.footerButton}
            onPress={() => props.navigation.navigate(`${props.inputType}Edit`, {clickedObj: clickedObj})}
          >
            <Text>Edit {props.inputType}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={props.style.footerButton}
            onPress={
              // add in check here instead of optimistically rendering  
              async () => { await props.removeItem(clickedObj); await props.navigation.navigate(`${props.inputType}Index`); }
             }>
            <Text>Delete {props.inputType}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
  );
}

export default ShowScreen;
