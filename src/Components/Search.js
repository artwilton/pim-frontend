import React from "react";
import { TextInput, View } from 'react-native';

function Search(props) {

    return (
        <View>
            <TextInput
            onFocus={() => props.setSearchType(props.searchType)}
            onChangeText={(text) => props.searchHandler(text)}
            placeholder={`Search ${props.searchType}`}
            value={props.searchValue}
            />
        </View>
    )
}

export default Search