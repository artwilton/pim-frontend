import React from "react";
import { TextInput, View } from 'react-native';
import { SearchBar } from 'react-native-elements';

function Search(props) {

    return (
            <SearchBar
            onFocus={() => props.setSearchType(props.searchType)}
            onChangeText={(text) => props.searchHandler(text)}
            placeholder={`Search ${props.searchType}`}
            value={props.searchValue}
            />
    )
}

export default Search