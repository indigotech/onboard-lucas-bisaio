import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
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
    alignItems: 'center',
  },
  viewLogin: {
    alignItems: 'center',
    marginHorizontal: 40,
  },
});
