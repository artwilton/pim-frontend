import React from 'react';
import {
  Text,
  Image,
  TextInput,
  View,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import Carousel from 'react-native-snap-carousel';



class RecentItems extends React.Component {
    
    imageSourceCheck = (item) => {
        let imageSource = {}
    
        item.photo.uri ?
        imageSource = {uri: `http://10.0.2.2:3000${item.photo.uri + (new Date()).getTime()}`}
        :
        imageSource = require('../../src/assets/img/default_item_photo.png')
    
        return imageSource
      }

      
      _renderItem = ({item, index}) => {
          return (
              <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('ItemShow', {clickedObj: item})}>
                  <View style={{
                      backgroundColor:'lightblue',
                      borderRadius: 10,
                      height: 250, }}>
                      <Image
                          style={{flex: 1}}
                          source={this.imageSourceCheck(item)}
                      />
                      <Text style={{fontSize: 20, color: 'white', textAlign: 'center', paddingVertical: 20}}>{item.name}</Text>
                      
                  </View>
              </TouchableNativeFeedback>
          );
      }

      reverseItemArray = () => {
          return [...this.props.items].reverse()
      }

    render () { 
        this.reverseItemArray()
        return (
            <View>
                <Carousel
                    layout={'stack'}
                    layoutCardOffset={20}
                    data={this.reverseItemArray()}
                    renderItem={this._renderItem}
                    sliderWidth={400}
                    itemWidth={300}
                />
            </View>
        );
    }
}

export default RecentItems;