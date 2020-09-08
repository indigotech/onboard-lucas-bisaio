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
    justifyContent: 'center',
  },
  title: {
    fontSize: 50,
    textAlign: 'center',
    paddingBottom: 40,
  },
  viewLogin: {
    alignItems: 'center',
    marginHorizontal: 40,
  },
  textLogin: {
    fontSize: 24,
  },
  inputLogin: {
    textAlign: 'center',
    fontSize: 20,
    width: 340,
    height: 50,
    borderWidth: 5,
    borderRadius: 25,
    borderColor: '#CCCC',
  },
});

export default styles;
