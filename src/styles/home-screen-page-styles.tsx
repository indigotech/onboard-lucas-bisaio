import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  loading: {
    zIndex: 2,
    width: '100%',
    height: '100%',
    backgroundColor: '#000000AA',
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFF',
  },
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
  },
  emailStyle: {
    textAlign: 'center',
  },
  button: {
    color: 'orange',
  },
});

export default styles;
