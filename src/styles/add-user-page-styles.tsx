import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 35,
    fontWeight: 'bold',
  },
  infosContainer: {
    flexDirection: 'row',
    marginTop: '30%',
  },
  textInputContainer: {
    justifyContent: 'center',
  },
  textContainer: {
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    padding: 20,
  },
  textInput: {
    width: 200,
    height: 40,
    borderRadius: 20,
    borderColor: '#CCC',
    borderWidth: 3,
    textAlign: 'center',
    margin: 12,
  },
});

export default styles;
