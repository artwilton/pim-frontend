import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import {styles} from '../../Styles';

function AddScreenMain({navigation, style}) {
  return (
    <View style={{...styles.container, justifyContent: 'center'}}>
      <Button
        icon={<Icon name="layers" type="material-community" size={30} color="white" />}
        titleStyle={{fontSize: 24}}
        buttonStyle={{height: 100}}
        containerStyle={{paddingVertical: 5}}
        title={'    Add Item'}
        onPress={() => navigation.navigate('AddItem')}
        style={style.largeButton}
      />
      <Button
        icon={<Icon name="box-open" type="font-awesome-5" size={24} color="white" />}
        titleStyle={{fontSize: 24}}
        buttonStyle={{height: 100}}
        containerStyle={{paddingVertical: 5}}
        title={'    Add Container'}
        onPress={() => navigation.navigate('AddContainer')}
        style={style.largeButton}
      />
      <Button
        icon={<Icon name="layers-search" type="material-community" size={30} color="white" />}
        titleStyle={{fontSize: 24}}
        buttonStyle={{height: 100}}
        containerStyle={{paddingVertical: 5}}
        title={'   Add Category'}
        onPress={() => navigation.navigate('AddCategory')}
        style={style.largeButton}
      />
    </View>
  );
}

export default AddScreenMain;
