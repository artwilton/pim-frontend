import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'

import Search from'../Components/Search'

function renderCards(props) {

    let objToRender = []
    let route = 'Home'

    if (props.items) {
        objToRender = props.items(props.route.params ? props.route.params.clickedObj : null)
        objToRender.reverse()
        route = 'ItemShow'
    } else if (props.containers) {
        objToRender = props.containers
        objToRender.reverse()
        route = 'ContainerShow'
    } else if (props.categories) {
        objToRender = props.categories
        objToRender.reverse()
        route = 'CategoryShow'
    }

    return objToRender.map((obj) => (
        <ListItem key={obj.id} bottomDivider onPress={() => props.navigation.navigate(route, {clickedObj: obj})}>
        <Avatar source={{uri: `http://10.0.2.2:3000${obj.photo.uri}`}} />
        <ListItem.Content>
          <ListItem.Title>{obj.name}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
        </ListItem>
        // <Text key={obj.id} onPress={() => props.navigation.navigate(route, {clickedObj: obj})}>{obj.name}</Text>
    ));
}


function IndexScreen(props) {

    return (
       
    <ScrollView>
        {(props.items || props.containers || props.categories) ? <Search setSearchType={props.setSearchType} searchType={'Name'} searchValue={props.searchValue} searchHandler={props.searchHandler}/> : null }
        {/* {props.items ? <Search setSearchType={props.setSearchType} searchType={'Category'} searchValue={props.searchValue} searchHandler={props.searchHandler}/> : null } */}
        {renderCards(props)}
    </ScrollView>    
    )
}

export default IndexScreen;