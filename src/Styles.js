import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignItems: 'stretch',
    padding: 20
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDDDDD',
    width: 300,
  },
  largeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDDDDD',
    padding: 30,
    width: '80%',
  },
  fullSizePhoto: {
    alignItems: 'center',
    alignContent: 'center',
    width: 300,
    height: 300,
  }
});

export { styles }