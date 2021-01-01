import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
} from 'react-native';

import Search from'../Components/Search'

function renderCards(props) {

    let objToRender = []
    let route = 'Home'

    if (props.items) {
        objToRender = props.items,
        route = 'ItemShow'
    } else if (props.containers) {
        objToRender = props.containers,
        route = 'ContainerShow'
    } else if (props.categories) {
        objToRender = props.categories,
        route = 'CategoryShow'
    }

    return objToRender.map((obj) => (
        <Text key={obj.id} onPress={() => props.navigation.navigate(route, {clickedObj: obj})}>{obj.name}</Text>
    ));
}

function IndexScreen(props) {

    return (
        
    <ScrollView>
        {props.items ? <Search setSearchType={props.setSearchType} searchType={'Name'} searchValue={props.searchValue} searchHandler={props.searchHandler}/> : null }
        {/* {props.items ? <Search setSearchType={props.setSearchType} searchType={'Category'} searchValue={props.searchValue} searchHandler={props.searchHandler}/> : null } */}
        {renderCards(props)}
    </ScrollView>    
    )
}

export default IndexScreen;