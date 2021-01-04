import React from 'react';
import {
  Text,
  Image,
  TextInput,
  View,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';

function imageSourceCheck(item) {
    let imageSource = {}

    item.photo.uri ?
    imageSource = {uri: `http://10.0.2.2:3000${item.photo.uri + (new Date()).getTime()}`}
    :
    imageSource = require('../../src/assets/img/default_item_photo.png')
    
    console.log(imageSource)
    return imageSource
  }

function _renderItem({item, index}) {
    return (
        <View style={{
            backgroundColor:'floralwhite',
            borderRadius: 5,
            height: 250,
            padding: 50,
            marginLeft: 25,
            marginRight: 25, }}>
            
            <Text style={{fontSize: 16}}>{item.name}</Text>
            <Image
                style={{width: 250, height: 250}}
                source={imageSourceCheck(item)}
                />
        </View>
    );
}

function RecentItems(props) {

    console.log('RecentItems Props', props.items)

    return (
        <View>
            <Carousel
                layout={'stack'}
                layoutCardOffset={20}
                data={props.items}
                renderItem={_renderItem}
                sliderWidth={400}
                itemWidth={300}
            />
        </View>
    );
}

export default RecentItems;