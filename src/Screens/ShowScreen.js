import React, {Component} from 'react';
import {Text, View, ScrollView, Image, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Footer from '../Components/Footer/Footer';

function ShowScreen({ navigation }) {
  const { clickedObj } = route.params;
  return (
    <ScrollView>
        <View>
            {clickedObj.photo ?
              <Image
                style={this.props.style.fullSizePhoto}
                source={{uri: `http://10.0.2.2:3000${clickedObj.photo}`}}
              />
            :
              null
            }
          <Text> Name: {clickedObj.name} </Text>
          <Text> Description: {clickedObj.description} </Text>

          {this.props.inputType === 'Item' ? (
              <>
              <Text> BarCode: {clickedObj.barcode} </Text>
              <Text> Container: {clickedObj.container.name} </Text>
              <Text> Category: {clickedObj.category.name} </Text>
              </>
          ) : null}

          {this.props.inputType === 'Container' ? (
            <>
              <Text> BarCode: {clickedObj.barcode} </Text>
            </>
          ) : null}

        </View>
        <View>
          <TouchableOpacity
            style={this.props.style.footerButton}
            onPress={() => navigation.navigate('Edit'), {clickedObj: clickedObj}}
          >
            <Text>Edit {this.props.inputType}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={this.props.style.footerButton}
            onPress={() => this.props.removeItem(clickedObj)}>
            <Text>Delete {this.props.inputType}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
  );
}

export default ShowScreen;
