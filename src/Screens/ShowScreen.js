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
        <View style={{alignItems: 'center', paddingBottom: 10}}>
          <Image
            style={this.props.style.fullSizePhoto}
            source={this.imageSourceCheck(clickedObj)}
          />
        </View>

        <Text style={{fontSize: 18}}>
          <Text style={{fontWeight: 'bold'}}>Name: </Text>
          <Text>{clickedObj.name}</Text>
        </Text>

        <Text style={{fontSize: 18}}>
          <Text style={{fontWeight: 'bold'}}>Description: </Text>
          <Text>{clickedObj.description}</Text>
        </Text>

        {this.props.inputType === 'Item' ? (
            <>
              <Text style={{fontSize: 18}}>
                <Text style={{fontWeight: 'bold'}}>Notes: </Text>
                <Text>{clickedObj.notes}</Text>
              </Text>

              <Text style={{fontSize: 18}}>
                <Text style={{fontWeight: 'bold'}}>BarCode: </Text>
                <Text>{clickedObj.barcode}</Text>
              </Text>

              <Text style={{fontSize: 18}}>
                <Text style={{fontWeight: 'bold'}}>Container: </Text>
                <Text>{clickedObj.container.name}</Text>
              </Text>

              <Text style={{fontSize: 18}}>
                <Text style={{fontWeight: 'bold'}}>Category: </Text>
                <Text>{clickedObj.category.name}</Text>
              </Text>
            </>
        ) : null}

        {this.props.inputType === 'Container' ? (
          <>
            <Text style={{fontSize: 18}}>
              <Text style={{fontWeight: 'bold'}}>Notes: </Text>
              <Text>{clickedObj.notes}</Text>
            </Text>

            <Text style={{fontSize: 18}}>
              <Text style={{fontWeight: 'bold'}}>Percent Used: </Text>
              <Text>{clickedObj.percent_used}</Text>
            </Text>

            <Text style={{fontSize: 18}}>
              <Text style={{fontWeight: 'bold'}}>BarCode: </Text>
              <Text>{clickedObj.barcode}</Text>
            </Text>

            <Text style={{fontSize: 18}}>
              <Text style={{fontWeight: 'bold'}}>Type: </Text>
              <Text>{clickedObj.type.name}</Text>
            </Text>
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
