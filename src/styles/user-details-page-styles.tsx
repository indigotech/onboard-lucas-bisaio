import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#858AE3',
  },
  name: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    padding: 20,
    color: '#2C0735',
  },
  datails: {
    borderRadius: 20,
    margin: 30,
    backgroundColor: '#FFF',
  },
  infos: {
    textAlign: 'center',
    fontSize: 18,
    padding: 10,
    color: '#2C0735',
  },
  loading: {
    zIndex: 2,
    width: '100%',
    height: '100%',
    backgroundColor: '#00000077',
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFF',
  },
});
