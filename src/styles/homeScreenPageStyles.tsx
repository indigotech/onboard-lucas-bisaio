import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDD',
    padding: 12,
  },
  user: {
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    width: 300,
    height: 120,
    margin: 12,
    borderRadius: 20,
    padding: 12,
  },
  nameStyle: {
    textAlign: 'center',
    fontSize: 20,
    paddingBottom: 10,
  },
  emailStyle: {
    textAlign: 'center',
  },
  button: {
    color: 'orange',
  },
});

export default styles;
