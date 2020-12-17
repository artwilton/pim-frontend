import React from "react";
import { TextInput, View } from 'react-native';

function Search(props) {

    return (
        <View>
            <TextInput
            onChangeText={(text) => props.searchHandler(text)}
            placeholder={'Search Items'}
            value={props.searchValue}
            />
        </View>
    )
}

export default Search