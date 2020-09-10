import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
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
    marginTop: '20%',
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
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20%',
    backgroundColor: '#ff8000',
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  textButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
